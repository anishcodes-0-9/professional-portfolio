// ─────────────────────────────────────────────
//  All personalised data for Anish Krishnan
// ─────────────────────────────────────────────

export const personalInfo = {
  name: 'Anish Krishnan',
  firstName: 'Anish',
  taglines: ['Full Stack Engineer', 'Backend Architect', 'AI Enthusiast'],
  location: 'Chandigarh, India',
  email: 'anishkrishnan72@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anish-krishnan-/',
  github: 'https://github.com/AnishKrishnan73',
  portfolio: 'https://anish-portfolio-gamma-steel.vercel.app',
  summary:
    'Full Stack Developer with 3+ years building scalable distributed systems for 10M+ users. I specialize in Java Spring Boot, React, and cloud-native architectures. Currently freelancing at Alignerr evaluating AI-generated code for trust-sensitive systems.',
};

export const aboutCards = [
  {
    title: 'Backend Engineer',
    description:
      'Designed microservices with Java Spring Boot and Node.js that serve 10M+ users. Expert in RESTful APIs, distributed tracing, and system reliability.',
    emoji: '⚙️',
  },
  {
    title: 'Frontend Craftsman',
    description:
      'Built high-performance UIs with React, Next.js and Vue.js, focusing on accessibility, scalability and great user experience.',
    emoji: '🎨',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'AWS Certified Developer. Proficient with Docker, Kubernetes, GitHub Actions, Jenkins and Terraform for production deployments.',
    emoji: '☁️',
  },
  {
    title: 'AI Evaluator',
    description:
      'At Alignerr, I evaluate AI-generated full-stack solutions against real-world standards — correctness, safety, scalability and adversarial robustness.',
    emoji: '🤖',
  },
];

export const experiences = [
  {
    year: '2025 – Now',
    works: [
      {
        name: 'Software Engineer (Freelance)',
        company: 'Alignerr',
        desc: 'Evaluating AI-generated backend and full-stack solutions. Writing adversarial prompts, reviewing Python/JS API logic, and assessing trust-critical system behaviour.',
      },
    ],
  },
  {
    year: '2022 – 2025',
    works: [
      {
        name: 'Programmer Analyst – Full Stack',
        company: 'Cognizant',
        desc: 'Worked across DIRECTV, LN Payments and Macy\'s. Built Spring Boot microservices, React UIs, payment flows, and POS systems for millions of users.',
      },
    ],
  },
  {
    year: '2022',
    works: [
      {
        name: 'Programmer Analyst Trainee',
        company: 'Cognizant',
        desc: 'Built full-stack apps with Spring Boot & React. Focused on OOP, design patterns, unit testing, and collaborative Git workflows.',
      },
    ],
  },
];

export const skills = [
  { name: 'Java', bgColor: '#f0f4ff' },
  { name: 'Spring Boot', bgColor: '#f0fff4' },
  { name: 'React', bgColor: '#e8f4ff' },
  { name: 'Next.js', bgColor: '#f5f5f5' },
  { name: 'Node.js', bgColor: '#f0fff4' },
  { name: 'Python', bgColor: '#fffbe8' },
  { name: 'JavaScript', bgColor: '#fffbe8' },
  { name: 'TypeScript', bgColor: '#e8f4ff' },
  { name: 'PostgreSQL', bgColor: '#e8f0ff' },
  { name: 'MongoDB', bgColor: '#f0fff4' },
  { name: 'Redis', bgColor: '#fff0f0' },
  { name: 'Docker', bgColor: '#e8f4ff' },
  { name: 'Kubernetes', bgColor: '#e8f4ff' },
  { name: 'AWS', bgColor: '#fff8e8' },
  { name: 'Terraform', bgColor: '#f0e8ff' },
  { name: 'Prometheus', bgColor: '#fff0e8' },
  { name: 'Vue.js', bgColor: '#f0fff4' },
  { name: 'GraphQL', bgColor: '#ffe8f8' },
];

