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
    description: 'Designed microservices with Java Spring Boot and Node.js that serve 10M+ users. Expert in RESTful APIs, distributed tracing, and system reliability.',
    emoji: '⚙️',
  },
  {
    title: 'Frontend Craftsman',
    description: 'Built high-performance UIs with React, Next.js and Vue.js, focusing on accessibility, scalability and great user experience.',
    emoji: '🎨',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS Certified Developer. Proficient with Docker, Kubernetes, GitHub Actions, Jenkins and Terraform for production deployments.',
    emoji: '☁️',
  },
  {
    title: 'AI Evaluator',
    description: 'At Alignerr, I evaluate AI-generated full-stack solutions against real-world standards — correctness, safety, scalability and adversarial robustness.',
    emoji: '🤖',
  },
];

// ── Work History ──────────────────────────────
export const workHistory = [
  {
    company: 'Alignerr',
    logo: '🔷',
    role: 'Software Engineer – Freelance',
    period: 'Dec 2025 — Present',
    description: 'AI system evaluation and code quality improvement for Claude (Anthropic).',
    bullets: [
      'Evaluated AI-generated code across real-world repositories for correctness and production readiness',
      'Identified logical bugs, edge-case failures, and poor abstractions in model outputs',
      'Guided model behavior toward real engineering workflows including code review, testing, and iteration',
      'Worked with Claude Code CLI (claude-hfi) to simulate PR-level development cycles',
    ],
  },
  {
    company: 'Cognizant',
    logo: '🔵',
    role: 'Programmer Analyst – Full Stack',
    period: 'Jan 2022 — Oct 2025',
    description: 'Full-stack engineer across DIRECTV, LN Payments, and Macy\'s engagements.',
    bullets: [
      'Built and maintained Spring Boot microservices for DIRECTV serving 10M+ users',
      'Designed payment flows and async background jobs for LN Payments platform',
      'Built production-grade POS UI components for Macy\'s with strict correctness requirements',
      'Implemented distributed tracing, Prometheus metrics, and CI/CD pipelines with Jenkins & GitHub Actions',
    ],
  },
  {
    company: 'Cognizant',
    logo: '🔵',
    role: 'Programmer Analyst Trainee',
    period: 'Jan 2022 — Jun 2022',
    description: 'Foundational full-stack development training and real project onboarding.',
    bullets: [
      'Built full-stack applications using Spring Boot and React during intensive training programme',
      'Applied OOP principles, design patterns, and unit testing in Java',
      'Collaborated on Git-based workflows with code reviews and agile sprints',
    ],
  },
];

// ── Enterprise Projects ───────────────────────
export const enterpriseProjects = [
  {
    title: 'Claude AI Evaluation (Anthropic via Alignerr)',
    emoji: '✳️',
    period: 'Dec 2025 — Present',
    description: 'Working as a contractor contributing to the evaluation and improvement of AI-generated code using the Claude Code CLI (claude-hfi). Iteratively refined model outputs across real-world codebases, ensuring solutions met production-level engineering standards including correctness, edge-case handling, and maintainability while guiding the model to behave like a real software engineer.',
    bullets: [
      'Evaluated AI-generated code across real Git-based codebases for correctness and production readiness',
      'Identified failure modes in model outputs including logical bugs, poor abstractions, and missing edge-case handling',
      'Improved model workflows by enforcing practices like self-review, testing, and iterative refinement',
      'Worked across Python and JavaScript stacks with focus on API design, data integrity, and security',
    ],
    tags: ['AI Evaluation', 'Python', 'Claude Code CLI', 'LLM'],
  },
  {
    title: 'DIRECTV High-Availability Platform',
    emoji: '📡',
    period: 'Nov 2023 — Jun 2025',
    description: 'Designed and maintained Spring Boot + React services for DIRECTV\'s internal platform serving millions of concurrent users. Owned distributed tracing, observability, and API reliability improvements across multiple team boundaries.',
    bullets: [
      'Built and operated microservices with Spring Boot serving 10M+ users with high availability',
      'Implemented distributed tracing with Dynatrace and Prometheus for production issue debugging',
      'Improved API contract consistency across 6+ internal teams through standardised patterns',
      'Delivered CI/CD automation reducing deployment time by 40% using Jenkins and GitHub Actions',
    ],
    tags: ['Spring Boot', 'React', 'Microservices', 'AWS', 'DevOps'],
  },
  {
    title: 'LN Payments Platform',
    emoji: '💳',
    period: 'Aug 2022 — Oct 2023',
    description: 'Built UI and backend for a trust-sensitive payments platform handling high-value transaction flows. Ensured data integrity and fault tolerance across async payment processing pipelines.',
    bullets: [
      'Designed and implemented payment workflows with Spring Boot and PostgreSQL',
      'Built async background job processing ensuring transactional data integrity under load',
      'Created a React-based payments dashboard with real-time status updates',
      'Collaborated with QA and security team on PCI-DSS compliant flows',
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'React', 'Async Jobs', 'Payments'],
  },
  {
    title: "Macy's POS System",
    emoji: '🏬',
    period: 'Jul 2025 — Oct 2025',
    description: 'Contributed production-grade UI components and backend integrations for Macy\'s large-scale Point-of-Sale system operating in real retail environments with strict uptime and correctness demands.',
    bullets: [
      'Built reusable React components for POS checkout flows with zero-tolerance for UI regressions',
      'Analysed and optimised SQL queries reducing average latency by 35%',
      'Worked with QA on automated regression suites for trust-critical release gates',
      'Integrated REST APIs connecting POS frontend with inventory and payment backends',
    ],
    tags: ['React', 'SQL', 'REST APIs', 'POS', 'Java'],
  },
];

