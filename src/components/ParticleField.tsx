"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
attribute float aSeed;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uDpr;
varying float vAlpha;
varying float vAccent;
varying vec2 vUv;

void main() {
  vec2 p = aPos;
  float t = uTime * 0.6;

  float w1 = sin(p.x * 0.006 + t + aSeed * 6.2831);
  float w2 = sin((p.x + p.y) * 0.004 - t * 0.8);
  p.y += (w1 * 10.0 + w2 * 8.0) * uDpr;
  p.x += cos(p.y * 0.005 + t * 0.7) * 6.0 * uDpr;

  vec2 dm = p - uMouse;
  float d = length(dm);
  float radius = 190.0 * uDpr;
  float force = max(0.0, 1.0 - d / radius);
  p += normalize(dm + 0.0001) * force * force * 46.0 * uDpr;

  float wave = (w1 + w2) * 0.5;
  vAlpha = 0.16 + 0.34 * (0.5 + 0.5 * wave) + force * 0.55;
  vAccent = clamp(force * 1.4 + step(0.94, aSeed) * max(0.0, wave) * 0.8, 0.0, 1.0);
  vUv = aPos / uRes;

  vec2 clip = (p / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (1.3 + 1.7 * (0.5 + 0.5 * wave) + force * 2.6) * uDpr;
}
`;

const FRAG = `
precision mediump float;
varying float vAlpha;
varying float vAccent;
varying vec2 vUv;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float m = smoothstep(0.5, 0.15, length(uv));
  float edgeFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  vec3 base = vec3(0.96, 0.96, 0.95);
  vec3 accent = vec3(0.784, 0.969, 0.318);
  vec3 color = mix(base, accent, vAccent);
  gl_FragColor = vec4(color, m * vAlpha * edgeFade * 0.6);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const aPos = gl.getAttribLocation(program, "aPos");
    const aSeed = gl.getAttribLocation(program, "aSeed");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uDpr = gl.getUniformLocation(program, "uDpr");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const posBuffer = gl.createBuffer();
    const seedBuffer = gl.createBuffer();
    let count = 0;
    let dpr = 1;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor((rect?.width ?? innerWidth) * dpr));
      const h = Math.max(1, Math.floor((rect?.height ?? innerHeight) * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);

      const spacing = 30 * dpr;
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      count = cols * rows;
      const positions = new Float32Array(count * 2);
      const seeds = new Float32Array(count);
      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          positions[i * 2] = x * spacing;
          positions[i * 2 + 1] = y * spacing;
          seeds[i] = Math.random();
          i++;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aSeed);
      gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0);
    };

    build();

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) * dpr;
      mouse.ty = (e.clientY - rect.top) * dpr;
    };
    const onPointerLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    const ro = new ResizeObserver(build);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.POINTS, 0, count);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onPointerLeave
      );
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(seedBuffer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
