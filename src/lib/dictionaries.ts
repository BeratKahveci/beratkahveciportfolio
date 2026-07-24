export type Locale = "tr" | "en";

export const locales: Locale[] = ["tr", "en"];

export interface Project {
  slug: string;
  title: string;
  category: string;
  role: string;
  year: string;
  description: string;
  stack: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  bullets: string[];
}

export interface Dict {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    items: { id: string; label: string }[];
    langLabel: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    firstLine: string;
    secondLine: string;
    available: string;
    role: string;
    focus: string;
    tagline: string;
    location: string;
    scroll: string;
  };
  work: {
    label: string;
    title: string;
    roleLabel: string;
    stackLabel: string;
    yearLabel: string;
    visitLabel: string;
    projects: Project[];
  };
  experience: {
    label: string;
    title: string;
    items: ExperienceItem[];
    educationLabel: string;
    education: {
      school: string;
      degree: string;
      period: string;
    };
  };
  about: {
    label: string;
    title: string;
    statement: string;
    paragraph: string;
    facts: { label: string; value: string }[];
  };
  skills: {
    label: string;
    title: string;
    groups: { title: string; items: string[] }[];
    marquee: string[];
  };
  contact: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    cta: string;
    emailLabel: string;
    phoneLabel: string;
    socialsLabel: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    localTime: string;
    backToTop: string;
  };
}

export const person = {
  name: "Beraat Can Kahveci",
  email: "beraatcankahveci@gmail.com",
  phone: "+90 534 259 81 61",
  phoneHref: "tel:+905342598161",
  site: "beratkahveci.com.tr",
  // Linkler geldiğinde doldurun — boş olanlar sitede görünmez.
  socials: [
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/beraat-kahveci" },
  ],
};

