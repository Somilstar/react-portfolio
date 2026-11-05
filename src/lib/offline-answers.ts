import { education, flagshipProject, gaotek, ibm, profile, projects, skills } from "@/content/profile";

/** Keyword answers so the assistant stays useful when no API key is set or the API is unavailable. */
const intents: { pattern: RegExp; answer: () => string }[] = [
  {
    pattern: /job description|responsibilities|requirements|qualifications|we are looking|you will/i,
    answer: () =>
      `Job-description matching needs the live AI, which isn't available right now. You can reach Somil directly at ${profile.email}.`,
  },
  {
    pattern: /\bai\b|machine learning|\bml\b|llm|rag|langchain|claude|openai/i,
    answer: () =>
      `Somil works with ${skills[3].items.slice(0, 7).join(", ")}. On GitHub, ecoDrive includes an AI shopping assistant that returns structured replies, and this site has its own AI assistant.`,
  },
  {
    pattern: /gao ?tek|support/i,
    answer: () => `At ${gaotek.company}, Somil was a ${gaotek.role} (${gaotek.period}).\n\n- ${gaotek.highlights.join("\n- ")}`,
  },
  {
    pattern: /ibm|turbonomic|intern|experience|work|ship|built at|job/i,
    answer: () =>
      `Somil was a ${ibm.role} at IBM (${ibm.period}). ${ibm.summary}\n\nHighlights:\n${ibm.highlights
        .slice(0, 4)
        .map((h) => `- **${h.title}** (${h.figure})`)
        .join("\n")}`,
  },
  {
    pattern: /project|kafka|portfolio|github|ecodrive|built/i,
    answer: () =>
      `Somil's main project is the **${flagshipProject.title}**: ${flagshipProject.summary} Also on GitHub: ${projects
        .slice(0, 3)
        .map((p) => p.title)
        .join(", ")}.`,
  },
  {
    pattern: /skill|stack|tech|language|java|python|cloud|aws|azure|kubernetes|backend|frontend/i,
    answer: () => skills.map((s) => `- **${s.group}:** ${s.items.slice(0, 6).join(", ")}`).join("\n"),
  },
  {
    pattern: /educat|school|university|york|degree|graduat|course/i,
    answer: () => `Somil is studying ${education.degree} at ${education.school} (${education.period}).`,
  },
  {
    pattern: /contact|email|phone|reach|hire|hiring|available|availability|linkedin|resume|\bcv\b/i,
    answer: () =>
      `Reach Somil at ${profile.email} or on [LinkedIn](${profile.linkedin}), or read the [resume](${profile.resumeUrl}).`,
  },
];

export function offlineAnswer(question: string): string {
  const match = intents.find((intent) => intent.pattern.test(question));
  if (match) return match.answer();
  return `I can tell you about Somil's experience at IBM, projects, skills, education, or how to get in touch. What would you like to know?`;
}
