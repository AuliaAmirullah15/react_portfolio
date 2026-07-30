import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Greggs PLC",
    role: "Senior Software Developer",
    startDate: "Dec 2025",
    endDate: null,
    description:
      "Leading architecture and delivery across the Greggs digital ordering estate ranging from cloud infrastructure, .NET microservices, machine learning integrations, and real-time data pipelines supporting the Kiosk, Kitchen Management System, and delivery platforms such as Uber Eats, Just Eat, Click & Collect and Deliveroo.",
    achievements: [
      "Re-architected cloud-to-edge delivery partner integration from WebSocket relay and Service Bus to data streaming, eliminating missing-order incidents across Uber Eats, Just Eat, and Click & Collect",
      "Introduced a sidecar with an overnight cron job to sync SAP menu data locally, decoupling KMS from cloud availability and reducing offline scenarios caused by poor in-shop connectivity",
      "Built an ONNX machine learning recommendation service for kiosk add-ons to improve upsell relevance",
      "Contributed to evaluation of AI-assisted developer tooling for code review and implementation workflows",
      "Managed Azure infrastructure supporting production Website, KMS, and Kiosk deployments",
    ],
    techStack: [
      "C#",
      ".NET",
      "Azure",
      "ONNX",
      "NATS",
      "Kafka",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: "exp-2",
    company: "Greggs PLC",
    role: "Web Developer",
    startDate: "Jan 2024",
    endDate: "Nov 2025",
    description:
      "Full-stack development across the Greggs Kiosk, Kitchen Management System, and consumer and comapny websites, owning features from .NET microservices on Azure through to the Vue.js and Flutter frontends.",
    achievements: [
      "Introduced feature flagging, A/B testing, and user behaviour analytics using LaunchDarkly and Google Analytics across the kiosk funnel, enabling safe rollouts and funnel optimisation",
      "Developed secure guest checkout and mobile update flows in .NET Azure microservices, reducing support queries by 85%",
      "Introduced WireMock for API mocking and Nginx as a reverse proxy to enable parallel frontend/backend development",
      "Improved website accessibility score from 72% to 82%",
    ],
    techStack: [
      "C#",
      ".NET",
      "Vue.js",
      "Flutter",
      "Azure",
      "LaunchDarkly",
      "Seq",
      "Nginx",
    ],
  },
  {
    id: "exp-3",
    company: "Vi8e Interactive Pte Ltd",
    role: "Web Developer",
    startDate: "Nov 2021",
    endDate: "Nov 2022",
    description:
      "Built and maintained a cross-platform SPA ERP application published on the App Store and Google Play in Singapore, working across a full product lifecycle from requirements to release.",
    achievements: [
      "Shipped a cross-platform SPA ERP app to the App Store and Google Play",
      "Integrated geolocation verification, biometric authentication, camera, and i18n support",
      "Delivered multiple third-party API integrations using Axios and Fetch",
      "Liaised with designers, developers, testers and project owner to ensure the efficiency of APIs, software security, continuous improvement and user experiences",
    ],
    techStack: ["Vue.js", "Flutter", "Axios", "REST APIs", "i18n"],
  },
  {
    id: "exp-4",
    company: "Vi8e Interactive Pte Ltd",
    role: "Frontend Developer",
    startDate: "Apr 2021",
    endDate: "Oct 2021",
    description:
      "Frontend development for ERP tooling and e-commerce projects, with a focus on cross-platform delivery and custom theming.",
    achievements: [
      "Built a Vue.js/Quasar ERP application with price calculation, dashboards, and Cordova mobile deployment",
      "Connected features with JSON-based APIs via Vuex, Axios and javascript modules",
      "Developed a custom theme for the Cold Storage e-commerce website",
      "Debugged and resolved software defects and issue",
    ],
    techStack: ["Vue.js", "Quasar", "Cordova", "JavaScript", "CSS", "SCSS"],
  },
  {
    id: "exp-5",
    company: "Universitas Sumatera Utara",
    role: "Full Stack Developer",
    startDate: "January 2017",
    endDate: "April 2020",
    description:
      "Monorepo development for bachelor's thesis management portal, lecturer's research project management portal and finance allocation management portal for the University.",
    achievements: [
      "Collaborated with cross-functional teams to identify user requirements and to invent system designs",
      "Orchestrated continuously a student thesis management portal and research publication management system with user-centric approach",
      "Debugged and resolved software defects and issues",
    ],
    techStack: ["PHP", "HTML", "CSS", "JavaScript", "MySql"],
  },
  {
    id: "exp-6",
    company: "Universitas Sumatera Utara",
    role: "Laboratory Assistant",
    startDate: "March 2016",
    endDate: "Febuary 2017",
    description:
      "Teaching second year students in Internet Programming and Relational Database Management System.",
    achievements: [
      "Taught web applications by implementing PHP, MySQL, Object Oriented Programming, Codeigniter Framework and Twitter API",
      "Taught Relational Database Management System using MySql",
    ],
    techStack: ["PHP", "Codeigniter", "HTML", "CSS", "JavaScript", "MySql"],
  },
  {
    id: "exp-7",
    company: "Universitas Sumatera Utara",
    role: "Data Science Instructor Assistant",
    startDate: "September 2019",
    endDate: "December 2019",
    description:
      "Assisted lecteurers teaching Data Science in the Digital Talent Scholarship Program, an intensive program of the Ministry of Communication and Information of Indonesia to enhance the quality of human resource in ICT field.",
    achievements: [
      "Taught students Python programming",
      "Taught students NumPy and Spark",
      "Taught students Natural Language Generation and NLTK",
    ],
    techStack: ["Python", "Numpy", "Spark", "NLG", "NLTK", "MySql"],
  },
];