const tr: Dict = {
  meta: {
    title: "Beraat Can Kahveci — Full Stack Developer",
    description:
      "Frontend odaklı Full Stack Developer. Next.js, React ve TypeScript ile ölçeklenebilir, performans odaklı web ürünleri geliştiriyorum.",
  },
  nav: {
    items: [
      { id: "work", label: "Projeler" },
      { id: "experience", label: "Deneyim" },
      { id: "about", label: "Hakkımda" },
      { id: "contact", label: "İletişim" },
    ],
    langLabel: "Dil",
    menuOpen: "Menü",
    menuClose: "Kapat",
  },
  hero: {
    firstLine: "BERAAT CAN",
    secondLine: "KAHVECİ",
    available: "Yeni projelere açığım",
    role: "Full Stack Developer",
    focus: "Frontend odaklı",
    tagline:
      "Fikirleri hızlı, ölçeklenebilir ve şık web ürünlerine dönüştürüyorum.",
    location: "İstanbul, Türkiye",
    scroll: "Kaydır",
  },
  work: {
    label: "01 — Seçili İşler",
    title: "Projeler",
    roleLabel: "Rol",
    stackLabel: "Teknolojiler",
    yearLabel: "Yıl",
    visitLabel: "Siteyi ziyaret et",
    projects: [
      {
        slug: "pdks-ai",
        title: "PDKS.ai",
        category: "AI destekli personel devam kontrol platformu",
        role: "Uçtan uca geliştirme",
        year: "2026",
        description:
          "Platformun frontend ve backend geliştirme süreçlerini uçtan uca üstlenerek projeyi sıfırdan hayata geçirdim. Performans, bakım ve yeni özellik döngüsünü sürdürülebilir ve ölçeklenebilir bir mimariyle yönetiyorum.",
        stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Docker"],
      },
      {
        slug: "airx",
        title: "AiRX",
        category: "Kurumsal PDKS web platformu",
        role: "Frontend Developer",
        year: "2026",
        description:
          "AiRX web platformunun kullanıcı arayüzlerinin geliştirilmesi ve iyileştirilmesinde aktif rol aldım. Yeni özellikler, performans iyileştirmeleri ve kullanıcı deneyimini artırmaya yönelik çalışmalarla ürünü ileri taşıdım.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        slug: "everest",
        title: "Everest",
        category: "Sinematik scroll deneyimi",
        role: "Tasarım & Geliştirme",
        year: "2026",
        description:
          "Everest'in zirvesine çıkan sanal bir tırmanışı anlatan immersive tek sayfalık deneyim. Gerçek yükseklik verileriyle senkronize irtifa, sıcaklık ve oksijen göstergesi, kamp kamp ilerleyen sinematik scroll sahneleri, ses tasarımı ve TR/EN dil desteğiyle sıfırdan tasarlayıp kodladım.",
        stack: ["React", "Vite", "GSAP", "ScrollTrigger", "Lenis"],
      },
      {
        slug: "berat-os",
        title: "BeratOS",
        category: "Retro-fütüristik işletim sistemi portfolyosu",
        role: "Tasarım & Geliştirme",
        year: "2026",
        description:
          "Tamamen şov amaçlı, işletim sistemi gibi çalışan alternatif bir portfolyo. Boot animasyonuyla açılıyor; masaüstü simgeleri, sürüklenebilir pencereler ve gerçek komutlar çalıştıran bir terminalle dosyalar arasında gezinerek keşfediliyor. CRT efektleri ve Three.js sahnesiyle oyun hissi veren bir deneyim.",
        stack: ["React", "Vite", "Three.js", "GSAP", "Zustand"],
      },
      {
        slug: "invatrix",
        title: "Invatrix",
        category: "Hesaplama modülleri içeren web uygulaması",
        role: "Uçtan uca geliştirme & ürün yönetimi",
        year: "2025",
        description:
          "Uygulamayı frontend ve backend süreçleri dahil uçtan uca geliştirerek ürün geliştirme sürecini yönettim. Hesaplama modülleri, kullanıcı arayüzleri ve uygulama mimarisiyle sürdürülebilir bir web platformu kurdum.",
        stack: ["Next.js", "Node.js", "REST API", "MySQL"],
      },
      {
        slug: "corporate",
        title: "Kurumsal Web",
        category: "TTOPRO · Tooldict · HC Dijital",
        role: "Full Stack Developer",
        year: "2025—26",
        description:
          "HC Dijital çatısı altında birçok kurumsal web sitesinin frontend ve backend geliştirmesinde aktif rol aldım. SSL, DNS, domain yönetimi ve deployment süreçlerini uçtan uca yürüttüm.",
        stack: ["Next.js", "Tailwind CSS", "Vercel", "AWS"],
      },
    ],
  },
  experience: {
    label: "02 — Kariyer",
    title: "Deneyim",
    items: [
      {
        period: "Mart 2026 — Günümüz",
        role: "Full Stack Developer",
        company: "HC Dijital",
        bullets: [
          "Next.js ve React ile ölçeklenebilir, performans odaklı web uygulamaları geliştiriyorum.",
          "Web ve mobil projelerde yeni modüllerin geliştirilmesi, mevcut modüllerin iyileştirilmesi ve performans optimizasyonu çalışmalarını yürütüyorum.",
        ],
      },
      {
        period: "Ağustos 2025 — Şubat 2026",
        role: "Satış Danışmanı & Teknik Destek Sorumlusu",
        company: "Xoom Training Club",
        bullets: [
          "Spor salonunda kullanılan yazılım ve donanım sistemlerindeki teknik sorunların tespiti ve çözüm süreçlerine destek verdim.",
        ],
      },
      {
        period: "Temmuz 2025 — Ağustos 2025",
        role: "Stajyer Yazılım Geliştirici",
        company: "CRS Soft",
        bullets: [
          "Takım çalışması içerisinde kod geliştirme, hata giderme ve uygulama optimizasyonu çalışmalarına katkı sağladım.",
        ],
      },
    ],
    educationLabel: "Eğitim",
    education: {
      school: "Beykoz Üniversitesi",
      degree: "Bilgisayar Mühendisliği (İngilizce)",
      period: "2021 — 2026",
    },
  },
  about: {
    label: "03 — Hakkımda",
    title: "Hakkımda",
    statement:
      "Kullanıcı odaklı, sürdürülebilir ve kaliteli yazılım üretmeye inanıyorum.",
    paragraph:
      "Bilgisayar Mühendisliği mezunuyum ve kariyerime Full Stack Developer olarak devam ediyorum; özellikle frontend geliştirme alanında uzmanlaşmayı hedefliyorum. Yeni teknolojileri öğrenmeye açık, problem çözmeyi seven ve sürekli kendini geliştirmeye odaklanan bir çalışma anlayışına sahibim. Ekip çalışmasına, etkili iletişime ve sorumluluk bilincine önem veriyorum.",
    facts: [
      { label: "Konum", value: "İstanbul, Türkiye" },
      { label: "Odak", value: "Frontend & Ürün Geliştirme" },
      { label: "Eğitim", value: "Bilgisayar Mühendisliği" },
      { label: "Dil", value: "Türkçe · İngilizce" },
    ],
  },
  skills: {
    label: "04 — Yetkinlikler",
    title: "Neler yapıyorum",
    groups: [
      {
        title: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "HTML5 & CSS3",
        ],
      },
      {
        title: "Backend",
        items: ["Node.js", "REST API", "PostgreSQL", "MySQL"],
      },
      {
        title: "DevOps & Araçlar",
        items: [
          "Docker",
          "Linux",
          "CI/CD",
          "AWS · Vercel · IHS",
          "Git · GitHub · GitLab",
          "SSL · DNS · Domain",
          "AI destekli geliştirme",
        ],
      },
    ],
    marquee: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "CI/CD",
      "Linux",
    ],
  },
  contact: {
    label: "05 — İletişim",
    titleLine1: "Birlikte bir şeyler",
    titleLine2: "inşa edelim.",
    cta: "E-posta gönder",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    socialsLabel: "Sosyal",
  },
  footer: {
    rights: "Tüm hakları saklıdır.",
    builtWith: "Next.js ile sıfırdan tasarlandı & kodlandı",
    localTime: "İstanbul",
    backToTop: "Yukarı dön",
  },
};

