// ─────────────────────────────────────────────
//  All personalised data for Anish Krishnan
// ─────────────────────────────────────────────

// Real, locally-captured previews of the live products — not fabricated
// UI. Captured once from the verified live URLs below rather than
// embedding the live sites (avoids iframe security/reliability issues).
import threeDRoomPreview from '../assets/project-3d-interactive-room.png';
import storyboardAiPreview from '../assets/project-storyboard-ai.png';

export const personalInfo = {
  name: 'Anish Krishnan',
  firstName: 'Anish',
  taglines: ['Senior Software Engineer', 'Full Stack Engineer', 'AI Evaluation Specialist'],
  location: 'Chandigarh, India',
  email: 'anishkrishnan72@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anishkrishnan09/',
  github: 'https://github.com/anishcodes-0-9',
  portfolio: 'https://anish-krishnan-portfolio.vercel.app/',
  summary:
    'Full Stack Engineer with 4+ years building distributed systems and web applications serving 10M+ users. Experienced in Java, Python, React, and cloud infrastructure, with hands-on work in ML integration and AI evaluation. Proven track record of reducing latency, improving reliability, and shipping production features across payments, media, and retail domains.',
};

export const aboutCards = [
  {
    title: 'Systems & Backend',
    description:
      'Builds distributed backend systems with Java, Spring Boot, Node.js, REST APIs, API versioning, and defensive coding patterns for high-reliability products.',
    emoji: '⚙️',
  },
  {
    title: 'Frontend Delivery',
    description:
      'Ships recruiter-ready and customer-facing experiences with React, Next.js, Vue.js, Three.js, HTML, CSS, and Tailwind, with a strong focus on performance and usability.',
    emoji: '🎨',
  },
  {
    title: 'Cloud & Observability',
    description:
      'Works across AWS, Docker, Kubernetes, Jenkins, GitHub Actions, Terraform, logs, metrics, distributed tracing, Dynatrace, and incident debugging for production systems.',
    emoji: '☁️',
  },
  {
    title: 'AI & ML Tooling',
    description:
      'Brings hands-on experience in Python ML tooling, LLM evaluation, prompt engineering, Hugging Face, Claude, GitHub Copilot, and workflow automation with n8n.',
    emoji: '🤖',
  },
];

// ── Work History ──────────────────────────────
export const workHistory = [
  {
    company: 'Debut Infotech',
    logoKey: 'debut',
    role: 'Senior Software Engineer',
    period: 'May 2026 — Present',
    description:
      'Leading full-stack development for the company website and backend platform using Next.js, React, and Node.js.',
    bullets: [
      'Led frontend and backend development of the company website using Next.js, React, and Node.js, delivering performant SEO-optimised pages with server-side rendering and dynamic routing',
      'Architected and maintained scalable REST APIs and backend services in Node.js, establishing coding standards and best practices adopted across the engineering team',
      'Mentored engineers through code reviews, technical design discussions, and sprint planning, improving team velocity and overall delivery quality',
      'Drove end-to-end feature ownership from requirements to production deployment, ensuring high reliability and zero critical post-release defects',
    ],
  },
  {
    company: 'Alignerr',
    logoKey: 'alignerr',
    role: 'Software Engineer (Freelance)',
    period: 'Dec 2025 — Apr 2026',
    description:
      'Evaluated AI-generated backend and full-stack systems for correctness, safety, scalability, and trust-sensitive behavior.',
    bullets: [
      'Evaluated 100+ AI-generated backend and full-stack solutions against real-world engineering standards, flagging correctness, safety, and scalability issues in Python and Node.js codebases',
      'Assessed front-end behavior including state assumptions, data consistency, and integration boundaries affecting user trust and system reliability',
      'Compared multiple implementations and selected solutions based on trade-offs in performance, scalability, and risk, improving average solution quality scores by 20%',
      'Designed and validated prompts simulating attack vectors, edge cases, and misuse scenarios, improving robustness of AI-driven systems',
      'Applied structured reasoning around system failures, ambiguous inputs, and adversarial behavior, aligned with Trust & Risk Engineering principles',
    ],
  },
  {
    company: 'Cognizant',
    logoKey: 'cognizant',
    role: 'Programmer Analyst (Full-Stack Engineer)',
    period: 'Aug 2022 — Oct 2025',
    description:
      'Worked across DIRECTV, LN Payments, and Macy’s engagements, shipping backend services, operational tooling, and production-grade UI flows.',
    bullets: [
      'Collaborated with Product, QA, and DevOps across agile sprints to deliver 20+ features on schedule with zero critical post-release defects',
      'Designed and operated Spring Boot, React, and Node-based systems across media, payments, and retail domains with strong reliability expectations',
      'Worked deeply with SQL tuning, data integrity flows, distributed tracing, logs, and operational debugging across production environments',
      'Supported trust-critical releases by partnering with product and QA while improving API contracts, integration boundaries, and release confidence',
    ],
  },
  {
    company: 'Cognizant',
    logoKey: 'cognizant',
    role: 'Programmer Analyst Trainee',
    period: 'Jan 2022 — Jul 2022',
    description:
      'Foundational full-stack development training and real project onboarding.',
    bullets: [
      'Developed backend services and APIs with emphasis on clean architecture, defensive coding, and robust error handling',
      'Wrote Python scripts for test data generation and automated validation, cutting manual QA effort by about 25% across the team',
      'Wrote unit and integration tests achieving 80%+ code coverage, ensuring reliability and maintainability across services',
    ],
  },
];

