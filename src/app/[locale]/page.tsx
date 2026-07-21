import { dictionaries, type Locale } from "@/lib/dictionaries";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = dictionaries[locale as Locale] ?? dictionaries.tr;

  return (
    <main>
      <Hero dict={dict.hero} />
      <Projects dict={dict.work} />
      <Experience dict={dict.experience} />
      <About dict={dict.about} />
      <Skills dict={dict.skills} />
      <Contact dict={dict.contact} />
    </main>
  );
}
