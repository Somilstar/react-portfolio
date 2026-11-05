import { AssistantProvider } from "@/components/assistant";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { education, profile } from "@/content/profile";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: profile.siteUrl,
  name: `${profile.name} | ${profile.role}`,
  mainEntity: {
    "@type": "Person",
    "@id": `${profile.siteUrl}/#person`,
    name: profile.name,
    url: profile.siteUrl,
    image: `${profile.siteUrl}/images/somil-arora.jpg`,
    jobTitle: profile.role,
    description: profile.description,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: ["Distributed systems", "Cloud infrastructure", "Kubernetes", "Microservices", "LLM integration"],
  },
};

export default function Home() {
  return (
    <AssistantProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
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
