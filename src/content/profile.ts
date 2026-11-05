/** Single source of truth for the site and the AI assistant. Edit facts here. */

export const profile = {
  name: "Somil Arora",
  role: "Software Developer",
  location: "Toronto, ON",
  email: "somilarora55@gmail.com",
  phone: "+1 (647) 612-5182",
  linkedin: "https://linkedin.com/in/somil855",
  github: "https://github.com/Somilstar",
  siteUrl: "https://somilarora-portfolio.vercel.app",
  resumeUrl: "/Somil-Arora-Resume.pdf",
  availability: "Open to new-grad roles for 2027",
  headline: "I build cloud systems that hold up in production.",
  intro:
    "Software developer and final-year Computer Science student at York University. Most recently at IBM, shipping cost-optimization features for Turbonomic across 3 cloud platforms.",
  bio: [
    "I'm a Computer Science student at York University, graduating in April 2027. For the past 16 months I worked as a Software Developer Intern at IBM, where I shipped features across microservices, cloud probes, and customer-facing APIs on Turbonomic.",
    "My work sits at the point where backend engineering meets cloud infrastructure: gRPC schemas, Kubernetes support, feature-flagged rollouts, and production debugging. I also build with LLMs and RAG, and this site's assistant is one example.",
  ],
};

export const metrics = [
  { value: 16, suffix: "", label: "months at IBM" },
  { value: 39, suffix: "+", label: "pull requests merged" },
  { value: 44, suffix: "", label: "Jira tickets closed" },
  { value: 8, suffix: "", label: "repositories" },
  { value: 3, suffix: "", label: "cloud platforms" },
];

export const ibm = {
  company: "IBM",
  role: "Software Developer Intern",
  period: "May 2025 – Aug 2026",
  location: "Markham, ON",
  summary:
    "Merged 39+ pull requests and closed 44 Jira tickets across 8 repositories and 3 cloud platforms over 16 months, coordinating delivery with backend, cloud-probe, frontend, and QE teams.",
  highlights: [
    {
      figure: "3 microservices",
      title: "AWS EKS parking support",
      body: "Delivered end-to-end EKS parking support, extending Turbonomic's managed-Kubernetes cost-optimization coverage and rolling out safely to production behind phased feature flags.",
      tags: ["AWS EKS", "Kubernetes", "Feature flags"],
    },
    {
      figure: "2 REST endpoints",
      title: "Full-stack Parking Mode",
      body: "Designed and shipped a capability spanning new Protobuf/gRPC schemas, service and repository layers, and REST endpoints, giving enterprise customers programmatic control over workload termination vs. suspension.",
      tags: ["gRPC", "Protobuf", "REST"],
    },
    {
      figure: "8 entity types",
      title: "AWS probe discovery",
      body: "Re-architected discovery for cost-optimization deployments by selectively skipping non-essential entity types, cutting unnecessary API calls and reducing pipeline data volume in production.",
      tags: ["AWS", "Data pipelines"],
    },
    {
      figure: "5+ entity types",
      title: "Azure resource-lock safety",
      body: "Built a customer-facing safety system on the Azure Resource Manager API, resolving a live enterprise escalation and preventing accidental parking of protected resources.",
      tags: ["Azure ARM", "Customer escalation"],
    },
    {
      figure: "Root cause",
      title: "Production debugging",
      body: "Fixed a silent data-correctness bug that was dropping database entities without error, and traced a customer-reported Azure API throttling incident to its source through production log analysis.",
      tags: ["Log analysis", "Data correctness"],
    },
  ],
};

export const gaotek = {
  company: "Gao Tek Inc.",
  role: "Tech Support Intern",
  period: "Oct 2023 – Jan 2024",
  location: "Remote",
  highlights: [
    "Cut page load time by 25% and ongoing maintenance effort by 30% through backend query and server-side logic optimization.",
    "Wrote internal technical documentation that shortened onboarding time by 20% and reduced average ticket resolution time.",
    "Triaged tickets with developers and support staff in a fully remote team, and communicated resolutions to non-technical stakeholders.",
  ],
};

export const flagshipProject = {
  title: "Smart Event Processing and Analytics Platform",
  summary:
    "A real-time, event-driven platform for ingesting, processing, and visualizing high-throughput data streams.",
  outcome: "50%",
  outcomeLabel: "faster operational response time",
  points: [
    "Built on Java and Spring Boot with Apache Kafka as the event backbone.",
    "Designed the topic and partitioning strategy so processing workers scale horizontally without downstream reprocessing.",
    "Built a real-time KPI dashboard in React integrated with AWS QuickSight.",
    "Decoupled alert delivery from the pipeline using AWS SNS/SQS.",
  ],
  stack: ["Java", "Spring Boot", "Apache Kafka", "React", "AWS QuickSight", "AWS SNS/SQS"],
};

export const projects = [
  {
    title: "ecoDrive",
    kind: "Full-stack + AI",
    description:
      "EV e-commerce platform built as a team course project, with battery leasing, vehicle comparison, and analytics. Its AI assistant returns structured replies that route shoppers to the right page.",
    stack: ["MongoDB", "Express", "Node.js", "Gemini API", "JWT"],
    href: "https://github.com/Somilstar/ecoDrive",
  },
  {
    title: "Real-Time Chat",
    kind: "Mobile",
    description: "Real-time mobile chat app with a TypeScript client and backend, built with Expo and Socket.IO.",
    stack: ["TypeScript", "Expo", "Socket.IO"],
    href: "https://github.com/Somilstar/ChatApp",
  },
  {
    title: "Env Tracker",
    kind: "Developer tool",
    description:
      "VS Code extension that saves timestamped local snapshots of .env files on every save, so secrets can be recovered without touching Git.",
    stack: ["TypeScript", "VS Code API"],
    href: "https://github.com/Somilstar/Env-tracker",
  },
  {
    title: "This portfolio",
    kind: "AI assistant",
    description:
      "Next.js site with a streaming assistant that answers from my resume data and checks fit against pasted job descriptions.",
    stack: ["Next.js", "TypeScript", "Groq", "OpenRouter"],
    href: "https://github.com/Somilstar/react-portfolio",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Java", "Python", "TypeScript", "JavaScript", "C/C++", "Go", "SQL", "Shell/Bash", "HTML5", "CSS3"],
  },
  {
    group: "Backend & APIs",
    items: ["Spring Boot", "Node.js", "Express.js", "gRPC", "Protocol Buffers", "REST API design", "Microservices", "Event-driven systems"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "CI/CD", "Gradle", "Maven"],
  },
  {
    group: "AI & Machine Learning",
    items: ["OpenAI API", "Claude API", "RAG", "Vector databases", "LangChain", "Prompt engineering", "TensorFlow.js", "Claude Code", "Cursor", "GitHub Copilot"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    group: "Data & Testing",
    items: ["PostgreSQL", "MySQL", "MongoDB", "JUnit", "Postman", "Swagger", "TestRail", "SQL data validation"],
  },
];

export const education = {
  school: "York University",
  degree: "BSc (Hons) Computer Science",
  period: "Sep 2022 – Apr 2027",
  location: "Toronto, ON",
  courses: [
    "Data Structures and Algorithms",
    "Design and Analysis of Algorithms",
    "Operating Systems",
    "Introduction to AI and Logic Programming",
    "Database Management",
    "Advanced Software Engineering",
    "Object Oriented Programming",
  ],
};