// ── Enterprise Projects ───────────────────────
export const enterpriseProjects = [
  {
    title: 'Debut Infotech Website',
    type: 'professional',
    logoKey: 'debut',
    brandLabel: 'Debut Infotech',
    period: 'May 2026 — Present',
    status: 'Production Experience',
    confidential: false,
    description:
      "Engineered the company's public marketing and SEO website — the primary platform for representing Debut Infotech's capabilities and generating inbound client interest — with Next.js, React, and Node.js.",
    bullets: [
      "Led frontend and backend development of the company's public marketing website using Next.js, React, and Node.js",
      'Delivered SEO-optimised, server-rendered pages with dynamic routing to support organic visibility and inbound lead generation',
      'Architected and maintained the REST APIs and backend services powering the site',
      'Owns end-to-end delivery of site features from requirements through production deployment',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'SEO'],
    github: null,
    live: 'https://www.debutinfotech.com/',
  },
  {
    title: 'OMEX Industries Website',
    type: 'professional',
    logoKey: 'omex',
    brandLabel: 'OMEX Industries',
    period: 'May 2026 — Present',
    status: 'Production Experience',
    confidential: false,
    description:
      'Built the OMEX Industries production website from scratch, taking full engineering ownership from implementation through deployment, using Next.js, React, and Tailwind CSS.',
    bullets: [
      'Built the OMEX Industries website from scratch as a full-stack engineering effort, from implementation through production deployment',
      'Implemented the frontend with Next.js, React, and Tailwind CSS',
      'Took the site from initial build to a production-ready public website while at Debut Infotech',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    github: null,
    live: 'https://www.omexindustries.com/',
  },
  {
    title: 'Claude AI Evaluation (Anthropic via Alignerr)',
    type: 'professional',
    logoKey: 'claude',
    brandLabel: 'Claude',
    period: 'Dec 2025 — Apr 2026',
    status: 'Production Experience',
    confidential: true,
    description:
      'Evaluated AI-generated backend and full-stack solutions used for trust-sensitive engineering scenarios, focusing on correctness, safety, system behavior, and implementation trade-offs.',
    bullets: [
      'Evaluated 100+ AI-generated backend and full-stack solutions against real-world engineering standards across Python and Node.js codebases',
      'Assessed front-end behavior including state assumptions, data consistency, and integration boundaries affecting user trust and system reliability',
      'Compared multiple implementations based on performance, scalability, and risk trade-offs, improving average solution quality scores by 20%',
      'Designed prompts simulating attack vectors, edge cases, and misuse scenarios to improve robustness in AI-driven systems',
      'Applied structured reasoning around ambiguous inputs and adversarial behavior aligned with Trust & Risk Engineering principles',
    ],
    tags: ['AI Evaluation', 'Python', 'Claude Code CLI', 'LLM'],
  },
  {
    title: 'DIRECTV High-Availability Platform',
    type: 'professional',
    logoKey: 'directv',
    brandLabel: 'DIRECTV',
    period: 'Nov 2023 — Jun 2025',
    status: 'Production Experience',
    confidential: true,
    description:
      'Designed and operated high-availability Spring Boot + React services consumed by 5+ internal teams, with a strong focus on observability, uptime, and incident response.',
    bullets: [
      'Designed and operated high-availability Spring Boot + React services consumed by 5+ internal teams, maintaining 99.99% uptime over 18 months',
      'Automated infrastructure health checks and log analysis using Python scripts, reducing manual debugging time for distributed service failures by 45%',
      'Debugged distributed production issues using logs, metrics, and tracing, cutting incident resolution time from hours to under 30 minutes',
      'Improved system reliability by refining API contracts and integration boundaries, eliminating a recurring class of integration failures',
    ],
    tags: ['Spring Boot', 'React', 'Microservices', 'AWS', 'DevOps'],
  },
  {
    title: 'LN Payments Platform',
    type: 'professional',
    logoKey: 'lexisnexis',
    brandLabel: 'LexisNexis',
    period: 'Aug 2022 — Oct 2023',
    status: 'Production Experience',
    confidential: true,
    description:
      'Built UI and backend services for a payments platform handling more than $2M in daily transactions, prioritizing correctness, async processing, and data consistency.',
    bullets: [
      'Built UI and backend services for a payments platform handling $2M+ in daily transactions, prioritizing correctness and data consistency',
      'Implemented asynchronous workflows and background jobs using Spring Boot, processing 50K+ events per day with zero message loss',
      'Ensured data integrity across transactional systems and internal tooling, reducing reconciliation errors by 60%',
      'Created product flows that balanced speed, trust, and operational stability for payment processing teams',
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'React', 'Async Jobs', 'Payments'],
  },
  {
    title: "Macy's POS System",
    type: 'professional',
    logoKey: 'macys',
    brandLabel: "Macy's",
    period: 'Jul 2025 — Oct 2025',
    status: 'Production Experience',
    confidential: true,
    description:
      'Built production-grade UI components and data-quality tooling for a large-scale Enactor-based retail POS platform, where correctness and performance directly affected store operations.',
    bullets: [
      'Built production-grade UI components for a large-scale Enactor POS platform, meeting strict correctness and performance benchmarks across 500+ retail endpoints',
      'Investigated data mismatches and latency issues by analyzing SQL queries and transactional flows, resolving 15+ recurring production defects',
      'Wrote Python scripts to reconcile and validate POS transaction data, catching data integrity issues before they surfaced in production',
      'Collaborated with product and QA to ship stable, trust-critical releases under tight timelines',
    ],
    tags: ['React', 'SQL', 'REST APIs', 'POS', 'Enactor', 'Java'],
  },
];

// ── Personal Projects ─────────────────────────
export const personalProjects = [
  {
    title: '3D Interactive Room',
    type: 'personal',
    image: threeDRoomPreview,
    status: 'Live Demo',
    description:
      'A Three.js powered interactive room with AI assistant, mini games, and dynamic environment. Clickable objects reveal different sections of the portfolio.',
    tags: ['Three.js', 'GSAP', 'AI', 'WebGL'],
    github: 'https://github.com/anishcodes-0-9/3D-Interactive-Room',
    live: 'https://anish-3d-room-gamma-steel.vercel.app/',
  },
  {
    title: 'Storyboard AI',
    type: 'personal',
    image: storyboardAiPreview,
    status: 'Live Demo',
    description:
      'Storyboard AI is a full-stack AI product that turns a rough prompt into a polished, presentation-ready storyboard.',
    tags: ['TypeScript', 'JavaScript', 'CSS', 'HTML', 'LLM'],
    github: 'https://github.com/anishcodes-0-9/storyboard-ai',
    live: 'https://storyboard-ai-4f1d.onrender.com/',
  },
  {
    title: 'GitHub Issue Analyzer with Local Caching + LLM Processing',
    type: 'personal',
    status: 'Source Available',
    description:
      'Backend service that fetches and caches GitHub issues from a repository, then analyzes them using an LLM to extract insights through natural-language prompts.',
    tags: ['Node.js', 'GitHub API', 'LLM', 'SQLite'],
    github: 'https://github.com/anishcodes-0-9/github-issue-analyzer',
    live: null,
  },
  {
    title: 'AI Support System',
    type: 'personal',
    status: 'Source Available',
    description:
      'Simulates an e-commerce support assistant capable of handling customer queries. Built with clean layered architecture and designed to avoid hallucinations by grounding responses in real database data.',
    tags: ['TypeScript', 'LLM', 'Hono', 'RAG'],
    github: 'https://github.com/anishcodes-0-9/ai-support-system',
    live: null,
  },
];

// ── Certifications ────────────────────────────
export const certifications = [
  {
    name: 'AWS Cloud Practitioner – Foundational',
    logoKey: 'aws',
    org: 'Amazon Web Services',
    credentialId: 'E9M0RKJKWM4E1DK3',
    viewUrl: '/Anish_Krishnan_Cloud_Practitioner.pdf',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'AWS Certified Developer – Associate',
    logoKey: 'aws',
    org: 'Amazon Web Services',
    credentialId: '0dc9259e497a4306afb539cb6d2cd9fd',
    viewUrl: '/Anish_Krishnan_AWS_Developer_Associate.pdf',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'AWS Certified AI Practitioner',
    logoKey: 'aws',
    org: 'Amazon Web Services',
    credentialId: '3760f0aef37341198dd4f7f39e0dfe71',
    viewUrl: '/AWS_Certified_AI_Practitioner_Certificate.pdf',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#FF9900',
  },
  {
    name: 'GitHub Copilot Certification',
    logoKey: 'github',
    org: 'GitHub',
    credentialId: 'cbb9dd25-c996-4b5d-a141-f357969b88f9',
    viewUrl: '/GitHub_Copilot_Certification.pdf',
    verifyUrl:
      'https://www.credly.com/earner/earned/badge/cbb9dd25-c996-4b5d-a141-f357969b88f9',
    color: '#FF9900',
  },
  // Anthropic Academy (Skilljar) — verified directly against each
  // certificate's own verify.skilljar.com page. No locally-hosted PDF
  // exists for these, so there's no viewUrl; the Skilljar verification
  // page itself is both the certificate and the proof, unlike the AWS/
  // GitHub rows above which pair a local PDF with a separate verifier.
  // Ordered chronologically by each certificate's real completion date.
  {
    name: 'Introduction to Model Context Protocol',
    logoKey: 'claude',
    org: 'Anthropic Education',
    credentialId: '9d46zykggn26',
    verifyUrl: 'https://verify.skilljar.com/c/9d46zykggn26',
    color: '#d97706',
  },
  {
    name: 'Introduction to Agent Skills',
    logoKey: 'claude',
    org: 'Anthropic Education',
    credentialId: 'wg3b3932hj9n',
    verifyUrl: 'https://verify.skilljar.com/c/wg3b3932hj9n',
    color: '#d97706',
  },
  {
    name: 'Claude Code in Action',
    logoKey: 'claude',
    org: 'Anthropic Education',
    credentialId: 'ku2vhidgbap2',
    verifyUrl: 'https://verify.skilljar.com/c/ku2vhidgbap2',
    color: '#d97706',
  },
  {
    name: 'Building with the Claude API',
    logoKey: 'claude',
    org: 'Anthropic Education',
    credentialId: 'nkakgf5ka2yk',
    verifyUrl: 'https://verify.skilljar.com/c/nkakgf5ka2yk',
    color: '#d97706',
  },
];

// ── Skills (used in Skills section) ──────────
// One canonical, ordered technology list — tier (importance-weighted,
// used by Header's hero stack line) and domain (used by the Skills stack
// map) are both derived views over this same source order, so neither
// can drift from the other and neither needs an explicit sort. Order
// matches the original three tier blocks concatenated, so skillGroups
// below reproduces the exact same shape/order Header.jsx already depends
// on (skillGroups.find(g => g.tier === 'Core stack').skills.slice(0,3)).
const SKILL_RECORDS = [
  { name: 'Java', tier: 'Core stack', domain: 'Backend' },
  { name: 'Spring Boot', tier: 'Core stack', domain: 'Backend' },
  { name: 'React', tier: 'Core stack', domain: 'Frontend' },
  { name: 'Node.js', tier: 'Core stack', domain: 'Backend' },
  { name: 'Python', tier: 'Core stack', domain: 'Backend' },
  { name: 'AWS', tier: 'Core stack', domain: 'Cloud & DevOps' },
  { name: 'PostgreSQL', tier: 'Cloud & data', domain: 'Databases' },
  { name: 'MySQL', tier: 'Cloud & data', domain: 'Databases' },
  { name: 'MongoDB', tier: 'Cloud & data', domain: 'Databases' },
  { name: 'Docker', tier: 'Cloud & data', domain: 'Cloud & DevOps' },
  { name: 'Kubernetes', tier: 'Cloud & data', domain: 'Cloud & DevOps' },
  { name: 'Terraform', tier: 'Cloud & data', domain: 'Cloud & DevOps' },
  { name: 'Dynatrace', tier: 'Cloud & data', domain: 'Cloud & DevOps' },
  { name: 'JavaScript', tier: 'Also using', domain: 'Frontend' },
  { name: 'TypeScript', tier: 'Also using', domain: 'Frontend' },
  { name: 'Next.js', tier: 'Also using', domain: 'Frontend' },
  { name: 'Vue.js', tier: 'Also using', domain: 'Frontend' },
  { name: 'Hugging Face', tier: 'Also using', domain: 'AI & ML' },
  { name: 'Claude', tier: 'Also using', domain: 'AI & ML' },
];

// One manually-verified alias for the single real case where a project
// tag refers to the same technology under a longer name (not a generic
// fuzzy matcher — that would risk false positives like 'JavaScript'
// substring-matching 'Java').
const USED_IN_ALIASES = { Claude: ['Claude Code CLI'] };

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Real technology → project/role associations, derived once from the
// data that already exists elsewhere (project tags, role descriptions)
// rather than hand-maintained — so this can never fall out of sync with
// the work actually listed above, and never claims a relationship the
// data doesn't support.
const resolveUsedIn = (skillName) => {
  const candidates = [skillName, ...(USED_IN_ALIASES[skillName] ?? [])];
  const matches = [];

  [...enterpriseProjects, ...personalProjects].forEach((project) => {
    const hasTagMatch = project.tags?.some(
      (tag) => candidates.some((candidate) => candidate.toLowerCase() === tag.toLowerCase()),
    );

    if (hasTagMatch) matches.push(project.title);
  });

  workHistory.forEach((job) => {
    const hasDescriptionMatch = candidates.some(
      (candidate) => new RegExp(`\\b${escapeRegExp(candidate)}\\b`, 'i').test(job.description),
    );

    if (hasDescriptionMatch) matches.push(`${job.company} (${job.role})`);
  });

  return matches;
};

// Grounded, real domain context — reused verbatim from the descriptions
// already written for the About section rather than re-authored, so
// nothing here is new copy. Databases has no equivalent existing
// description anywhere in the data, so it's left null (omitted in the
// UI) instead of inventing one.
const DOMAIN_DESCRIPTIONS = {
  Backend: aboutCards.find((card) => card.title === 'Systems & Backend')?.description,
  Frontend: aboutCards.find((card) => card.title === 'Frontend Delivery')?.description,
  'Cloud & DevOps': aboutCards.find((card) => card.title === 'Cloud & Observability')?.description,
  'AI & ML': aboutCards.find((card) => card.title === 'AI & ML Tooling')?.description,
  Databases: null,
};

const DOMAIN_ORDER = ['Frontend', 'Backend', 'Cloud & DevOps', 'Databases', 'AI & ML'];

// Tier view — unchanged shape/order from the original hand-written
// version. Header.jsx and Chatbot.jsx both consume this (or the flat
// `skills` below) and are unaffected by the domain restructuring.
export const skillGroups = ['Core stack', 'Cloud & data', 'Also using'].map((tier) => ({
  tier,
  skills: SKILL_RECORDS.filter((record) => record.tier === tier).map((record) => record.name),
}));

// Domain view — powers the Skills section's interactive stack map.
export const skillDomains = DOMAIN_ORDER.map((domain) => ({
  domain,
  description: DOMAIN_DESCRIPTIONS[domain],
  technologies: SKILL_RECORDS
    .filter((record) => record.domain === domain)
    .map((record) => ({
      name: record.name,
      tier: record.tier,
      usedIn: resolveUsedIn(record.name),
    })),
}));

export const skills = SKILL_RECORDS.map((record) => ({ name: record.name }));

// ── Skills section experience timeline ───────
export const experiences = [
  {
    year: '2026 – Now',
    works: [
      {
        name: 'Senior Software Engineer',
        company: 'Debut Infotech',
        desc: 'Leading website and backend platform engineering with Next.js, React, and Node.js, while driving API standards, delivery quality, and team mentorship.',
      },
    ],
  },
  {
    year: '2025 – 2026',
    works: [
      {
        name: 'Software Engineer (Freelance)',
        company: 'Alignerr',
        desc: 'Evaluated AI-generated backend and full-stack solutions, reviewed Python and Node.js implementations, and designed prompt-based attack scenarios for trust-sensitive systems.',
      },
    ],
  },
  {
    year: '2022 – 2025',
    works: [
      {
        name: 'Programmer Analyst (Full-Stack Engineer)',
        company: 'Cognizant',
        desc: 'Worked across DIRECTV, LN Payments, and Macy’s. Built high-availability services, payment workflows, operational tooling, and trust-critical retail interfaces.',
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
- Senior Software Engineer and Full Stack Engineer based in Chandigarh, India
- 4+ years professional experience
- Currently at Debut Infotech (May 2026 – Present) leading website and backend platform development
- Previously worked at Alignerr (Dec 2025 – Apr 2026) and Cognizant (Jan 2022 – Oct 2025)
- Education: Chitkara University, Rajpura (Aug 2018 – May 2022), 8.68/10 GPA

TECH STACK:
- Languages: Java, Python, JavaScript, TypeScript
- Backend: Spring Boot, REST APIs, API versioning, Microservices, Node.js, JWT
- Frontend: React, Next.js, Vue.js, ThreeJS, HTML, CSS, Tailwind
- Databases: PostgreSQL, MySQL, MongoDB, SQL performance tuning
- Observability: Logs, Metrics, Distributed Tracing, Dynatrace, Incident Debugging
- Cloud/DevOps: AWS (3 certs), Docker, Kubernetes, GitHub Actions, Jenkins, Terraform
- AI/ML Tooling: Python (pandas, NumPy, scikit-learn), LLM evaluation, Prompt engineering, Hugging Face, n8n, Claude, GitHub Copilot

ENTERPRISE PROJECTS:
1. Claude AI Evaluation for Anthropic via Alignerr (Dec 2025–Apr 2026): Evaluated AI-generated code, system behavior, prompt robustness, and solution trade-offs
2. DIRECTV (Nov 2023–Jun 2025): High-availability Spring Boot + React platform with 99.99% uptime and deep observability work
3. LN Payments (Aug 2022–Oct 2023): Payments platform handling $2M+ daily transactions, async workflows, and reconciliation accuracy
4. Macy's POS (Jul–Oct 2025): POS system UI, SQL debugging, data validation, and trust-critical releases

PERSONAL PROJECTS:
- 3D Interactive Room (Three.js, GSAP, AI assistant)
- Storyboard AI (TypeScript, JavaScript, CSS, HTML, LLM)
- AI Support System (TypeScript, LLM, Hono, RAG)
- GitHub Issue Analyzer with LLM Processing (Node.js, SQLite)

CERTIFICATIONS:
- AWS Cloud Practitioner (Foundational) — ID: E9M0RKJKWM4E1DK3
- AWS Certified Developer (Associate) — ID: 0dc9259e497a4306afb539cb6d2cd9fd
- AWS Certified AI Practitioner — ID: 3760f0aef37341198dd4f7f39e0dfe71
- GitHub Copilot Certification — ID: cbb9dd25-c996-4b5d-a141-f357969b88f9

CONTACT:
- Email: anishkrishnan72@gmail.com
- GitHub: github.com/anishcodes-0-9
- LinkedIn: linkedin.com/in/anishkrishnan09
- Location: Chandigarh, India

Be helpful, professional, and friendly. If you don't know something specific, suggest they contact Anish directly.
`;