const en: Dict = {
  meta: {
    title: "Beraat Can Kahveci — Full Stack Developer",
    description:
      "Frontend-focused Full Stack Developer. I build scalable, performance-driven web products with Next.js, React and TypeScript.",
  },
  nav: {
    items: [
      { id: "work", label: "Work" },
      { id: "experience", label: "Experience" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ],
    langLabel: "Language",
    menuOpen: "Menu",
    menuClose: "Close",
  },
  hero: {
    firstLine: "BERAAT CAN",
    secondLine: "KAHVECI",
    available: "Open to new projects",
    role: "Full Stack Developer",
    focus: "Frontend focused",
    tagline: "I turn ideas into fast, scalable and elegant web products.",
    location: "Istanbul, Türkiye",
    scroll: "Scroll",
  },
  work: {
    label: "01 — Selected Work",
    title: "Projects",
    roleLabel: "Role",
    stackLabel: "Stack",
    yearLabel: "Year",
    visitLabel: "Visit the site",
    projects: [
      {
        slug: "pdks-ai",
        title: "PDKS.ai",
        category: "AI-powered attendance management platform",
        role: "End-to-end development",
        year: "2026",
        description:
          "I took full ownership of the platform's frontend and backend, bringing the product to life from scratch. I manage the performance, maintenance and feature cycle on a sustainable, scalable architecture.",
        stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Docker"],
      },
      {
        slug: "airx",
        title: "AiRX",
        category: "Enterprise attendance web platform",
        role: "Frontend Developer",
        year: "2026",
        description:
          "I played an active role in building and refining the user interfaces of the AiRX web platform — shipping new features, performance improvements and UX enhancements that pushed the product forward.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        slug: "everest",
        title: "Everest",
        category: "Cinematic scroll experience",
        role: "Design & Development",
        year: "2026",
        description:
          "An immersive one-page experience narrating a virtual climb to the summit of Everest. Designed and built from scratch with an altitude, temperature and oxygen HUD synced to real elevation data, cinematic camp-by-camp scroll scenes, sound design and TR/EN language support.",
        stack: ["React", "Vite", "GSAP", "ScrollTrigger", "Lenis"],
      },
      {
        slug: "berat-os",
        title: "BeratOS",
        category: "Retro-futuristic operating system portfolio",
        role: "Design & Development",
        year: "2026",
        description:
          "A purely-for-show alternative portfolio that works like an operating system. It boots up with a startup animation and is explored by browsing files — desktop icons, draggable windows and a terminal that runs real commands. CRT effects and a Three.js scene give it the feel of a game.",
        stack: ["React", "Vite", "Three.js", "GSAP", "Zustand"],
      },
      {
        slug: "invatrix",
        title: "Invatrix",
        category: "Web application with calculation modules",
        role: "End-to-end development & product",
        year: "2025",
        description:
          "I developed the application end to end, covering both frontend and backend, and managed the product development process. Built calculation modules, user interfaces and a sustainable application architecture.",
        stack: ["Next.js", "Node.js", "REST API", "MySQL"],
      },
      {
        slug: "corporate",
        title: "Corporate Web",
        category: "TTOPRO · Tooldict · HC Dijital",
        role: "Full Stack Developer",
        year: "2025—26",
        description:
          "Under HC Dijital, I actively contributed to the frontend and backend of numerous corporate websites, handling SSL, DNS, domain management and deployment pipelines end to end.",
        stack: ["Next.js", "Tailwind CSS", "Vercel", "AWS"],
      },
    ],
  },
  experience: {
    label: "02 — Career",
    title: "Experience",
    items: [
      {
        period: "Mar 2026 — Present",
        role: "Full Stack Developer",
        company: "HC Dijital",
        bullets: [
          "Building scalable, performance-focused web applications with Next.js and React.",
          "Developing new modules, improving existing ones and running performance optimization work across web and mobile projects.",
        ],
      },
      {
        period: "Aug 2025 — Feb 2026",
        role: "Sales Consultant & Technical Support",
        company: "Xoom Training Club",
        bullets: [
          "Supported diagnosis and resolution of technical issues in the gym's software and hardware systems.",
        ],
      },
      {
        period: "Jul 2025 — Aug 2025",
        role: "Software Developer Intern",
        company: "CRS Soft",
        bullets: [
          "Contributed to code development, debugging and application optimization within a team.",
        ],
      },
    ],
    educationLabel: "Education",
    education: {
      school: "Beykoz University",
      degree: "Computer Engineering (English)",
      period: "2021 — 2026",
    },
  },
  about: {
    label: "03 — About",
    title: "About",
    statement:
      "I believe in building user-focused, sustainable and high-quality software.",
    paragraph:
      "I'm a Computer Engineering graduate working as a Full Stack Developer, aiming to specialize in frontend development. I love solving problems, learning new technologies and constantly improving my craft. I value teamwork, clear communication and a strong sense of ownership.",
    facts: [
      { label: "Location", value: "Istanbul, Türkiye" },
      { label: "Focus", value: "Frontend & Product Development" },
      { label: "Education", value: "Computer Engineering" },
      { label: "Languages", value: "Turkish · English" },
    ],
  },
  skills: {
    label: "04 — Skills",
    title: "What I do",
    groups: [
      {
        title: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "HTML5 & CSS3",
        ],
      },
      {
        title: "Backend",
        items: ["Node.js", "REST API", "PostgreSQL", "MySQL"],
      },
      {
        title: "DevOps & Tools",
        items: [
          "Docker",
          "Linux",
          "CI/CD",
          "AWS · Vercel · IHS",
          "Git · GitHub · GitLab",
          "SSL · DNS · Domain",
          "AI-assisted development",
        ],
      },
    ],
    marquee: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "CI/CD",
      "Linux",
    ],
  },
  contact: {
    label: "05 — Contact",
    titleLine1: "Let's build",
    titleLine2: "something together.",
    cta: "Send an email",
    emailLabel: "Email",
    phoneLabel: "Phone",
    socialsLabel: "Socials",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Designed & built from scratch with Next.js",
    localTime: "Istanbul",
    backToTop: "Back to top",
  },
};

export const dictionaries: Record<Locale, Dict> = { tr, en };
