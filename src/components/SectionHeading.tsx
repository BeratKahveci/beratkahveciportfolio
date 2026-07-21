interface SectionHeadingProps {
  label: string;
  title: string;
}

export default function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div className="mb-14 sm:mb-20">
      <p
        data-reveal
        className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent"
      >
        {label}
      </p>
      {title && (
        <h2
          data-reveal
          className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-6xl"
        >
          {title}
        </h2>
      )}
    </div>
  );
}