// ── Personal Projects ─────────────────────────
export const personalProjects = [
  {
    title: '3D Interactive Portfolio',
    description: 'A Three.js powered interactive portfolio room with AI assistant, mini games, and dynamic environment. Clickable objects reveal different sections of the portfolio.',
    tags: ['Three.js', 'React', 'AI', 'WebGL'],
    github: 'https://github.com/AnishKrishnan73/anish-portfolio-gamma-steel',
    live: 'https://anish-portfolio-gamma-steel.vercel.app',
  },
  {
    title: 'AI Support System',
    description: 'Simulates an e-commerce support assistant capable of handling customer queries. Built with clean layered architecture and designed to avoid hallucinations by grounding responses in real database data.',
    tags: ['Python', 'LLM', 'FastAPI', 'RAG'],
    github: 'https://github.com/AnishKrishnan73',
    live: null,
  },
  {
    title: 'GitHub Issue Analyzer with Local Caching + LLM Processing',
    description: 'Backend service that fetches and caches GitHub issues from a repository, then analyzes them using an LLM to extract insights through natural-language prompts.',
    tags: ['Python', 'GitHub API', 'LLM', 'Redis'],
    github: 'https://github.com/AnishKrishnan73',
    live: null,
  },
  {
    title: 'Distributed Task Queue System',
    description: 'A distributed task queue built with Java Spring Boot and Redis, supporting priority queues, retry logic, and dead-letter queues for resilient background processing.',
    tags: ['Java', 'Spring Boot', 'Redis', 'Distributed Systems'],
    github: 'https://github.com/AnishKrishnan73',
    live: null,
  },
];

// ── Certifications ────────────────────────────
export const certifications = [
  {
    name: 'AWS Cloud Practitioner – Foundational',
    emoji: '☁️',
    org: 'Amazon Web Services',
    credentialId: 'E9M0RKJKWM4E1DK3',
    viewUrl: 'https://www.credly.com/badges/your-badge-id',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'AWS Certified Developer – Associate',
    emoji: '☁️',
    org: 'Amazon Web Services',
    credentialId: '0dc9259e497a4306afb539cb6d2cd9fd',
    viewUrl: 'https://www.credly.com/badges/your-badge-id-2',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'AWS Certified AI Practitioner',
    emoji: '🤖',
    org: 'Amazon Web Services',
    credentialId: '3760f0aef37341198dd4f7f39e0dfe71',
    viewUrl: 'https://www.credly.com/badges/your-badge-id-3',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'GitHub Copilot Certification',
    emoji: '⚡',
    org: 'GitHub',
    credentialId: 'xkNgR7ca',
    viewUrl: 'https://www.credly.com/badges/your-badge-id-4',
    verifyUrl: 'https://examregistration.github.com/verify',
    color: '#24292e',
  },
];

// ── Skills (used in Skills section) ──────────
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

// ── Skills section experience timeline ───────
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
        desc: "Worked across DIRECTV, LN Payments and Macy's. Built Spring Boot microservices, React UIs, payment flows, and POS systems for millions of users.",
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

// ── Chatbot knowledge base ────────────────────
export const chatbotContext = `
You are Anish Krishnan's personal portfolio assistant. Answer questions about Anish concisely and enthusiastically.
Keep answers to 2-4 sentences. Use third person when describing Anish (e.g., "Anish has..." or "He specialised in...").

ABOUT ANISH:
- Full Stack Engineer based in Chandigarh, India
- 3+ years professional experience
- Currently freelancing at Alignerr (Dec 2025 – Present) evaluating AI-generated code for Anthropic
- Previously Programmer Analyst at Cognizant (Jan 2022 – Oct 2025)
- Education: Chitkara University, 8.68/10 GPA

TECH STACK:
- Languages: Java, Python, JavaScript, TypeScript
- Backend: Spring Boot, REST APIs, Microservices, Node.js, JWT
- Frontend: React, Next.js, Vue.js, ThreeJS, HTML, CSS, Tailwind
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Cloud/DevOps: AWS (3 certs), Docker, Kubernetes, GitHub Actions, Jenkins, Terraform
- Observability: Prometheus, Grafana, Dynatrace, Distributed Tracing
- AI Tooling: LLM evaluation, Prompt design, n8n, Claude Code CLI, GitHub Copilot

ENTERPRISE PROJECTS:
1. Claude AI Evaluation for Anthropic via Alignerr (Dec 2025–Present): Evaluating AI-generated code, adversarial prompt design
2. DIRECTV (Nov 2023–Jun 2025): High-availability Spring Boot + React platform, 10M+ users, distributed tracing
3. LN Payments (Aug 2022–Oct 2023): Payments platform backend, async workflows, data integrity
4. Macy's POS (Jul–Oct 2025): POS system UI, SQL tuning, trust-critical releases

PERSONAL PROJECTS:
- 3D Interactive Portfolio (Three.js, React, AI assistant)
- AI Support System (Python, LLM, FastAPI, RAG)
- GitHub Issue Analyzer with LLM Processing
- Distributed Task Queue System (Java, Spring Boot, Redis)

CERTIFICATIONS:
- AWS Cloud Practitioner (Foundational) — ID: E9M0RKJKWM4E1DK3
- AWS Certified Developer (Associate) — ID: 0dc9259e497a4306afb539cb6d2cd9fd
- AWS Certified AI Practitioner — ID: 3760f0aef37341198dd4f7f39e0dfe71
- GitHub Copilot Certification — ID: xkNgR7ca

CONTACT:
- Email: anishkrishnan72@gmail.com
- GitHub: github.com/AnishKrishnan73
- LinkedIn: linkedin.com/in/anish-krishnan-/
- Location: Chandigarh, India

Be helpful, professional, and friendly. If you don't know something specific, suggest they contact Anish directly.
`;
