import type { Project } from "@/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS
   ───────────────────────────────────────────────────────────────────────────
   The top-level fields feed the card on the home page. `caseStudy` feeds
   /projects/<id>. A project without a caseStudy simply gets no detail page and
   no "Case study" link — the route returns 404 rather than an empty shell.

   On the `decisions` blocks: every one of them states a tradeoff. That is
   deliberate. A list of choices with no costs attached reads as a sales page;
   the cost is the part that shows the choice was actually weighed.
   ═══════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [
  {
    id: "greggs-kms",
    title: "Kitchen Management System",
    description:
      "A unified kitchen management system that handles in-store and digital oridering channels running on Linux and Kubernetes across Greggs stores. I re-architected the backend and infrastructure of the cloud and edge computing and re-assessed cloud messaging by introducing data streaming that suports persistence which reduced missing orders up to 98% in the Greggs estates and implemented websocket, a trading backend and edge sidecar to replace continuous polling over the internet and menu data availability regardless of poor internet connection in store.",
    techStack: [
      ".NET",
      "Flutter",
      "Dart",
      "Docker",
      "Azure DevOps",
      "Linux",
      "Kubernetes",
      "Prometheus",
      "Wiremock",
    ],
    imageUrl: "/projects/greggs-kiosk.jpg",
    featured: true,
    category: "linux",
    caseStudy: {
      role: "Senior Software Developer - backend & infrastructure",
      company: "Greggs PLC",
      context:
        "A single kitchen-facing system that takes orders from every channel (kiosk, till, drive-through and the digital delivery platforms) and puts them in front of the people actually making the food. It runs on Linux and Kubernetes inside the shops, not only in the cloud, because a shop that loses its internet connection still has to serve customers.",
      overview:
        "I re-architected the backend and the infrastructure across both the cloud and the edge. The core of the work was re-assessing how orders move: replacing fire-and-forget cloud messaging with persistent data streaming, replacing continuous internet polling with WebSocket push and an edge sidecar, and making menu data available in-shop regardless of connection quality.",
      architecture: {
        summary:
          "Two halves that have to keep working when the link between them does not. The cloud owns the record of what was ordered; the edge owns what the kitchen can see right now. Everything in between is designed around the assumption that shop connectivity is unreliable rather than treating an outage as an exception.",
        layers: [
          {
            name: "Ordering channels",
            role: "Where orders originate.",
            detail:
              "In-store kiosk, till and drive-through alongside the digital delivery platforms. Each channel has its own shape and its own failure behaviour, so they are normalised on the way in rather than handled separately downstream.",
            tech: [".NET", "Flutter"],
          },
          {
            name: "Cloud services",
            role: "The system of record.",
            detail:
              "The .NET services that accept, validate and persist orders, plus the trading backend that says whether a given shop is open and able to accept them. This layer is the authority; the edge is a cache of it.",
            tech: [".NET", "Azure DevOps"],
          },
          {
            name: "Streaming backbone",
            role: "Durable movement of order events.",
            detail:
              "Order events are published to a persistent stream rather than pushed once and forgotten. A consumer that was down when an order was placed can pick up where it left off instead of missing it, which is what took missing-order incidents down.",
            tech: ["Event streaming", "Persistence"],
          },
          {
            name: "Edge runtime",
            role: "The shop keeps working on its own.",
            detail:
              "Kubernetes on Linux inside each shop, with a sidecar holding the menu data the kitchen screens need. When the connection degrades, the screens keep rendering from local state instead of blanking.",
            tech: ["Linux", "Kubernetes", "Docker"],
          },
          {
            name: "Transport to the kitchen",
            role: "Push, not poll.",
            detail:
              "WebSocket connections deliver order updates to the kitchen screens as they happen, replacing screens that repeatedly asked the cloud over the internet whether anything had changed.",
            tech: ["WebSocket"],
          },
          {
            name: "Observability & test doubles",
            role: "Knowing it works, before and after release.",
            detail:
              "Prometheus metrics from the edge and the cloud, and Wiremock standing in for upstream dependencies so behaviour can be exercised without a full environment.",
            tech: ["Prometheus", "Wiremock"],
          },
        ],
      },
      decisions: [
        {
          title: "Persistent streaming, not fire-and-forget messaging",
          chose: "An append-only event stream with retained offsets",
          over: [
            "The existing fire-and-forget cloud messaging",
            "Direct HTTP calls between cloud and shop",
          ],
          why: "With fire-and-forget delivery, an order placed while a consumer was restarting or offline was simply gone, and in a kitchen a lost order is a customer standing at a counter. A retained stream lets a consumer resume from its last offset, so a restart or a network blip costs latency instead of data. This is what reduced missing orders by up to 98% across the estate.",
          tradeoff:
            "Consumers now have to be idempotent and track their own position, and there is a broker to operate and monitor. Replay is a feature you have to design for, not one you get for free.",
        },
        {
          title: "WebSocket push over continuous polling",
          chose: "A persistent WebSocket connection per kitchen screen",
          over: ["Continuous HTTP polling over the internet", "Long-polling"],
          why: "Every screen in every shop asking 'anything new?' on a timer produced constant internet traffic whose volume scaled with the estate and whose worst-case latency was the poll interval. Pushing on change removes the traffic that carries no news and gets the order to the kitchen as soon as it exists.",
          tradeoff:
            "A long-lived connection is a thing that breaks. Reconnection, backoff and resynchronising missed state on reconnect are all now the client's problem, where a poll loop was trivially self-healing.",
        },
        {
          title: "An edge sidecar holding menu data locally",
          chose:
            "A sidecar in the shop's cluster serving menu data from local state",
          over: [
            "Reading menu data from the cloud on demand",
            "Baking the menu into the application image",
          ],
          why: "Menu availability was tied to connection quality, so a shop with poor internet had a degraded ordering experience for reasons that had nothing to do with that shop. Serving from local state decouples the two, and keeping it in a sidecar rather than in the image means the menu can be updated without redeploying the application.",
          tradeoff:
            "A second copy of the menu is a second place it can be stale, so invalidation has to be explicit and observable rather than implicit.",
        },
        {
          title: "Kubernetes on Linux at the edge",
          chose: "The same container orchestration in the shop as in the cloud",
          over: [
            "Bespoke per-device deployment scripts",
            "Cloud-only deployment with thin in-shop clients",
          ],
          why: "One deployment model across hundreds of sites means a rollout and, more importantly, a rollback behave the same way everywhere, and health, restarts and resource limits are handled by the platform rather than by hand per shop.",
          tradeoff:
            "Running a cluster in every shop is real operational surface: it has to be upgradable and diagnosable remotely by people who are not in the building.",
        },
      ],
      stack: [
        { label: "Services", items: [".NET", "C#"] },
        { label: "Kitchen client", items: ["Flutter", "Dart"] },
        {
          label: "Edge & infrastructure",
          items: ["Linux", "Kubernetes", "Docker"],
        },
        { label: "Delivery", items: ["Azure DevOps"] },
        { label: "Operations", items: ["Prometheus", "Wiremock"] },
      ],
      outcome:
        "Missing-order incidents fell by up to 98% across the Greggs estate, and menu data became available in-shop regardless of connection quality. The move from polling to push removed a constant stream of internet traffic that grew with every shop added.",
    },
  },
  {
    id: "greggs-kiosk",
    title: "Greggs Kiosk",
    description:
      "Customer-facing self-service kiosk running on Linux across Greggs stores. I joined as one of the first developers, shaped the early prototype, and led development of reusable order-sharing, loyalty and  promotions packages which are now adopted by POS and drive-through teams.",
    techStack: [
      "Flutter",
      "Dart",
      ".NET",
      "Docker",
      "Azure DevOps",
      "Linux",
      "Wiremock",
    ],
    imageUrl: "/projects/greggs-kiosk.jpg",
    featured: true,
    category: "linux",
    caseStudy: {
      role: "Software Developer",
      company: "Greggs PLC",
      context:
        "The customer-facing self-service screen in Greggs shops, running on Linux. Customers browse the full menu, build and customise an order, see allergen and nutrition information, pay, and collect against an order number. It was a flagship project on the Greggs 2025 roadmap.",
      overview:
        "I joined as one of the first developers and shaped the early prototype that the customer-facing features were built on, including the meal deal builder and the upselling flow. I later led development of reusable order-sharing, loyalty, promotions and analytics packages, published internally and now consumed by the POS and drive-through teams, along with a shared models library that keeps tills and backend services in agreement.",
      architecture: {
        summary:
          "A single Flutter application on Linux, deliberately thin: the behaviour that other Greggs surfaces also need lives in versioned packages rather than in the kiosk. The kiosk was first to need loyalty and order sharing, but it was not going to be the only one, so those were built as libraries from the outset.",
        layers: [
          {
            name: "Kiosk application",
            role: "The screen the customer touches.",
            detail:
              "Flutter on Linux, driving the attract screen, menu browsing, customisation, basket, payment and the order-number handoff. Includes an accessibility mode that brings the interactive controls down into the lower half of the screen so they are within reach.",
            tech: ["Flutter", "Dart", "Linux"],
          },
          {
            name: "Shared feature packages",
            role: "Written once, consumed by several teams.",
            detail:
              "Order sharing, loyalty, promotions and analytics as separately versioned packages published to an internal registry. POS and drive-through consume the same builds, so a fix to loyalty is a version bump rather than three separate patches.",
            tech: ["Dart packages", "OnePub"],
          },
          {
            name: "Shared models library",
            role: "One definition of an order.",
            detail:
              "The contract between kiosk, tills and backend services lives in one library both sides depend on, so the shape of an order cannot quietly diverge between the thing that creates it and the thing that fulfils it.",
            tech: ["Dart", ".NET"],
          },
          {
            name: "Backend services",
            role: "Menu, basket, allergens, payment.",
            detail:
              "The .NET services behind the screen. Requests go out through a single HTTP layer so timeouts, retries and error surfacing are handled in one place rather than per feature.",
            tech: [".NET", "Dio"],
          },
          {
            name: "Local test doubles",
            role: "Frontend work that does not wait on an environment.",
            detail:
              "Allergen data served from Wiremock behind NGINX locally, so interface work could continue against a stable, known response set instead of a shared upstream environment.",
            tech: ["Wiremock", "NGINX", "Postman"],
          },
          {
            name: "Build & device delivery",
            role: "Getting it onto the hardware.",
            detail:
              "Containerised builds through Azure DevOps, deployed to Linux kiosk hardware in shops.",
            tech: ["Docker", "Azure DevOps", "SSH"],
          },
        ],
      },
      decisions: [
        {
          title: "Shared behaviour as versioned packages, not copied code",
          chose:
            "Internal Dart packages on a private registry, consumed by kiosk, POS and drive-through",
          over: [
            "Each team implementing loyalty and order sharing themselves",
            "A shared source folder copied between repositories",
          ],
          why: "Loyalty and order sharing are rules, not screens, and rules that exist in three codebases will be subtly different in three codebases within a year. A published, versioned package means one implementation and one place to fix a bug, and it lets each consuming team upgrade on their own schedule instead of being blocked by ours.",
          tradeoff:
            "It demands release discipline. A breaking change now needs a major version and a migration path for teams you do not control, which is slower than editing your own code.",
        },
        {
          title: "A shared models library across frontend and backend",
          chose:
            "One library defining the order contract, depended on by both sides",
          over: [
            "Each application declaring its own DTOs",
            "Generating clients from a schema per consumer",
          ],
          why: "The expensive bug in a system with tills, kiosks and a backend is not a broken screen. It is two components that disagree about what an order contains and only find out in a live shop. A single shared definition makes that disagreement a compile error.",
          tradeoff:
            "It couples release trains together. Changing the model means coordinating a release across components that would otherwise ship independently.",
        },
        {
          title: "Flutter for the kiosk surface",
          chose: "One Flutter codebase targeting the Linux kiosk hardware",
          over: [
            "A native Linux application",
            "A web application in a kiosk-mode browser",
          ],
          why: "The interface is highly custom and animation-heavy, and Flutter renders its own widgets rather than inheriting platform ones, so the design is identical on every unit and can be reused on other surfaces later. It also let one team cover the whole front end rather than splitting by platform.",
          tradeoff:
            "Anything genuinely device-specific (payment terminals, receipt printers, kiosk peripherals) needs a platform channel, which is more work than calling a native API directly.",
        },
        {
          title:
            "Mocking allergen data locally rather than pointing at the real service",
          chose:
            "Wiremock behind NGINX serving allergen responses on the developer machine",
          over: [
            "Consuming the live upstream service during development",
            "Hard-coded fixtures inside the application",
          ],
          why: "Allergen data is exactly the kind of dependency that blocks a team: shared, slow-moving, and something you must not get wrong. A local mock gives every developer the same known responses, including the awkward ones, without competing for a shared environment, and unlike in-app fixtures it exercises the real HTTP path.",
          tradeoff:
            "A mock drifts from the real contract unless somebody deliberately refreshes it, and a mock that is out of date is worse than no mock at all.",
        },
      ],
      stack: [
        { label: "Application", items: ["Flutter", "Dart"] },
        { label: "Services", items: [".NET", "C#", "Dio"] },
        { label: "Platform", items: ["Linux", "Docker", "SSH"] },
        { label: "Delivery", items: ["Azure DevOps"] },
        {
          label: "Tooling",
          items: ["Wiremock", "NGINX", "Postman", "OnePub", "Cocoapods"],
        },
      ],
      gallery: [
        {
          title: "Interface",
          aspect: "portrait",
          images: [
            {
              src: "/projects/greggs-kiosk/splash.jpg",
              alt: "Kiosk attract screen reading 'Touch to begin order' with accepted payment types listed below",
              width: 671,
              height: 1200,
              caption: "Attract screen: idle state, inviting the first touch.",
            },
            {
              src: "/projects/greggs-kiosk/hiw.jpg",
              alt: "Modal titled 'How does the Touch screen work?' explaining the order, wait and collect steps",
              width: 671,
              height: 1200,
              caption:
                "First-time guidance: order, wait, collect. Reachable from the attract screen.",
            },
            {
              src: "/projects/greggs-kiosk/menu.jpg",
              alt: "Menu screen with category rail on the left and a grid of sandwiches showing prices and calorie counts",
              width: 668,
              height: 1200,
              caption:
                "Menu browsing. Category rail, calories on every card, basket total always visible.",
            },
            {
              src: "/projects/greggs-kiosk/menu_accessible.jpg",
              alt: "The same menu screen in accessibility mode, with all content moved into the lower portion of the display",
              width: 667,
              height: 1200,
              caption:
                "Accessibility mode: the whole interface drops into the lower half of the screen so every control is within reach.",
            },
            {
              src: "/projects/greggs-kiosk/customisation.jpg",
              alt: "Item customisation screen for a Greggs product",
              width: 670,
              height: 1200,
              caption:
                "Customisation, one of the first flows built on the prototype.",
            },
            {
              src: "/projects/greggs-kiosk/nutrition.jpg",
              alt: "Nutrition and allergen information screen for a menu item",
              width: 666,
              height: 1200,
              caption:
                "Allergen and nutrition detail. The data was mocked locally during development.",
            },
            {
              src: "/projects/greggs-kiosk/basket_receipt.jpg",
              alt: "Basket screen styled as a receipt, listing selected items and the order total",
              width: 669,
              height: 1200,
              caption: "Basket, set as a receipt.",
            },
            {
              src: "/projects/greggs-kiosk/order_number.jpg",
              alt: "Order confirmation screen displaying the customer's order number",
              width: 668,
              height: 1200,
              caption:
                "Handoff: the order number the customer collects against.",
            },
          ],
        },
        {
          title: "In shop",
          aspect: "square",
          images: [
            {
              src: "/projects/greggs-kiosk/photo_kiosk.jpg",
              alt: "A Greggs self-service kiosk unit installed in a shop",
              width: 1200,
              height: 1600,
              caption: "Live in shop.",
            },
            {
              src: "/projects/greggs-kiosk/photo_order_food.jpg",
              alt: "A customer placing an order at a Greggs kiosk",
              width: 1600,
              height: 1200,
              caption: "A customer ordering.",
            },
            {
              src: "/projects/greggs-kiosk/photo_food.jpg",
              alt: "Greggs food collected from an order placed at the kiosk",
              width: 1200,
              height: 1600,
              caption: "The end of the journey.",
            },
            {
              src: "/projects/greggs-kiosk/photo_behind_the_scene.jpg",
              alt: "Behind the scenes during kiosk development and testing",
              width: 1600,
              height: 1200,
              caption: "Behind the scenes.",
            },
          ],
        },
      ],
      outcome:
        "The kiosk launched into live shops, reaching three locations in the first week with two to six units each, and the rollout continued from there on feedback from customers, shop teams and stakeholders. The packages I led (order sharing, loyalty, promotions and analytics) were adopted by the POS and drive-through teams, so the work outlived the surface it was written for.",
    },
  },
  {
    id: "greggs-website",
    title: "Greggs Website",
    description:
      "Full-stack development on greggs.co.uk ranging from Click & Collect, gift cards, account management, checkout and CMS-driven contents. I also led the implementation of secure mobile number change in .NET, Zendesk integration, and accessibility improvements raising the score from 72% to 82%.",
    techStack: [
      "Vue.js",
      "Nuxt",
      "TypeScript",
      ".NET",
      "Tailwind",
      "Storyblok",
      "Cypress",
    ],
    liveUrl: "https://www.greggs.co.uk/",
    imageUrl: "/projects/greggs-website.png",
    featured: true,
    category: "web",
    caseStudy: {
      role: "Full-stack Web Developer",
      company: "Greggs PLC",
      context:
        "greggs.co.uk, the brand's main digital touchpoint. Click & Collect ordering, digital gift cards, menu and allergen information, account management, a store locator, promotions, careers and investor information, plus integrations with third-party delivery services. Content is editorially managed, so most of the page you see is composed by the brand team rather than written in code.",
      overview:
        "I worked across the stack. I led the implementation of secure mobile number change in .NET, with policy-driven validation on the server, and integrated Zendesk so support requests landed in a real queue. I improved the News section with pagination that remembers where you were, refined the digital gift card journey, fixed browser-specific failures such as video playback in Firefox, built a dynamic Greggs Foundation form with Power Automate, and contributed to a run of accessibility work that took the score from 72% to 82%.",
      architecture: {
        summary:
          "A Nuxt front end over a headless CMS, with .NET services behind it for anything transactional or account-related. The dividing line is ownership: if the brand team should be able to change it without a deploy, it lives in the CMS; if it touches an account, an order or money, it lives in a service.",
        layers: [
          {
            name: "Content",
            role: "Pages the brand team owns.",
            detail:
              "Storyblok holds the composable content: campaigns, menu pages, promotions, editorial. Front-end components are written to render whatever an editor assembles, not one fixed page shape.",
            tech: ["Storyblok", "CMS"],
          },
          {
            name: "Application",
            role: "Rendering and client state.",
            detail:
              "Nuxt with Vue and TypeScript, server-rendered for pages that need to be indexable and fast on first load. Pinia holds client state such as the basket and account context.",
            tech: ["Nuxt", "Vue.js", "TypeScript", "Pinia"],
          },
          {
            name: "Presentation",
            role: "A consistent visual system.",
            detail:
              "Tailwind for styling with components documented in Storybook, so the same button behaves the same way in a campaign page as in checkout.",
            tech: ["Tailwind", "Storybook"],
          },
          {
            name: "Services",
            role: "Accounts, orders and anything sensitive.",
            detail:
              ".NET services covering account management, Click & Collect and gift cards. The secure mobile number change lives here, with its validation policy enforced server-side.",
            tech: [".NET", "C#"],
          },
          {
            name: "Integrations",
            role: "Work that belongs to somebody else's system.",
            detail:
              "Zendesk for customer support, third-party delivery platforms for fulfilment, and Power Automate for internal forms such as the Greggs Foundation submission.",
            tech: ["Zendesk", "Power Automate"],
          },
          {
            name: "Testing",
            role: "Confidence at two levels.",
            detail:
              "Vitest for unit coverage on logic and Cypress for the journeys that actually earn money: Click & Collect, gift cards, account changes.",
            tech: ["Vitest", "Cypress"],
          },
        ],
      },
      decisions: [
        {
          title: "Server-side policy validation for the mobile number change",
          chose:
            "Validation and the change policy enforced in the .NET service, with the client mirroring it only for feedback",
          over: [
            "Client-side validation with the service trusting the request",
            "A generic account-update endpoint with rules in the caller",
          ],
          why: "A mobile number is a recovery channel and a route to an account takeover. Anything enforced only in the browser is advisory, because the request can be made without the browser. Putting the policy in the service means the rule holds regardless of what calls it, and the client-side copy exists purely so the customer gets an immediate message instead of a round trip.",
          tradeoff:
            "The rule is expressed in two places, so they can drift. The service is authoritative, which means a drift shows up as a confusing client message rather than as a security hole. An acceptable failure mode, but still a cost.",
        },
        {
          title: "Headless CMS rather than developer-owned pages",
          chose: "Storyblok composing pages from front-end components",
          over: [
            "Hard-coded pages released with the application",
            "A traditional coupled CMS owning templates and rendering",
          ],
          why: "The brand and marketing teams change campaigns far more often than engineers change code. Coupling those two release cadences makes engineers a bottleneck for a poster. Keeping rendering in the application and composition in the CMS lets each side move at its own speed.",
          tradeoff:
            "Components have to survive arbitrary composition: any block in any order, with fields an editor might leave empty. That is meaningfully more defensive work than rendering a page you designed yourself.",
        },
        {
          title:
            "Pagination with return-to-article on News, not infinite scroll",
          chose: "Explicit pages that restore your position when you come back",
          over: ["Infinite scroll", "A load-more button"],
          why: "Infinite scroll breaks the things people actually do with an article list: link to it, use the back button, and reach the footer. It is also hostile to keyboard and screen-reader users, who have no cheap way to skip an endlessly growing list. Real pages are linkable and finite, and remembering the scroll position on return removes the only advantage infinite scroll had.",
          tradeoff:
            "The position has to be preserved and restored deliberately, including across a browser back navigation. That is more state to manage than a list that simply keeps growing.",
        },
        {
          title: "Zendesk instead of a bespoke support tool",
          chose: "Integrating the existing support platform",
          over: [
            "Building ticketing and triage into the website",
            "Email-only contact forms",
          ],
          why: "The support team already had a workflow, an SLA and reporting. Building a second inbox inside the website would have meant reimplementing all of that badly, and split the queue in two. Integration put website contact into the same pipeline the rest of support already used.",
          tradeoff:
            "A third-party dependency in a customer-facing path, and customer data flowing to another system, both of which have to be handled explicitly rather than assumed.",
        },
      ],
      stack: [
        {
          label: "Front end",
          items: ["Vue.js", "Nuxt", "TypeScript", "Tailwind", "Pinia"],
        },
        { label: "Back end", items: [".NET", "C#"] },
        { label: "Content", items: ["Storyblok"] },
        { label: "Testing", items: ["Cypress", "Vitest", "Storybook"] },
        {
          label: "Integrations",
          items: ["Zendesk", "Power Automate", "Axios"],
        },
        { label: "Delivery", items: ["Azure DevOps"] },
      ],
      gallery: [
        {
          title: "Journeys",
          aspect: "portrait",
          images: [
            {
              src: "/projects/greggs-website/banner.jpg",
              alt: "Greggs website homepage banner",
              width: 847,
              height: 1200,
              caption: "Homepage, composed from CMS content blocks.",
            },
            {
              src: "/projects/greggs-website/click_and_collect.jpg",
              alt: "Click & Collect ordering journey on the Greggs website",
              width: 857,
              height: 1200,
              caption: "Click & Collect.",
            },
            {
              src: "/projects/greggs-website/allergen_and_nutrition.jpg",
              alt: "Allergen and nutrition information page on the Greggs website",
              width: 842,
              height: 1200,
              caption: "Allergen and nutrition information.",
            },
            {
              src: "/projects/greggs-website/giftcard.jpg",
              alt: "Digital gift card purchase journey on the Greggs website",
              width: 835,
              height: 1200,
              caption:
                "Digital gift cards, with the journey refined for clarity.",
            },
            {
              src: "/projects/greggs-website/news.jpg",
              alt: "News section of the Greggs website showing a paginated article list",
              width: 814,
              height: 1200,
              caption:
                "News: paginated, and it puts you back where you were when you return.",
            },
            {
              src: "/projects/greggs-website/tooltip.jpg",
              alt: "Contextual tooltip on the Greggs website explaining a field",
              width: 844,
              height: 1200,
              caption:
                "Contextual help, added where the journey was ambiguous.",
            },
          ],
        },
      ],
      outcome:
        "Accessibility improved from 72% to 82%. The secure account change and the Zendesk integration together cut the manual handling behind support requests, and the News and gift card refinements addressed the sections where customers were most often getting lost. The Firefox video fix removed a failure that had been silently affecting a whole browser's worth of visitors.",
    },
  },
  {
    id: "activate-erp",
    title: "Activate ERP",
    description:
      "Mobile-first Entrprise Resource Planning system for retail and distribution ranging from goods receiving, stocktaking, inventory, picking, and transfers. I architected and built the frontend layer from scratch with a single codebase targeting both App Store and Google Play which has features such as biometric auth, camera for photo upload, geolocation as a verification, and secure storage.",
    techStack: [
      "Vue.js",
      "Quasar",
      "Cordova",
      "Capacitor",
      "SCSS",
      "Vuex",
      "Axios",
    ],
    liveUrl: "https://apps.apple.com/sg/app/activate-erp/id1601575070",
    imageUrl: "/projects/activate-erp.png",
    featured: true,
    category: "mobile",
    caseStudy: {
      role: "Frontend & Web Developer - architected the front end from scratch",
      company: "Vi8e Interactive Pte Ltd",
      context:
        "A mobile-first ERP for retail and distribution: goods receiving, stocktaking, inventory, internal transfers, order assembly, picking, collections and sales orders. The people using it are on a warehouse floor with a phone in one hand, not at a desk, which shaped almost every decision in it.",
      overview:
        "I architected and built the entire front-end layer from scratch, delivering the mobile apps and the web application from one codebase. I led the mobile implementation specifically: biometric authentication, camera capture for proof-of-receipt photos, geolocation as a verification signal on stock movements, and encrypted storage for keys and tokens. I worked alongside a backend developer, a designer and product stakeholders, and handled the release path through Xcode and Android Studio to both stores.",
      architecture: {
        summary:
          "One Vue codebase, three targets. Quasar provides the build modes for iOS, Android and web, and everything platform-specific is isolated behind a thin bridge so the feature code never branches on which device it happens to be running on.",
        layers: [
          {
            name: "Screens & flows",
            role: "The operational surface.",
            detail:
              "Goods receiving, stocktaking, inventory, transfers, picking and collections. Built mobile-first: large targets, short flows, and scanning as the primary input rather than typing.",
            tech: ["Vue.js", "Quasar"],
          },
          {
            name: "Design system",
            role: "One look across phone and desktop.",
            detail:
              "Quasar components extended with SCSS, so a table on a desktop and a card list on a phone are the same underlying data rendered for the space available.",
            tech: ["SCSS", "SASS", "Quasar"],
          },
          {
            name: "State",
            role: "Predictable operational data.",
            detail:
              "Vuex modules per domain (receiving, inventory, picking) so a screen reads what it needs without becoming the owner of it. This matters when the same stock figure appears in three flows.",
            tech: ["Vuex"],
          },
          {
            name: "API layer",
            role: "One way in and out.",
            detail:
              "Axios with interceptors handling auth headers, token refresh and error normalisation in a single place, so no screen has to know how authentication works.",
            tech: ["Axios"],
          },
          {
            name: "Native bridge",
            role: "Device hardware, isolated.",
            detail:
              "Cordova and Capacitor plugins for biometrics, camera, geolocation and secure storage, each wrapped in an internal module. Feature code calls the wrapper; only the wrapper knows the platform.",
            tech: ["Cordova", "Capacitor"],
          },
          {
            name: "Release",
            role: "Two stores from one source.",
            detail:
              "Builds through Xcode and Android Studio to the App Store and Google Play, tested across simulators and real devices before each submission.",
            tech: ["Xcode", "Android Studio"],
          },
        ],
      },
      decisions: [
        {
          title: "One Quasar codebase for iOS, Android and web",
          chose: "A single Vue + Quasar source with three build targets",
          over: [
            "Native iOS and Android apps plus a separate web front end",
            "React Native for mobile with a separate web application",
          ],
          why: "The front end was one developer. Three codebases would have meant every feature written three times and, in practice, three subtly different products. Quasar's build modes gave genuine platform packaging, not just a responsive website, from one source, which is what made the scope achievable at all.",
          tradeoff:
            "The abstraction sets the ceiling. Anything the framework does not cover has to be bridged by hand, and you inherit the framework's upgrade cycle for all three targets at once.",
        },
        {
          title:
            "Native capability through wrapped plugins, not a native rewrite",
          chose:
            "Cordova and Capacitor plugins behind internal wrapper modules",
          over: [
            "Writing the mobile apps natively to access hardware directly",
            "Calling plugin APIs directly from feature code",
          ],
          why: "Biometrics, camera and GPS were requirements, and they were the usual argument for going native, but they are a small, well-bounded part of the app. Bridging them kept the single codebase, and wrapping each one meant a plugin could later be swapped for a different implementation without touching any screen that used it.",
          tradeoff:
            "Plugin maintenance becomes your problem, and iOS and Android differ enough in permission behaviour that each capability needs testing on both rather than once.",
        },
        {
          title: "Encrypted secure storage for keys and tokens",
          chose: "The platform keystore via a secure-storage plugin",
          over: ["localStorage or a web storage API", "In-memory only"],
          why: "Warehouse devices are shared, mislaid and handled by many people, which makes a token sitting in plain text a real exposure rather than a theoretical one. In-memory storage would have been safe but would have logged users out every time the app was backgrounded, which is unusable on a device that is constantly switched away from to scan something.",
          tradeoff:
            "Keystore behaviour differs between platforms and OS versions, so the failure paths (enrolment changed, hardware unavailable) have to be handled rather than assumed to work.",
        },
        {
          title: "Geolocation as a verification signal on stock movements",
          chose: "Capturing location alongside receiving and transfer actions",
          over: ["Trusting the user-selected site", "No location data at all"],
          why: "Inventory disputes come down to what happened where. Tying an action to a place gives the operational record something to check against, without asking the operator to enter anything extra.",
          tradeoff:
            "Location can always be denied or unavailable, so the flow must complete without it rather than blocking. That means the signal is advisory, not a guarantee, and treating it as a guarantee would be the mistake.",
        },
      ],
      stack: [
        {
          label: "Application",
          items: ["Vue.js", "Quasar", "JavaScript"],
        },
        { label: "Styling", items: ["SCSS", "SASS"] },
        { label: "State & data", items: ["Vuex", "Axios"] },
        { label: "Native", items: ["Cordova", "Capacitor"] },
        { label: "Release", items: ["Xcode", "Android Studio", "Postman"] },
      ],
      gallery: [
        {
          title: "Mobile",
          aspect: "portrait",
          images: [
            {
              src: "/projects/activate-erp/login.jpg",
              alt: "Activate ERP mobile login screen",
              width: 583,
              height: 1200,
              caption: "Sign in, with biometric unlock on return.",
            },
            {
              src: "/projects/activate-erp/menu.jpg",
              alt: "Activate ERP mobile navigation menu listing operational modules",
              width: 583,
              height: 1200,
              caption: "Module navigation.",
            },
            {
              src: "/projects/activate-erp/goods_receive_results.jpg",
              alt: "Goods Receive Results list showing GRN records with purchase order IDs, receiver, quantity and date, filtered by a date range",
              width: 583,
              height: 1200,
              caption:
                "Goods receive results: date-filtered GRN records, with scanning available from the floating action button.",
            },
            {
              src: "/projects/activate-erp/delivery_details.jpg",
              alt: "Delivery details screen in the Activate ERP mobile app",
              width: 583,
              height: 1200,
              caption: "Delivery detail.",
            },
            {
              src: "/projects/activate-erp/picking_dashboard.jpg",
              alt: "Picking dashboard in the Activate ERP mobile app",
              width: 583,
              height: 1200,
              caption: "Picking dashboard.",
            },
            {
              src: "/projects/activate-erp/picking_details.jpg",
              alt: "Picking detail screen listing items to collect",
              width: 583,
              height: 1200,
              caption: "Picking detail.",
            },
          ],
        },
        {
          title: "Desktop",
          aspect: "landscape",
          images: [
            {
              src: "/projects/activate-erp/desktop_login.jpg",
              alt: "Activate ERP desktop login screen",
              width: 1800,
              height: 920,
              caption: "The same codebase, built for the web.",
            },
            {
              src: "/projects/activate-erp/inventory.jpg",
              alt: "Inventory management screen in the Activate ERP web application",
              width: 1800,
              height: 1193,
              caption: "Inventory: the mobile card list, rendered as a table.",
            },
            {
              src: "/projects/activate-erp/transfer.jpg",
              alt: "Internal stock transfer screen in the Activate ERP web application",
              width: 1800,
              height: 850,
              caption: "Internal transfers.",
            },
          ],
        },
      ],
      outcome:
        "Shipped to both the App Store and Google Play from a single codebase, covering the full operational chain from receiving to collection. The single-source approach is what let one front-end developer deliver mobile and web together, and the wrapped native layer meant the mobile-only capabilities did not fragment the code that everything else shared.",
    },
  },
  {
    id: "katie-jayne",
    title: "Katie Jayne",
    description:
      "Production-quality e-commerce storefront for a premium glassware brand. I built it with React, Next.js, and TypeScript which has features such as product catalogues, cart, checkout, Redux state management, Mailchimp integration, and Playwright end-to-end tests.",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Redux",
      "Playwright",
    ],
    liveUrl: "https://katie-jayne.vercel.app/",
    githubUrl: "https://github.com/AuliaAmirullah15/katie-jayne",
    imageUrl: "/projects/katie-jayne.png",
    featured: true,
    category: "web",
    caseStudy: {
      role: "Sole developer",
      company: "Personal project",
      context:
        "A storefront for a premium glassware brand: catalogue browsing, filtering and sorting, product detail, basket, checkout and a mailing list. Built to production standards rather than as a demo. The interesting parts are the ones a real shop would need on day one.",
      overview:
        "My first commercial-standard project in React and Next.js, and a deliberate exercise in the parts of front-end work that only show up at scale: shared state that many unrelated components read and write, persistence across reloads, and tests that cover journeys rather than functions. I built all of it: components, state, routing, integrations and the end-to-end suite.",
      architecture: {
        summary:
          "A Next.js application with a single source of truth for the basket. Everything else is presentational: pages compose components, components read from the store, and the store is the only thing that knows what is in the basket or how much it costs.",
        layers: [
          {
            name: "Routing & rendering",
            role: "Pages and product URLs.",
            detail:
              "Next.js with dynamic routes per product and per collection, so every item in the catalogue is a real, linkable, indexable URL rather than a client-side modal.",
            tech: ["Next.js", "React"],
          },
          {
            name: "State",
            role: "The basket, and only one of it.",
            detail:
              "Redux Toolkit slices per concern: basket, catalogue filters, mailing list. The basket is read by the header count, the basket page, the checkout summary and the product page at once, which is exactly the situation slices are for.",
            tech: ["Redux Toolkit"],
          },
          {
            name: "Persistence",
            role: "Surviving a reload.",
            detail:
              "The basket is mirrored to localStorage and rehydrated on load, so closing the tab does not throw away a half-built order, with no account or backend session required.",
            tech: ["localStorage"],
          },
          {
            name: "Components & hooks",
            role: "Reusable presentation.",
            detail:
              "Typed components with custom hooks for the repeated behaviour (filtering, sorting, responsive navigation) so the logic is tested once and used everywhere.",
            tech: ["React", "TypeScript", "Tailwind"],
          },
          {
            name: "Integrations",
            role: "Capturing interest.",
            detail:
              "Mailchimp for mailing list signup, handled through the application rather than an embedded third-party form so the styling and validation match everything else.",
            tech: ["Mailchimp"],
          },
          {
            name: "Testing",
            role: "The journeys that matter.",
            detail:
              "Playwright covering browsing, adding to the basket and checking out, across viewports, because those are the paths where a break costs a sale.",
            tech: ["Playwright"],
          },
        ],
      },
      decisions: [
        {
          title: "Redux Toolkit for the basket, not React Context",
          chose: "Redux Toolkit slices",
          over: [
            "React Context with a reducer",
            "Component-local state lifted as needed",
          ],
          why: "The basket is written from product cards and read by the header, the basket page and checkout, components with no ancestor relationship worth sharing. Context would re-render every consumer on any change and gives no view of what happened; Redux Toolkit gives selectors, so a component only re-renders for the slice it actually reads, and a devtools timeline showing exactly which action changed the total.",
          tradeoff:
            "More ceremony than Context for state this small, and a dependency to keep current. Justified here because the basket is the one piece of state everything touches, not by a general preference for Redux.",
        },
        {
          title: "localStorage persistence rather than a server-side session",
          chose: "Mirroring the basket to localStorage and rehydrating on load",
          over: [
            "A server session tied to a user account",
            "Accepting that a reload empties the basket",
          ],
          why: "Losing a basket on refresh is the single most annoying thing a storefront can do, and fixing it did not require accounts, a database or authentication, which would have been a large amount of infrastructure for one behaviour. localStorage bought the whole benefit for very little.",
          tradeoff:
            "The basket is per-browser: it does not follow the customer to their phone, and it has to be rehydrated carefully to avoid a server/client markup mismatch on first paint.",
        },
        {
          title: "Playwright end-to-end tests over unit tests alone",
          chose: "End-to-end coverage of the purchase journey",
          over: [
            "Unit tests on components and reducers only",
            "Manual testing before each deploy",
          ],
          why: "Every unit in this app can pass while the thing that matters is broken: a routing change, a hydration mismatch or a state bug between two correct components. Testing the whole path from browsing to basket to checkout in a real browser catches the class of failure that actually loses a sale, and catches it across viewports.",
          tradeoff:
            "Slower and more brittle than unit tests, so it is deliberately scoped to the critical path rather than used for everything.",
        },
        {
          title: "TypeScript throughout, including the catalogue data",
          chose: "Typed product, price and basket-line models",
          over: ["JavaScript with runtime checks at the edges"],
          why: "Commerce bugs are shape bugs: a missing variant, a price as a string, a quantity that is undefined. Those are precisely the mistakes a type system catches for free, and they are the ones that turn into wrong totals rather than visible crashes.",
          tradeoff:
            "Types describe the code, not the data that arrives at runtime, so they are not a substitute for validating an API response, and it is easy to mistake one for the other.",
        },
      ],
      stack: [
        {
          label: "Application",
          items: ["React", "Next.js", "TypeScript"],
        },
        { label: "Styling", items: ["Tailwind"] },
        { label: "State", items: ["Redux Toolkit", "localStorage"] },
        { label: "Testing", items: ["Playwright"] },
        { label: "Integrations", items: ["Mailchimp"] },
        { label: "Hosting", items: ["Vercel"] },
      ],
      gallery: [
        {
          title: "Mobile",
          aspect: "portrait",
          images: [
            {
              src: "/projects/katie-jayne/home.jpg",
              alt: "Katie Jayne storefront homepage on mobile",
              width: 821,
              height: 1200,
              caption: "Homepage.",
            },
            {
              src: "/projects/katie-jayne/catalogue.jpg",
              alt: "Product catalogue listing on mobile",
              width: 805,
              height: 1200,
              caption: "Catalogue.",
            },
            {
              src: "/projects/katie-jayne/catalogue_product.jpg",
              alt: "Product detail page for a piece of glassware",
              width: 814,
              height: 1200,
              caption:
                "Product detail, on its own route rather than in a modal.",
            },
            {
              src: "/projects/katie-jayne/filter_sort.jpg",
              alt: "Filter and sort controls on the catalogue",
              width: 823,
              height: 1200,
              caption: "Filtering and sorting.",
            },
            {
              src: "/projects/katie-jayne/cart.jpg",
              alt: "Shopping basket listing selected items and totals",
              width: 818,
              height: 1200,
              caption: "Basket, restored from localStorage after a reload.",
            },
            {
              src: "/projects/katie-jayne/checkout.jpg",
              alt: "Checkout form on mobile",
              width: 813,
              height: 1200,
              caption: "Checkout, the end of the tested journey.",
            },
          ],
        },
        {
          title: "Desktop",
          aspect: "landscape",
          images: [
            {
              src: "/projects/katie-jayne/web_menu.jpg",
              alt: "Katie Jayne desktop navigation and menu",
              width: 1800,
              height: 900,
              caption: "Desktop navigation.",
            },
            {
              src: "/projects/katie-jayne/web_product.jpg",
              alt: "Product detail page on desktop",
              width: 1800,
              height: 908,
              caption: "Product detail on a wide viewport.",
            },
            {
              src: "/projects/katie-jayne/web_mailing_list.jpg",
              alt: "Mailing list signup section on desktop",
              width: 1800,
              height: 887,
              caption: "Mailing list, wired to Mailchimp.",
            },
          ],
        },
      ],
      outcome:
        "The project that took me from learning React to building with it. It stands as a complete, deployed storefront rather than a tutorial result, and the parts I would keep (one owner for shared state, persistence where losing data is unacceptable, and tests on journeys instead of units) are the habits I have carried into production work since.",
    },
  },
  {
    id: "uk-atlas",
    title: "The Contour Atlas",
    description:
      "A field guide to the twelve regions of the UK ranging from food, festivals, landmarks and live weather which is drawn as an Ordnance Survey sheet. A server-side producer polls Open-Meteo for all twelve regions in a single request every 60 seconds, filters out readings that haven't actually changed, and publishes them over Server-Sent Events to a station-style split-flap board. Streaming sits behind an EventBus interface, so moving to a Kafka-compatible broker swaps one file rather than reworking the app. Coastline, borders and pins all project from real coordinates through one shared function, and the whole thing runs without an API key.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Server-Sent Events",
      "Open-Meteo",
    ],
    liveUrl: "https://uk-atlas.vercel.app",
    githubUrl: "https://github.com/AuliaAmirullah15/uk_atlas",
    imageUrl: "/projects/uk-atlas.png",
    featured: true,
    category: "web",
    caseStudy: {
      role: "Sole developer",
      company: "Personal project",
      context:
        "A field guide to the twelve regions of the UK, covering food, festivals, landmarks and live weather, drawn as an Ordnance Survey sheet. Live readings arrive on a station-style split-flap board that only flips when something has actually changed.",
      overview:
        "Built to get streaming right at small scale: a real producer, a real change filter, a real transport, and an abstraction thin enough that the streaming layer could be swapped for a broker without touching the application. It also runs entirely without an API key, which was a constraint I set deliberately: the design had to survive a free, rate-limited upstream.",
      architecture: {
        summary:
          "A producer-consumer pipeline with three deliberate seams: one between the upstream API and the producer, one between the producer and the transport, and one between raw coordinates and anything drawn on screen. Each seam exists because that is where I expected the implementation to change.",
        layers: [
          {
            name: "Upstream",
            role: "Where the weather comes from.",
            detail:
              "Open-Meteo, queried without an API key. All twelve regions are fetched in a single request rather than twelve, which is what keeps the whole thing inside a free tier at a 60-second cadence.",
            tech: ["Open-Meteo"],
          },
          {
            name: "Producer",
            role: "One poller for the whole map.",
            detail:
              "A server-side loop polling once every 60 seconds. It runs on the server, not in each visitor's browser, so a hundred concurrent visitors cost exactly the same upstream traffic as one.",
            tech: ["Next.js", "TypeScript"],
          },
          {
            name: "Change filter",
            role: "Only publish news.",
            detail:
              "Each reading is compared with the last published value for that region and dropped if it has not moved. The board flips because something changed, not because a minute passed.",
            tech: ["TypeScript"],
          },
          {
            name: "Event bus",
            role: "The seam a broker would slot into.",
            detail:
              "Publishing goes through an EventBus interface with an in-process implementation. Moving to a Kafka-compatible broker means writing one more implementation of that interface, not reworking the application around it.",
            tech: ["EventBus interface"],
          },
          {
            name: "Transport",
            role: "Server to browser.",
            detail:
              "Server-Sent Events. Changed readings are pushed down an open HTTP response as they are published; the browser's EventSource handles reconnection itself.",
            tech: ["Server-Sent Events"],
          },
          {
            name: "Client",
            role: "The sheet and the board.",
            detail:
              "React components rendering the map and the split-flap board, subscribed to the event stream and animating only the characters that actually differ.",
            tech: ["React", "Tailwind"],
          },
          {
            name: "Projection",
            role: "One coordinate system for everything drawn.",
            detail:
              "Coastline, regional borders and location pins all pass through the same coordinate-to-SVG function, so a pin cannot land in the sea because two pieces of geometry disagreed.",
            tech: ["SVG", "TypeScript"],
          },
        ],
      },
      decisions: [
        {
          title: "Server-Sent Events, not WebSocket",
          chose: "SSE over a long-lived HTTP response",
          over: ["WebSocket", "Client-side polling on an interval"],
          why: "The data only ever travels one way, server to browser. WebSocket buys a return channel this application has no use for, in exchange for a protocol upgrade, its own reconnection logic and more hostile behaviour through proxies. SSE is plain HTTP, and EventSource reconnects on its own with no code from me.",
          tradeoff:
            "There is no client-to-server channel, so anything interactive later would need a separate mechanism. Browsers also cap concurrent SSE connections per origin, which is fine for one stream and would not be for many.",
        },
        {
          title: "One batched upstream poll, server-side",
          chose:
            "A single server-side request covering all twelve regions every 60 seconds",
          over: [
            "One request per region",
            "Each browser fetching the weather itself",
          ],
          why: "Twelve requests a minute per visitor would have needed a paid key almost immediately; one request a minute for everybody does not. Polling on the server also decouples upstream cost from traffic entirely, since the load is the same whether one person is watching or a thousand.",
          tradeoff:
            "A single request is a single point of failure: one bad response affects all twelve regions at once, so the failure has to degrade to stale-but-labelled data rather than an empty map.",
        },
        {
          title: "Filtering unchanged readings at the producer",
          chose:
            "Comparing against the last published value and publishing only differences",
          over: [
            "Publishing every reading on every tick",
            "Letting the client decide what changed",
          ],
          why: "A split-flap board that flips every 60 seconds regardless is noise, and it trains you to ignore it. Filtering at the producer means every animation on screen carries information, and it keeps the stream quiet, so a change is visible in the network tab as well as on the board.",
          tradeoff:
            "Silence becomes ambiguous: a client cannot tell 'nothing changed' from 'the producer died'. That needs a heartbeat to resolve, which is a cost the naive approach does not have.",
        },
        {
          title: "An EventBus interface over calling a broker directly",
          chose: "An interface with a single in-process implementation",
          over: [
            "Publishing straight to the transport",
            "Running Kafka or Redpanda from the start",
          ],
          why: "A broker in Docker for a twelve-region weather feed would be infrastructure with nothing to justify it, and it would put a container between me and every deployment. The interface costs almost nothing and means the decision stays open: if this needed durability or multiple consumers, it is one new implementation rather than a rewrite.",
          tradeoff:
            "It is an abstraction with exactly one implementation today, which is the classic shape of speculative generality. It earns its place only because it is genuinely thin: a handful of methods, no configuration, no framework.",
        },
        {
          title: "A single shared projection function",
          chose:
            "One coordinate-to-SVG transform used by coastline, borders and pins",
          over: [
            "Per-feature coordinate handling",
            "Pre-baked SVG paths with hard-coded pin positions",
          ],
          why: "The failure mode of drawing geography is quiet: a pin two pixels into the sea, a border that does not meet the coast. Those happen when two pieces of code convert coordinates slightly differently. Routing everything through one function makes registration structural, because the features cannot disagree, because there is only one conversion.",
          tradeoff:
            "Everything now depends on that one function being right, and changing the projection changes every drawn element at once. That is the intended property, but it means the function needs the most care in the codebase.",
        },
      ],
      stack: [
        {
          label: "Application",
          items: ["Next.js", "React", "TypeScript"],
        },
        { label: "Styling", items: ["Tailwind"] },
        {
          label: "Streaming",
          items: ["Server-Sent Events", "EventBus interface"],
        },
        { label: "Data", items: ["Open-Meteo", "No API key"] },
        { label: "Drawing", items: ["SVG", "Shared projection"] },
        { label: "Hosting", items: ["Vercel"] },
      ],
      outcome:
        "A live streaming pipeline with no key, no broker and no per-visitor upstream cost. The two things I set out to prove both held up: that a change filter makes an interface calmer and more informative at the same time, and that one seam in the right place keeps a decision open.",
    },
  },
  {
    id: "iphone-clone",
    title: "iPhone Clone",
    description:
      "Interactive clone of Apple's iPhone product page, built to master 3D rendering and scroll-driven animation. It has real-time device rotation with Three.js, fluid reveals with GSAP, and storytelling-led UI architecture.",
    techStack: ["React", "Next.js", "TypeScript", "Three.js", "GSAP"],
    liveUrl: "https://apple16-clone.vercel.app/",
    githubUrl: "https://github.com/AuliaAmirullah15/apple-clone",
    imageUrl: "/projects/iphone-clone.png",
    featured: true,
    category: "web",
    caseStudy: {
      role: "Sole developer",
      company: "Study project",
      context:
        "A rebuild of Apple's iPhone 16 Pro product page: a rotating 3D device you can recolour and resize at runtime, scroll-driven reveals, and the section-by-section pacing Apple uses to tell a product story. Built to understand how that class of page is actually put together.",
      overview:
        "A deliberate study of the two techniques that make pages like this work, real-time 3D and scroll-linked animation, and of the architecture underneath them. The interesting constraint was that the device model is interactive: colour and size are chosen by the visitor, which rules out most of the shortcuts a page like this could otherwise take.",
      architecture: {
        summary:
          "Each section of the story owns its own animation lifecycle, and the 3D scene is a single long-lived canvas that sections drive rather than each creating their own. Splitting it the other way, with one global timeline or a scene per section, is what makes these pages stutter.",
        layers: [
          {
            name: "Page composition",
            role: "One component per story beat.",
            detail:
              "Hero, video, model viewer, chip, intelligence, titanium. Each section is self-contained and sets up and tears down its own animations, so a change to one beat cannot desynchronise another.",
            tech: ["Next.js", "React", "TypeScript"],
          },
          {
            name: "3D scene",
            role: "The device, live.",
            detail:
              "A Three.js scene holding the iPhone model, with materials swapped for the colour variants and the camera and model scaled for the two size options. Rendered into one canvas that persists across the section rather than being recreated.",
            tech: ["Three.js", "3D model"],
          },
          {
            name: "Scroll choreography",
            role: "Position in the page drives the animation.",
            detail:
              "GSAP timelines bound to scroll position, so progress through a section is progress through its animation, scrubbable in both directions rather than fire-and-forget on entry.",
            tech: ["GSAP", "ScrollTrigger"],
          },
          {
            name: "Media",
            role: "Video as a first-class section.",
            detail:
              "Embedded product video treated as part of the scroll narrative rather than a widget dropped into the page.",
            tech: ["HTML video"],
          },
        ],
      },
      decisions: [
        {
          title: "A real Three.js model, not a pre-rendered image sequence",
          chose: "A live 3D scene with runtime materials and scaling",
          over: [
            "A pre-rendered sprite sheet or frame sequence per variant",
            "A static hero image",
          ],
          why: "The page lets the visitor pick a colour and a size. With pre-rendered frames that is a full rotation sequence per colour per size: every combination shipped as image data, and every new variant a re-render. A real scene makes a colour change a material swap, so the number of variants stops affecting the payload at all.",
          tradeoff:
            "It costs GPU time on the client and needs a genuine loading state for the model, where an image sequence would have degraded gracefully to simply appearing slowly.",
        },
        {
          title: "GSAP timelines over CSS scroll-driven animation",
          chose: "GSAP with scroll-bound timelines",
          over: [
            "CSS scroll-driven animations",
            "IntersectionObserver triggering CSS transitions",
          ],
          why: "The sections sequence several elements against each other and against scroll position, and need to run correctly when scrolled backwards. A timeline is the right model for that, because you can position, overlap and scrub it. IntersectionObserver only tells you something entered the viewport, which is enough for a fade and not for choreography.",
          tradeoff:
            "A JavaScript animation dependency on the critical path, and animation that no longer respects a reduced-motion preference for free, so that has to be handled explicitly rather than inherited from the platform.",
        },
        {
          title:
            "A persistent canvas driven by sections, not a canvas per section",
          chose: "One long-lived scene the sections animate",
          over: ["Mounting a new Three.js canvas per section that needs 3D"],
          why: "Creating and destroying WebGL contexts as the visitor scrolls means repeated model parsing, repeated context setup and a visible hitch at every boundary, and browsers limit how many contexts you may hold at once. One scene pays the setup cost once.",
          tradeoff:
            "The scene becomes shared state between sections, so its lifecycle has to be managed above them rather than by whichever section is currently on screen.",
        },
      ],
      stack: [
        {
          label: "Application",
          items: ["React", "Next.js", "TypeScript"],
        },
        { label: "3D", items: ["Three.js", "3D model", "WebGL"] },
        { label: "Animation", items: ["GSAP", "ScrollTrigger"] },
        { label: "Hosting", items: ["Vercel"] },
      ],
      gallery: [
        {
          title: "Sections",
          aspect: "portrait",
          images: [
            {
              src: "/projects/iphone-clone/hero.jpg",
              alt: "Hero section of the iPhone product page clone",
              width: 832,
              height: 1200,
              caption: "Hero.",
            },
            {
              src: "/projects/iphone-clone/video.jpg",
              alt: "Video section of the iPhone product page clone",
              width: 903,
              height: 1200,
              caption: "Video, sequenced into the scroll narrative.",
            },
            {
              src: "/projects/iphone-clone/modelling.jpg",
              alt: "'Take a closer look' section showing the iPhone 16 Pro in Natural Titanium with colour swatches and 6.3 inch and 6.9 inch size options",
              width: 820,
              height: 1200,
              caption:
                "The live model, with colour and size chosen at runtime, which is why it is a real scene rather than pre-rendered frames.",
            },
            {
              src: "/projects/iphone-clone/model.jpg",
              alt: "Rotating 3D iPhone model rendered with Three.js",
              width: 833,
              height: 1200,
              caption: "Rotation, driven by scroll position.",
            },
            {
              src: "/projects/iphone-clone/titanium.jpg",
              alt: "Titanium material section of the iPhone product page clone",
              width: 832,
              height: 1200,
              caption: "Material storytelling.",
            },
            {
              src: "/projects/iphone-clone/chip.jpg",
              alt: "Chip section of the iPhone product page clone",
              width: 819,
              height: 1200,
              caption: "Chip section.",
            },
            {
              src: "/projects/iphone-clone/intelligence.jpg",
              alt: "Apple Intelligence section of the iPhone product page clone",
              width: 818,
              height: 1200,
              caption: "Intelligence section.",
            },
          ],
        },
      ],
      outcome:
        "Hands-on understanding of scroll-linked animation, WebGL lifecycle and the performance ceiling of both. More usefully, it taught me to read a high-fidelity commercial page and work out which of its effects are architectural decisions and which are decoration. That habit transfers to work far less flashy than this.",
    },
  },
  {
    id: "beauty-spa",
    title: "Beauty & Spa Landing Page",
    description:
      "Marketing landing page for a Singapore-based beauty clinic. I built it with clean HTML, CSS and javascript which features Mobile-first development, with jQuery-powered sliders, smooth scroll, and consultation journey.",
    techStack: ["JavaScript", "HTML", "CSS", "jQuery"],
    liveUrl: "https://aha-beauty-products.netlify.app/",
    githubUrl: "https://github.com/AuliaAmirullah15/spa",
    imageUrl: "/projects/beauty-spa.png",
    featured: true,
    category: "web",
    caseStudy: {
      role: "Frontend Developer",
      company: "Vi8e Interactive Pte Ltd",
      context:
        "A marketing landing page for a Singapore beauty and wellness clinic, built to convert: product highlights, a featured carousel, an Instagram feed, a mailing list and a consultation booking path. One page, one job.",
      overview:
        "I led the front end. The whole thing is HTML, CSS and JavaScript with jQuery, deliberately no framework, with mobile-first layout, a swiper carousel, smooth scroll navigation and a collapsible menu. The luxury feel comes from restraint in the palette, type and imagery rather than from effects.",
      architecture: {
        summary:
          "Three flat layers with a hard line between them: markup that means something on its own, styling that adapts to the viewport, and behaviour layered on top of a page that already works without it.",
        layers: [
          {
            name: "Markup",
            role: "Content that stands alone.",
            detail:
              "Semantic HTML in reading order, with the consultation call-to-action present in the document rather than injected by script. The page is complete before any JavaScript runs.",
            tech: ["HTML"],
          },
          {
            name: "Styling",
            role: "Mobile-first, widening up.",
            detail:
              "Hand-written CSS starting from the narrowest layout and adding at breakpoints. A restrained palette and generous type sizing do most of the work of looking premium.",
            tech: ["CSS"],
          },
          {
            name: "Behaviour",
            role: "Enhancement, not foundation.",
            detail:
              "jQuery and vanilla JavaScript for the carousel, smooth scrolling and the collapsible navigation. Each one enhances something that is already usable in its absence.",
            tech: ["JavaScript", "jQuery"],
          },
        ],
      },
      decisions: [
        {
          title: "No framework at all",
          chose: "Plain HTML, CSS and JavaScript",
          over: ["Vue or React", "A page builder or template theme"],
          why: "This is one page whose only measure of success is how many mobile visitors book a consultation. A framework runtime is bytes and parse time spent before the first pixel, buying a component model that a single page never gets to amortise. Nothing here needed reactive state.",
          tradeoff:
            "No component model, so repeated markup is genuinely repeated, so a change to a shared block is a change in several places. That is a real maintenance cost, and it would be the wrong trade the moment this became more than one page.",
        },
        {
          title:
            "jQuery for the carousel rather than hand-rolled touch handling",
          chose: "An established slider plugin",
          over: [
            "Writing touch, drag and momentum handling from scratch",
            "A CSS-only scroll-snap carousel",
          ],
          why: "Touch, drag, momentum and their differences between mobile browsers were the actual risk in this project: the part most likely to feel broken on somebody's phone and least likely to be caught in testing. That is exactly the work worth taking off the shelf.",
          tradeoff:
            "A library dependency for a small amount of behaviour, and jQuery's own weight on a page whose entire argument is being light.",
        },
        {
          title: "Mobile-first CSS, not desktop-down",
          chose: "Narrowest layout as the base, widening at breakpoints",
          over: ["A desktop layout with overrides for small screens"],
          why: "The traffic is mobile and the conversion is a thumb on a button. Starting narrow means the smallest screen gets the least CSS and no overrides to undo, and the layout is designed for the constrained case rather than squeezed into it afterwards.",
          tradeoff:
            "The desktop layout has to be composed additively, which takes more thought when the design was handed over as a wide mockup.",
        },
        {
          title: "Progressive enhancement over a script-dependent page",
          chose: "Content and the booking path working before JavaScript runs",
          over: ["Rendering or revealing sections with JavaScript"],
          why: "On a page whose only purpose is a conversion, a failed script must not mean a lost booking, and on mobile networks scripts do fail, arrive late, or get blocked. Keeping the content in the document means the worst case is a page that looks plainer, not one that is empty.",
          tradeoff:
            "Some effects have to be given up, or built so their pre-JavaScript state is presentable, which constrains what the design can rely on.",
        },
      ],
      stack: [
        { label: "Markup & styling", items: ["HTML", "CSS"] },
        { label: "Behaviour", items: ["JavaScript", "jQuery"] },
        {
          label: "Approach",
          items: ["Mobile-first", "Progressive enhancement"],
        },
        { label: "Hosting", items: ["Netlify"] },
      ],
      gallery: [
        {
          title: "Mobile",
          aspect: "portrait",
          images: [
            {
              src: "/projects/beauty-spa/banner.jpg",
              alt: "Beauty and spa landing page hero banner on mobile",
              width: 818,
              height: 1200,
              caption: "Hero.",
            },
            {
              src: "/projects/beauty-spa/exclusive.jpg",
              alt: "Web exclusive product section on mobile",
              width: 826,
              height: 1200,
              caption: "Web exclusive products.",
            },
            {
              src: "/projects/beauty-spa/swiper.jpg",
              alt: "Featured product carousel on mobile",
              width: 823,
              height: 1200,
              caption:
                "The carousel, the one piece of behaviour taken off the shelf.",
            },
            {
              src: "/projects/beauty-spa/consultation.jpg",
              alt: "Consultation booking section on mobile",
              width: 827,
              height: 1200,
              caption:
                "The consultation path, in the document rather than injected.",
            },
            {
              src: "/projects/beauty-spa/instagram.jpg",
              alt: "Instagram feed section on mobile",
              width: 825,
              height: 1200,
              caption: "Social proof.",
            },
            {
              src: "/projects/beauty-spa/mailing_list.jpg",
              alt: "Mailing list signup on mobile",
              width: 832,
              height: 1200,
              caption: "Mailing list.",
            },
          ],
        },
        {
          title: "Desktop",
          aspect: "landscape",
          images: [
            {
              src: "/projects/beauty-spa/web_banner.jpg",
              alt: "Beauty and spa landing page hero on desktop",
              width: 1800,
              height: 921,
              caption: "The same page, widened.",
            },
            {
              src: "/projects/beauty-spa/web_consultation.jpg",
              alt: "Consultation booking section on desktop",
              width: 1800,
              height: 929,
              caption: "Consultation on desktop.",
            },
          ],
        },
      ],
      outcome:
        "A fast, responsive landing page that gave the clinic a credible online presence and a clear booking path, well received for how it looked and how easily it read on a phone. The framework-free approach kept it quick on mobile networks, which was the entire point.",
    },
  },
];

/** Only projects with a write-up get a detail page. */
export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export const caseStudies = projects.filter((p) => p.caseStudy);
