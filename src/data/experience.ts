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
      "Developed a custom theme for the Cold Storage e-commerce website",
    ],
    techStack: ["Vue.js", "Quasar", "Cordova", "JavaScript", "CSS", "SCSS"],
  },
];