export const projects = [
  {
    title: 'DIRECTV High-Availability Platform',
    description:
      'Designed and operated Spring Boot + React services for DIRECTV used by multiple internal teams. Debugged distributed production issues with logs, metrics, and distributed tracing.',
    tags: ['Spring Boot', 'React', 'DevOps'],
    category: 'Enterprise',
    period: 'Nov 2023 – Jun 2025',
    highlights: ['10M+ users', 'Distributed tracing', 'API reliability'],
    projectLink: '#',
    codeLink: 'https://github.com/anish-krishnan',
  },
  {
    title: 'LN Payments Platform',
    description:
      'Built UI and backend for a trust-sensitive payments platform. Implemented async workflows and background jobs with Spring Boot, ensuring data integrity across transactional systems.',
    tags: ['Spring Boot', 'Payments', 'Backend'],
    category: 'Enterprise',
    period: 'Aug 2022 – Oct 2023',
    highlights: ['Payment flows', 'Async jobs', 'Data integrity'],
    projectLink: '#',
    codeLink: 'https://github.com/anish-krishnan',
  },
  {
    title: "Macy's POS System",
    description:
      'Built production-grade UI components for large-scale POS systems with strict correctness requirements. Analysed SQL query latency and collaborated with QA for trust-critical releases.',
    tags: ['React', 'SQL', 'POS'],
    category: 'Enterprise',
    period: 'Jul 2025 – Oct 2025',
    highlights: ['POS system', 'SQL tuning', 'React UI'],
    projectLink: '#',
    codeLink: 'https://github.com/anish-krishnan',
  },
  {
    title: 'AI Code Evaluation Framework',
    description:
      'At Alignerr, built a systematic framework for evaluating AI-generated code across correctness, safety, and scalability dimensions. Wrote adversarial prompts simulating real attack vectors.',
    tags: ['AI', 'Python', 'Evaluation'],
    category: 'AI',
    period: 'Dec 2025 – Present',
    highlights: ['LLM evaluation', 'Adversarial testing', 'Trust & Safety'],
    projectLink: '#',
    codeLink: 'https://github.com/anish-krishnan',
  },
];

export const certifications = [
  { name: 'AWS Cloud Practitioner', level: 'Foundational', color: '#FF9900' },
  { name: 'AWS Certified Developer', level: 'Associate', color: '#FF9900' },
  { name: 'AWS Certified AI Practitioner', level: 'Foundational', color: '#FF9900' },
  { name: 'GitHub Copilot Certification', level: 'Professional', color: '#24292e' },
];

// ─────────────────────────────────────────────
//  Chatbot knowledge base
// ─────────────────────────────────────────────
export const chatbotContext = `
You are Anish Krishnan's personal portfolio assistant. Answer questions about Anish concisely and enthusiastically. 
Keep answers to 2-4 sentences. Use first person when describing Anish's skills (e.g., "Anish has..." or "He specialised in...").

ABOUT ANISH:
- Full Stack Engineer based in Chandigarh, India
- 3+ years professional experience
- Currently freelancing at Alignerr (Dec 2025 – Present) evaluating AI-generated code
- Previously Programmer Analyst at Cognizant (Jan 2022 – Oct 2025)
- Education: Chitkara University, 8.68/10 GPA

TECH STACK:
- Languages: Java, Python, JavaScript, TypeScript
- Backend: Spring Boot, REST APIs, Microservices, Node.js, JWT
- Frontend: React, Next.js, Vue.js, ThreeJS, HTML, CSS, Tailwind
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Cloud/DevOps: AWS (3 certs), Docker, Kubernetes, GitHub Actions, Jenkins, Terraform
- Observability: Prometheus, Grafana, Dynatrace, Distributed Tracing
- AI Tooling: LLM evaluation, Prompt design, n8n, Claude, GitHub Copilot

PROJECTS / ENTERPRISE ENGAGEMENTS:
1. DIRECTV (Nov 2023 – Jun 2025): High-availability Spring Boot + React platform, distributed tracing, API reliability
2. LN Payments (Aug 2022 – Oct 2023): Payments platform backend, async workflows, data integrity
3. Macy's (Jul 2025 – Oct 2025): POS system UI, SQL tuning, trust-critical releases
4. Alignerr / AI Evaluation (Dec 2025 – Present): Evaluating AI code, adversarial prompt design, Python backend review

CERTIFICATIONS:
- AWS Cloud Practitioner (Foundational)
- AWS Certified Developer (Associate)
- AWS Certified AI Practitioner
- GitHub Copilot Certification

CONTACT:
- GitHub: github.com/anish-krishnan
- LinkedIn: linkedin.com/in/anish-krishnan
- Location: Chandigarh, India

Be helpful, professional, and friendly. If you don't know something specific, suggest they contact Anish directly.
`;
