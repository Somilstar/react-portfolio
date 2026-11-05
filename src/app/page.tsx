import { AssistantProvider } from "@/components/assistant";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { education, ibm, profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  knowsAbout: ["Distributed systems", "Cloud infrastructure", "Kubernetes", "LLM integration"],
  hasOccupation: { "@type": "Occupation", name: ibm.role },
};

export default function Home() {
  return (
    <AssistantProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
    </AssistantProvider>
  );
}
