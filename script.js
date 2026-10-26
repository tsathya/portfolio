const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
const coarse = window.matchMedia("(hover: none)").matches;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
  localStorage.setItem("theme", theme);
}

applyTheme(
  storedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
);

themeToggle.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TAG_SLUGS = {
  "Product & Technology": "product",
  "Finance & Accounting": "finance",
  "Data & Analytics": "data",
  "Strategy & Operations": "strategy",
  "Marketing & Growth": "marketing",
  Partnerships: "partnerships",
  "Music & Licensing": "music",
};

const experiences = [
  {
    when: "June 2025 — Present",
    title: "Product Management Intern",
    where: "NBCUniversal",
    location: "New York, NY, United States",
    links: [{ label: "NBCUniversal", href: "https://www.nbcuniversal.com/" }],
    tags: ["Product & Technology", "Finance & Accounting"],
    tools: ["SAP Joule", "SAP SAC", "SAP BPC", "SAP S/4HANA", "SAP BW", "Jira", "Confluence", "Excel", "Agile/Scrum", "Copilot Studio"],
    photo: "assets/experience/nbcu-media-tech-2026.jpg",
    photoCaption: "Summer Media Tech Internship Class of 2026",
    points: [
      "Partnered with Finance and AI Engineering to translate FP&A needs into product requirements and prioritize use cases for an enterprise generative AI finance assistant powered by SAP Joule, bridging business and technical stakeholders",
      "Led 10+ stakeholder interviews to identify workflow pain points and user needs, synthesizing insights into a PRD and roadmap recommendations for scaling enterprise finance products",
      "Supported migration from on-premises BPC to cloud-based SAC ([Project Keystone](https://www.nbcunicareers.com/business/project-keystone)), analyzing performance across 15+ users, conducting UAT to identify UX and functional issues, defining product KPIs, and driving data-informed product improvements with SAP",
      "Evaluated agentic AI capabilities for autonomous FX/hedging, forecasting, and KPI-monitoring workflows, identifying opportunities to automate financial decision-making and shape future product capabilities",
      "Coordinated cross-functional product delivery across Finance, Engineering, and enterprise technology teams, managing functional specifications, technical feasibility documentation, and requirements through Jira and Confluence",
    ],
  },
  {
    when: "Sep 2025 — Nov 2025",
    title: "Finance & Analytics Intern",
    where: "Concord",
    location: "New York, NY, United States",
    links: [{ label: "Concord (now BMG)", href: "https://concord.com/" }],
    tags: ["Finance & Accounting", "Data & Analytics"],
    tools: ["Oracle NetSuite", "Rightsline", "Excel"],
    points: [
      "Managed post-acquisition integration of Broadway Licensing Global (BLG), mapping and validating royalty, invoice, and customer data across Oracle NetSuite and Rightsline to ensure cross-system data integrity and reporting accuracy",
      "Performed variance analysis on financial and accounting data in Excel to identify discrepancies, investigate key drivers, and generate data-driven insights to support business decision-making",
      "Partnered with Licensing and Finance stakeholders to investigate 14 customer and payment workflow issues, identify user needs, and recommend process improvements to streamline operations and enhance customer experience",
    ],
  },
  {
    when: "Sep 2024 — Present",
    title: "Program Operations Assistant",
    where: "NYU Music Business Program",
    location: "New York, NY, United States",
    links: [
      {
        label: "NYU Music Business Program",
        href: "https://steinhardt.nyu.edu/programs/music-business",
      },
    ],
    tags: ["Strategy & Operations"],
    tools: ["Mailchimp", "Excel", "Google Workspace"],
    points: [
      "Coordinated program operations, stakeholder communications, and event logistics supporting 3,000+ students and alumni, managing outreach and engagement through Mailchimp",
      "Streamlined administrative workflows using Excel to clean databases, validate contact records, resolve discrepancies, and improve data accuracy",
      "Managed event registration, RSVP tracking, and cross-functional coordination through Google Workspace, supporting program execution, budget tracking, and operational planning",
    ],
  },
  {
    when: "Jun 2025 — Aug 2025",
    title: "Digital Strategy & Partnerships Intern",
    where: "Think Music",
    location: "Chennai, India",
    links: [{ label: "Think Music (Believe Music)", href: "https://www.thinkmusic.in/" }],
    tags: ["Partnerships", "Product & Technology"],
    tools: [
      "Spotify for Artists",
      "Amazon Music for Artists",
      "Chartmetric",
      "Apple Music for Artists",
      "YouTube for Artists",
      "IPRS",
    ],
    points: [
      "Coordinated directly with streaming platforms and digital partners to support music releases, resolve platform needs, and execute partnership, distribution, and promotional initiatives",
      "Analyzed streaming performance and audience engagement data to support DSP pitching and digital marketing strategy",
      "Reviewed copyright, metadata, and ownership information to identify unauthorized content and support platform compliance",
    ],
  },
  {
    when: "Jan 2025 — May 2025",
    title: "Music Licensing Intern",
    where: "Flavorlab",
    location: "New York, NY, United States",
    links: [{ label: "Flavorlab", href: "https://www.flavorlab.com/" }],
    tags: ["Music & Licensing", "Partnerships"],
    tools: ["DISCO", "Chartmetric", "The Orchard", "MLC Database", "Songview (ASCAP & BMI) Database"],
    points: [
      "Managed sync licensing catalog operations for video game placements, organizing music assets and metadata to improve content discoverability and licensing readiness",
      "Validated ISRC/ISWC identifiers, ownership splits, and rights information to maintain catalog data integrity and streamline licensing workflows",
      "Curated targeted music playlists and researched licensing opportunities with game developers and publishers, including Riot Games, Ubisoft, and EA",
    ],
  },
  {
    when: "Sep 2024 — Dec 2024",
    title: "Marketing/Promotions Intern",
    where: "Grand Pro-Mo & Auxio",
    location: "Montclair, NJ, United States",
    links: [
      { label: "Grand Pro-Mo", href: "https://grandpromo.net/" },
      { label: "Auxio", href: "https://auxiomusic.com/" },
    ],
    tags: ["Marketing & Growth"],
    tools: ["Mediabase"],
    points: [
      "Coordinated marketing partnerships to expand audience reach and support promotional campaigns for artist releases",
      "Executed campaigns for artist releases, coordinating assets, outreach, & strategy to drive audience awareness and engagement",
      "Analyzed campaign and audience performance to identify engagement trends, evaluate promotional effectiveness, and inform data-driven marketing decisions",
    ],
  },
  {
    when: "Jun 2023 — Aug 2023",
    title: "Accounting Intern",
    where: "Seyasoft Technology Solutions",
    location: "Chennai, India",
    links: [
      {
        label: "Seyasoft Technology Solutions",
        href: "https://seyasoftech.com/",
      },
    ],
    tags: ["Finance & Accounting"],
    tools: ["Tally ERP 9", "TallyPrime", "Excel"],
    points: [
      "Processed 150+ journal entries and maintained accurate general ledger records using Tally ERP 9, ensuring timely and accurate recording of financial transactions across multiple client accounts",
      "Performed bank and account reconciliations, investigated discrepancies, and validated financial data to support month-end close activities and improve the accuracy of financial reporting",
      "Analyzed financial transactions, account balances, and supporting documentation to identify inconsistencies, maintain accurate financial records, and strengthen internal controls across accounting processes",
    ],
  },
  {
    when: "Apr 2024 — Aug 2024",
    title: "Artist Research Intern",
    where: "TOORLY",
    location: "New York, NY, United States",
    links: [{ label: "TOORLY", href: "https://toorly.com/" }],
    tags: ["Data & Analytics", "Marketing & Growth"],
    points: [
      "Researched emerging artists, analyzed streaming trends, and evaluated audience engagement to identify talent opportunities and support artist discovery",
      "Conducted competitive research on artist positioning, digital presence, and market trends to inform talent evaluation and strategic recommendations",
      "Maintained artist research databases, organized performance metrics, and developed profiles to streamline talent discovery and outreach workflows",
    ],
  },
  {
    when: "Jun 2024 — Aug 2024",
    title: "Digital Strategy & Analytics Intern",
    where: "MDnD Entertainment",
    location: "Chennai, Tamil Nadu, India",
    links: [{ label: "MDnD Entertainment", href: "https://www.mdnd.in/" }],
    tags: ["Data & Analytics", "Marketing & Growth"],
    points: [
      "Analyzed digital campaign performance, audience engagement, and content trends to identify opportunities for improving reach and marketing effectiveness",
      "Monitored key performance indicators (KPIs), evaluated audience behavior, and developed data-driven recommendations to optimize digital strategies",
      "Conducted competitive analysis and prepared performance reports to support content planning, audience growth, and strategic decision-making",
    ],
  },
  {
    when: "Aug 2024 — May 2025",
    title: "Events Head",
    where: "NYU Hindu Students Union",
    location: "New York, NY, United States",
    links: [
      {
        label: "NYU Hindu Students Union",
        href: "https://engage.nyu.edu/organization/hindu-students-union",
      },
    ],
    tags: ["Strategy & Operations", "Marketing & Growth"],
    points: [
      "Led end-to-end planning and execution of student events, managing budgets, logistics, timelines, and resources to ensure successful delivery",
      "Coordinated cross-functional teams, student organizations, and external vendors to align stakeholders and execute campus initiatives",
      "Developed promotional strategies, monitored event participation, and gathered attendee feedback to improve engagement and future event experiences",
    ],
  },
  {
    when: "Oct 2019 — Dec 2022",
    title: "Student Piano Instructor",
    where: "Grace Drums School of Music",
    location: "Chennai, Tamil Nadu, India",
    links: [
      {
        label: "Grace Drums School of Music",
        href: "https://gracedrumsschool.com/",
      },
    ],
    tags: ["Music & Licensing"],
    points: [
      "Designed and delivered personalized piano lessons tailored to individual skill levels, learning objectives, and student development goals",
      "Tracked student progress, evaluated performance, and adapted instructional methods based on feedback to improve learning outcomes",
      "Managed lesson scheduling, communicated progress with students and parents, and maintained structured learning plans to ensure consistent development",
    ],
  },
];

const PINNED_EXPERIENCE_ORGS = ["NBCUniversal", "Concord"];

const projects = [
  {
    id: "spotlight",
    index: "01",
    section: "builds",
    layout: "spotlight",
    title: "Spotlight",
    subtitle: "Enterprise Resource Discovery",
    summary:
      "Making employee growth opportunities easier to discover through a centralized resource platform.",
    heroLine: "Making employee growth opportunities easier to discover.",
    org: "NBCUniversal",
    year: "2026",
    role: "Media Tech Capstone",
    field: "Enterprise Product & AI",
    myRole: "Product Manager",
    projectType: "NBCU Media Tech Intern Capstone",
    tags: ["Product Discovery", "User Research", "Product Strategy", "Prototyping"],
    tools: ["Figma", "Miro", "Next.js", "React", "NestJS", "Google Cloud Platform", "Copilot Studio"],
    categories: ["Product Management", "Enterprise Technology"],
    featured: true,
    confidential: true,
    screenshot: "",
    coverImage: "assets/projects/spotlight.jpg",
    iconImage: "assets/projects/spotlight.jpg",
    screenshots: [],
  },
  {
    id: "context",
    index: "02",
    section: "builds",
    layout: "context",
    title: "Context AI",
    subtitle: "AI-Powered Research & Evidence Verification",
    summary:
      "An AI research workspace that answers questions from uploaded PDFs and checks whether claims are actually supported by the source text.",
    heroLine: "Research answers grounded in evidence, with source citations and claim verification.",
    lede: "Context AI is an AI-powered research workspace I designed and built for students and researchers who work with academic PDFs.\n\nI took it from a product problem (fluent AI answers that are hard to trust) to a deployed MVP that retrieves passages, cites sources, and evaluates whether a claim is supported, contradicted, or underdetermined.",
    org: "Personal Project",
    year: "2026",
    role: "Product Designer & Developer",
    field: "AI Product & Research Technology",
    myRole: "Product Designer & Developer",
    projectType: "Personal Project",
    liveUrl: "https://context-ai-xi-nine.vercel.app/",
    tags: ["AI Product", "RAG", "Evidence Verification", "0 → 1"],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Supabase Auth",
      "Supabase Storage",
      "PostgreSQL",
      "pgvector",
      "SQL",
      "OpenAI API",
      "PDF.js",
      "RAG",
      "Vercel",
      "GitHub",
      "Git",
      "Cursor",
    ],
    categories: ["Product Management", "AI"],
    featured: true,
    coverImage: "assets/projects/context-cover.jpg",
    iconImage: "assets/projects/context-icon.jpg",
    screenshots: [
      "assets/projects/context-research.png",
      "assets/projects/context-evidence.png",
      "assets/projects/context-contradictions.png",
      "assets/projects/context-sidebar.png",
    ],
  },
  {
    id: "medhyaos",
    index: "03",
    section: "builds",
    layout: "medhyaos",
    title: "MedhyaOS",
    subtitle: "An Interactive Portfolio",
    summary:
      "A macOS-inspired portfolio that turns my work into a navigable desktop environment.",
    heroLine: "Rethinking the traditional portfolio as an interactive desktop experience.",
    org: "Personal Project",
    year: "2026",
    role: "Product Design & Development",
    field: "Web Design & Development",
    myRole: "Web Designer & Developer",
    projectType: "Personal Project",
    tags: ["Product Thinking", "UI/UX", "Web Development"],
    tools: ["HTML", "CSS", "JavaScript", "Cursor"],
    categories: ["Product Management", "Development"],
    featured: true,
    coverImage: "assets/projects/medhyaos.jpg",
    iconImage: "assets/projects/medhyaos-icon.png",
    screenshots: ["assets/projects/medhyaos.jpg"],
  },
  {
    id: "gamedev",
    index: "04",
    section: "builds",
    layout: "gamedev",
    title: "Game Development & Prototyping",
    subtitle: "Building Playable Experiences",
    summary:
      "Designed and developed 27 game prototypes, translating creative concepts into playable experiences through rapid experimentation, user feedback, and iterative development.",
    lede: "Designed and developed 27 game prototypes, translating creative concepts into playable experiences through rapid experimentation, user feedback, and iterative development.\n\nOnly some of these prototypes are displayed in the Game Library.",
    heroLine: "From ideas to playable experiences.",
    org: "Independent Projects",
    role: "Game Design & Development",
    year: "2025",
    field: "Game Design & Development",
    myRole: "Game Designer & Developer",
    projectType: "Personal Projects",
    tags: ["Game Design", "Prototyping", "Playtesting", "Iteration"],
    tools: ["GameMaker", "Unity"],
    categories: ["Game Design", "Prototyping", "User Testing", "Iteration"],
    featured: true,
    playtestUrl: "https://gamecenter.nyu.edu/events/playtest-thursdays/",
    coverImage: "assets/games/dumbledwee-card.jpg",
    iconImage: "assets/projects/gamedev-icon.png",
  },
  {
    id: "catalog",
    index: "01",
    section: "research",
    layout: "catalog",
    title: "Music Catalog Valuation",
    subtitle: "From Royalties to Returns",
    summary:
      "Evaluated the acquisition economics of a music rights catalog through cash flow forecasting, valuation multiples, scenario analysis, and investment return modeling.",
    heroLine: "What makes a music catalog worth acquiring?",
    lede: "An investment analysis exploring how music rights catalogs are valued, how acquisition structures affect returns, and how financial assumptions influence investment decisions.",
    org: "Academic Project",
    role: "Corporate Finance & Valuation in the Music Industry",
    year: "2025",
    field: "Music Finance & Valuation",
    myRole: "Financial Analyst",
    projectType: "Academic Project",
    tags: ["Financial Modeling", "DCF", "Investment Analysis", "Excel"],
    tools: ["Excel"],
    categories: ["Academic Research", "Corporate Finance"],
    featured: true,
    financialModelUrl: "assets/projects/Medhya_Ravishankar_CatalogValuationProject.xlsx",
    investmentAnalysisUrl: "assets/projects/Medhya_Ravishankar_InvestmentRecommendation.pdf",
    coverImage: "assets/projects/catalog-cover.jpg",
    iconImage: "assets/projects/catalog-cover.jpg",
    screenshots: [],
  },
];

const PROJECT_SECTIONS = [
  {
    id: "builds",
    kicker: "01 / 0 → 1 Builds",
    title: "0 → 1 Builds",
    subtitle: "From ideas to tangible products.",
  },
  {
    id: "research",
    kicker: "02 / Research & Analysis",
    title: "Research & Analysis",
    subtitle: "Understanding problems and uncovering insights.",
  },
];

const games = [
  {
    id: "dumbledwee",
    title: "Dumbledwee & Dumbledwarf",
    tagline: "Two unlikely wizards. One magical adventure.",
    heroPitch: "Team up, combine your abilities, and solve puzzles in this two-player cooperative platformer.",
    heroTags: ["Co-op", "Puzzle Platformer", "Two Players"],
    genre: "Platformer",
    secondaryGenres: ["Co-op", "Puzzle", "Adventure"],
    gameType: "Two-Player Cooperative Puzzle Platformer",
    description:
      "Two players control a pair of unlikely wizards with contrasting abilities in a cooperative puzzle platformer. Dash through tight spaces as Dumbledwee, use Dumbledwarf’s levitation to overcome obstacles, and work together to reach the exit.",
    engine: "",
    coverImage: "assets/games/dumbledwee-banner.jpg",
    cardImage: "assets/games/dumbledwee-card.jpg",
    thumbImage: "assets/games/dumbledwee-featured.jpg",
    screenshots: ["assets/games/dumbledwee.png"],
    status: "",
    playUrl: "https://medhyaravi.itch.io/dumbledwarf-dumbledwee",
    sourceUrl: "",
    featured: true,
    featuredSlot: 0,
    mechanics: {
      heading: "Two wizards. Two very different abilities.",
      characters: [
        {
          name: "Dumbledwee",
          blurb: "Small, fast, and chaotic.",
          points: [
            "Moves quickly and can dash.",
            "Can navigate spaces that Dumbledwarf cannot.",
            "Relies on Dumbledwarf to access certain areas.",
          ],
        },
        {
          name: "Dumbledwarf",
          blurb: "Big, slow, and powerful.",
          points: [
            "Uses levitation to lift Dumbledwee.",
            "Helps Dumbledwee overcome height-based obstacles.",
            "Has different movement and physical capabilities.",
          ],
        },
      ],
      coop: {
        heading: "Neither wizard can do everything alone.",
        copy: "Players must coordinate movement, use their contrasting abilities, and solve environmental puzzles to progress through each level. When Dumbledwarf levitates Dumbledwee, Dumbledwee cannot move, jump, or dash while being carried. The levitation height is limited to approximately twice Dumbledwarf’s height.",
      },
    },
  },
  {
    id: "food-thief",
    title: "Food Thief",
    tagline: "Explore the apartment. Meet the roommates. Steal their food.",
    heroPitch: "Wander a pixel-art apartment, visit your roommates, and steal their food in this lighthearted game.",
    heroTags: ["Interactive Fiction", "Exploration", "Comedy"],
    genre: "Interactive Fiction",
    secondaryGenres: ["Exploration", "Comedy", "Casual"],
    description:
      "Explore a pixel-art recreation of my real-life apartment, wander into my roommates’ rooms, interact with them, and steal their food. A lighthearted exploration game inspired by everyday apartment life.",
    engine: "",
    coverImage: "assets/games/food-thief-featured.jpg",
    cardImage: "assets/games/food-thief-card.jpg",
    thumbImage: "assets/games/food-thief-featured.jpg",
    screenshots: ["assets/games/food-thief.png"],
    artStyle: "pixel",
    controls: [
      ["WASD", "Move"],
      ["Space", "Interact with roommates"],
      ["E", "Eat food"],
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/food-thief",
    sourceUrl: "",
    featured: false,
    featuredSlot: 1,
  },
  {
    id: "reverse-flappy-bird",
    title: "Move the World, Not the Bird",
    altTitle: "Reverse Flappy Bird",
    tagline: "You don’t dodge the pipes. You control them.",
    heroPitch: "The bird flies on its own. Drag the pipes aside, click to destroy projectiles, and keep it alive.",
    heroTags: ["Action", "Arcade", "Survival"],
    genre: "Action",
    secondaryGenres: ["Arcade", "Survival", "Casual"],
    description:
      "A reverse take on Flappy Bird where the bird flies on its own and you control the obstacles instead. Drag pipes out of its path, click to destroy incoming projectiles, and keep the bird alive for as long as possible.",
    engine: "Unity",
    coverImage: "assets/games/dont-move-the-bird-thumb.jpg",
    cardImage: "assets/games/dont-move-the-bird-card.jpg",
    thumbImage: "assets/games/dont-move-the-bird-thumb.jpg",
    screenshots: ["assets/games/dont-move-the-bird.png"],
    artStyle: "pixel",
    controls: [
      ["Mouse Drag", "Move pipes up and down"],
      ["Click", "Destroy projectiles"],
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/dont-move-the-bird-move-the-world",
    sourceUrl: "",
    featured: false,
    featuredSlot: 2,
  },
  {
    id: "cloud-bouncer",
    title: "Cloud Bouncer",
    tagline: "Bounce high. Knock them down. Stay on top.",
    heroPitch:
      "Challenge a friend in a fast-paced cloud-bouncing platformer. Knock your opponent down to score points and avoid falling yourself.",
    heroTags: ["Action", "Two Players", "Platformer"],
    genre: "Action",
    secondaryGenres: ["Two Players", "Arcade", "Competitive", "Platformer"],
    description:
      "Cloud Bouncer is a fast-paced, two-player competitive platformer where players bounce across clouds and battle for points. Jump on your opponent’s head to knock them straight down and score, but be careful! Falling costs you points. Outmaneuver your opponent and stay on top to win!",
    engine: "",
    coverImage: "assets/games/cloud-bouncer-featured.jpg",
    cardImage: "assets/games/cloud-bouncer-card.jpg",
    thumbImage: "assets/games/cloud-bouncer-featured.jpg",
    screenshots: ["assets/games/cloud-bouncer.png"],
    howToPlay: [
      "Bounce across clouds and stay in play.",
      "Jump on your opponent’s head to knock them downward and earn points.",
      "Avoid falling because it costs you points.",
      "Outscore your opponent.",
    ],
    controls: [
      ["Green Player", "Arrow Keys"],
      ["Red Player", "WASD"],
      ["Attack", "Jump on the opposing player’s head"],
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/cloud-bouncer",
    sourceUrl: "",
    featured: false,
    featuredSlot: 3,
  },
  {
    id: "the-way-out",
    title: "The Way Out",
    tagline: "Explore the unknown. Uncover clues. Find your way out.",
    genre: "Adventure",
    secondaryGenres: ["Exploration", "Narrative", "Mystery"],
    description:
      "The Way Out is a narrative-driven adventure game where players explore a mysterious environment, interact with characters, and uncover clues to find their way out. Navigate your surroundings, discover hidden details, and piece together the path to escape.",
    engine: "",
    coverImage: "assets/games/the-way-out-card.jpg",
    cardImage: "assets/games/the-way-out-card.jpg",
    screenshots: ["assets/games/the-way-out.png"],
    controls: [
      ["WASD", "Move around"],
      ["Space", "Interact with characters"],
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/the-way-out",
    sourceUrl: "",
    featured: false,
    inFeaturedSelector: false,
  },
  {
    id: "rock-paper-scissors",
    title: "Rock, Paper, Scissors",
    tagline: "A classic game of choices, played with cards.",
    genre: "Card Game",
    secondaryGenres: ["Cards", "Casual", "Strategy"],
    description:
      "Rock, Paper, Scissors brings the classic game to a digital card-based format. Choose your cards and face off in a familiar battle of rock, paper, and scissors.",
    engine: "",
    coverImage: "assets/games/rock-paper-scissors-card.jpg",
    cardImage: "assets/games/rock-paper-scissors-card.jpg",
    screenshots: ["assets/games/rock-paper-scissors.png"],
    status: "",
    playUrl: "https://medhyaravi.itch.io/rock-paper-scissors",
    sourceUrl: "",
    featured: false,
    inFeaturedSelector: false,
  },
  {
    id: "click-and-command",
    title: "Click & Command",
    tagline: "Select. Command. Navigate.",
    genre: "Strategy",
    secondaryGenres: ["Real-Time Strategy", "Simulation", "Prototype"],
    gameType: "Game Prototype",
    description:
      "Click & Command is a real-time strategy-inspired movement prototype exploring mouse-based unit selection, waypoint navigation, and movement commands. Inspired by games like Age of Empires II and League of Legends, the project focuses on experimenting with intuitive unit controls and movement systems.",
    engine: "",
    coverImage: "assets/games/click-and-command-card.png",
    cardImage: "assets/games/click-and-command-card.png",
    screenshots: ["assets/games/click-and-command.png"],
    features: [
      "Mouse-based unit selection",
      "Movement commands",
      "Waypoint navigation",
      "RTS-inspired control experimentation",
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/click-command",
    sourceUrl: "",
    featured: false,
    inFeaturedSelector: false,
  },
  {
    id: "rain-check",
    title: "Rain Check",
    tagline: "Dodge the rain. Avoid the raccoon. Stay alive.",
    genre: "Arcade",
    secondaryGenres: ["Survival", "Action", "Casual"],
    description:
      "Rain Check is a fast-paced arcade survival game where players control a little square navigating a rainy environment. Dodge falling raindrops, avoid a mischievous raccoon, and survive as long as you can.",
    engine: "",
    coverImage: "assets/games/rain-check-card.png",
    cardImage: "assets/games/rain-check-card.png",
    screenshots: ["assets/games/rain-check.png"],
    howToPlay: [
      "Move your character to avoid falling raindrops.",
      "Stay away from the raccoon.",
      "Survive for as long as possible.",
    ],
    status: "",
    playUrl: "https://medhyaravi.itch.io/rain-check",
    sourceUrl: "",
    featured: false,
    inFeaturedSelector: false,
  },
];

const skills = [
  "User interviews",
  "Problem framing",
  "Prioritization",
  "PRDs & user stories",
  "Roadmapping",
  "Metrics & funnels",
  "Stakeholder comms",
  "A/B thinking",
  "Requirements gathering",
  "User flows",
  "Wireframing",
  "MVP definition",
  "Success metrics",
  "Backlog management",
  "Competitive analysis",
  "Usability testing",
  "Acceptance criteria",
  "FP&A",
  "Variance analysis",
  "Cash flow forecasting",
  "IRR analysis",
  "Valuation multiples",
  "Scenario analysis",
  "Sensitivity analysis",
  "Royalty accounting",
  "Budgeting",
  "Financial reporting",
  "Month-end close",
  "General ledger",
  "Bank reconciliation",
];

function uniqueSortedLabels(items) {
  const seen = new Map();
  for (const item of items) {
    const value = String(item || "").trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (!seen.has(key)) seen.set(key, value);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function collectTools() {
  return uniqueSortedLabels([
    ...experiences.flatMap((item) => item.tools || []),
    ...projects.flatMap((item) => item.tools || []),
  ]);
}

const TOOL_CATEGORY_ORDER = [
  "Product & Analytics",
  "AI & Automation",
  "Programming & Development",
  "Enterprise Systems",
  "Music Analytics",
];

const TOOL_CATEGORIES = {
  "jira": "Product & Analytics",
  "confluence": "Product & Analytics",
  "excel": "Enterprise Systems",
  "agile/scrum": "Product & Analytics",
  "figma": "Product & Analytics",
  "miro": "Product & Analytics",
  "mailchimp": "Product & Analytics",
  "chartmetric": "Music Analytics",
  "mediabase": "Music Analytics",
  "sap joule": "AI & Automation",
  "cursor": "AI & Automation",
  "copilot studio": "AI & Automation",
  "html": "Programming & Development",
  "css": "Programming & Development",
  "javascript": "Programming & Development",
  "next.js": "Programming & Development",
  "react": "Programming & Development",
  "typescript": "Programming & Development",
  "tailwind css": "Programming & Development",
  "supabase": "Programming & Development",
  "supabase auth": "Programming & Development",
  "supabase storage": "Programming & Development",
  "postgresql": "Programming & Development",
  "pgvector": "Programming & Development",
  "sql": "Programming & Development",
  "pdf.js": "Programming & Development",
  "git": "Programming & Development",
  "github": "Programming & Development",
  "vercel": "Programming & Development",
  "openai api": "AI & Automation",
  "rag": "AI & Automation",
  "nestjs": "Programming & Development",
  "google cloud platform": "Programming & Development",
  "gamemaker": "Programming & Development",
  "unity": "Programming & Development",
  "sap sac": "Enterprise Systems",
  "sap bpc": "Enterprise Systems",
  "sap s/4hana": "Enterprise Systems",
  "sap bw": "Enterprise Systems",
  "oracle netsuite": "Enterprise Systems",
  "tally erp 9": "Enterprise Systems",
  "tallyprime": "Enterprise Systems",
  "rightsline": "Enterprise Systems",
};

function collectToolsByCategory() {
  const grouped = Object.fromEntries(TOOL_CATEGORY_ORDER.map((name) => [name, []]));
  for (const tool of collectTools()) {
    const category = TOOL_CATEGORIES[tool.toLowerCase()] || "Music Analytics";
    grouped[category].push(tool);
  }
  return TOOL_CATEGORY_ORDER.filter((name) => grouped[name].length).map((name) => ({
    name,
    tools: grouped[name],
  }));
}

function collectSkills() {
  const toolNames = new Set(collectTools().map((item) => item.toLowerCase()));
  return uniqueSortedLabels([
    ...skills,
    ...experiences.flatMap((item) => item.tags || []),
    ...projects.flatMap((item) => item.tags || []),
  ]).filter((item) => !toolNames.has(item.toLowerCase()));
}

const SKILL_CATEGORY_ORDER = ["Product", "Finance", "Others"];

const SKILL_CATEGORIES = {
  "a/b thinking": "Product",
  "acceptance criteria": "Product",
  "backlog management": "Product",
  "competitive analysis": "Product",
  "data & analytics": "Product",
  "iteration": "Product",
  "metrics & funnels": "Product",
  "mvp definition": "Product",
  "playtesting": "Product",
  "prioritization": "Product",
  "problem framing": "Product",
  "product & technology": "Product",
  "product discovery": "Product",
  "product strategy": "Product",
  "product thinking": "Product",
  "prds & user stories": "Product",
  "prototyping": "Product",
  "requirements gathering": "Product",
  "roadmapping": "Product",
  "stakeholder comms": "Product",
  "stakeholders": "Product",
  "strategy": "Product",
  "success metrics": "Product",
  "ui/ux": "Product",
  "usability testing": "Product",
  "user flows": "Product",
  "user interviews": "Product",
  "user research": "Product",
  "wireframing": "Product",
  "bank reconciliation": "Finance",
  "budgeting": "Finance",
  "cash flow forecasting": "Finance",
  "dcf": "Finance",
  "finance & accounting": "Finance",
  "financial modeling": "Finance",
  "financial reporting": "Finance",
  "fp&a": "Finance",
  "general ledger": "Finance",
  "investment analysis": "Finance",
  "irr analysis": "Finance",
  "month-end close": "Finance",
  "royalty accounting": "Finance",
  "scenario analysis": "Finance",
  "sensitivity analysis": "Finance",
  "valuation multiples": "Finance",
  "variance analysis": "Finance",
};

function collectSkillsByCategory() {
  const grouped = Object.fromEntries(SKILL_CATEGORY_ORDER.map((name) => [name, []]));
  for (const skill of collectSkills()) {
    const category = SKILL_CATEGORIES[skill.toLowerCase()] || "Others";
    grouped[category].push(skill);
  }
  return SKILL_CATEGORY_ORDER.filter((name) => grouped[name].length).map((name) => ({
    name,
    skills: grouped[name],
  }));
}

const SETTINGS_GLYPHS = {
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="m12 3 1.8 6.2H20l-5.1 3.8 1.9 6.2L12 15.7 7.2 19.2l1.9-6.2L4 9.2h6.2z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="4" y="8" width="16" height="12" rx="1.4"/><path d="M9 20v-5h6v5M8 4h8v4H8z"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.4"/><circle cx="17" cy="16" r="2.4"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="m10.2 13.8 1.1-4.4 4.4-1.1-1.1 4.4z"/></svg>',
  ledger: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="5" y="4" width="14" height="16" rx="1.6"/><path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5"/></svg>',
  dots: '<svg viewBox="0 0 24 24" fill="#fff" stroke="none"><circle cx="6.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="17.5" cy="12" r="1.7"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6L16 11z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.2"/><path d="m16 16 4 4" stroke-linecap="round"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>',
};

const TOOL_CATEGORY_META = {
  "Product & Analytics": {
    color: "#d97746",
    glyph: "chart",
    subtitle: "Product, research, and performance tools.",
  },
  "AI & Automation": {
    color: "#7c6adf",
    glyph: "spark",
    subtitle: "AI-assisted building and automation.",
  },
  "Programming & Development": {
    color: "#3b82c4",
    glyph: "code",
    subtitle: "Languages, frameworks, and cloud.",
  },
  "Enterprise Systems": {
    color: "#4f9a62",
    glyph: "building",
    subtitle: "Finance, ERP, and enterprise platforms.",
  },
  "Music Analytics": {
    color: "#c45b8c",
    glyph: "music",
    subtitle: "Streaming, rights, and catalog platforms.",
  },
};

const SKILL_CATEGORY_META = {
  Product: {
    color: "#b44a28",
    glyph: "compass",
    subtitle: "Discovery, delivery, and product judgment.",
  },
  Finance: {
    color: "#c9a227",
    glyph: "ledger",
    subtitle: "Planning, valuation, and accounting.",
  },
  Others: {
    color: "#6b7280",
    glyph: "dots",
    subtitle: "Adjacent capabilities from other work.",
  },
};

const TOOL_ITEM_GLYPH = {
  jira: "chart",
  confluence: "chart",
  excel: "ledger",
  "agile/scrum": "chart",
  figma: "compass",
  miro: "compass",
  mailchimp: "chart",
  "sap joule": "spark",
  cursor: "spark",
  "copilot studio": "spark",
  html: "code",
  css: "code",
  javascript: "code",
  "next.js": "code",
  react: "code",
  nestjs: "code",
  "google cloud platform": "building",
  gamemaker: "code",
  unity: "code",
  "sap sac": "building",
  "sap bpc": "building",
  "sap s/4hana": "building",
  "sap bw": "building",
  "oracle netsuite": "building",
  "tally erp 9": "ledger",
  tallyprime: "ledger",
  rightsline: "building",
  chartmetric: "music",
  mediabase: "music",
};

function settingsBadge(color, glyph) {
  return `<span class="settings-badge" style="background:${color}">${SETTINGS_GLYPHS[glyph] || SETTINGS_GLYPHS.dots}</span>`;
}

function toolCategoryMeta(name) {
  return (
    TOOL_CATEGORY_META[name] || {
      color: "#6b7280",
      glyph: "dots",
      subtitle: "Additional tools from my work.",
    }
  );
}

function skillCategoryMeta(name) {
  return (
    SKILL_CATEGORY_META[name] || {
      color: "#6b7280",
      glyph: "dots",
      subtitle: "Additional capabilities from my work.",
    }
  );
}

function settingsNavId(kind, name) {
  return `${kind}:${name}`;
}

function settingsCatalog() {
  const tools = collectToolsByCategory();
  const skillGroups = collectSkillsByCategory();
  return {
    tools,
    skillGroups,
    toolCount: collectTools().length,
    skillCount: collectSkills().length,
  };
}

function renderSettingsRows(items, kind) {
  return `<div class="settings-group" role="list">${items
    .map((item) => {
      const glyph = kind === "tool" ? TOOL_ITEM_GLYPH[item.toLowerCase()] || "dots" : "dots";
      const color =
        kind === "tool"
          ? toolCategoryMeta(TOOL_CATEGORIES[item.toLowerCase()] || "Music Analytics").color
          : skillCategoryMeta(SKILL_CATEGORIES[item.toLowerCase()] || "Others").color;
      return `<div class="settings-row" role="listitem">
        ${settingsBadge(color, glyph)}
        <span class="settings-row-label">${escapeHtml(item)}</span>
      </div>`;
    })
    .join("")}</div>`;
}

function renderSettingsBlockHead(name, meta) {
  return `<div class="settings-block-head">
    ${settingsBadge(meta.color, meta.glyph)}
    <h3>${escapeHtml(name)}</h3>
  </div>`;
}

function renderSettingsAllTools(catalog) {
  return `<header class="settings-pane-head">
      ${settingsBadge("#5b6b7a", "wrench")}
      <div>
        <h2>All Tools</h2>
        <p>${catalog.toolCount} tools across product, engineering, finance, and music.</p>
      </div>
    </header>
    ${catalog.tools
      .map((group) => {
        const meta = toolCategoryMeta(group.name);
        return `<section class="settings-block">
          ${renderSettingsBlockHead(group.name, meta)}
          ${renderSettingsRows(group.tools, "tool")}
        </section>`;
      })
      .join("")}`;
}

function renderSettingsAllSkills(catalog) {
  return `<header class="settings-pane-head">
      ${settingsBadge("#8a8178", "grid")}
      <div>
        <h2>All Skills</h2>
        <p>${catalog.skillCount} skills across product, finance, and related work.</p>
      </div>
    </header>
    ${catalog.skillGroups
      .map((group) => {
        const meta = skillCategoryMeta(group.name);
        return `<section class="settings-block">
          ${renderSettingsBlockHead(group.name, meta)}
          ${renderSettingsRows(group.skills, "skill")}
        </section>`;
      })
      .join("")}`;
}

function renderSettingsCategory(id, catalog) {
  if (id === "tools-all") return renderSettingsAllTools(catalog);
  if (id === "skills-all") return renderSettingsAllSkills(catalog);
  if (id.startsWith("tool:")) {
    const name = id.slice(5);
    const group = catalog.tools.find((item) => item.name === name);
    if (!group) return renderSettingsAllTools(catalog);
    const meta = toolCategoryMeta(name);
    return `<header class="settings-pane-head">
      ${settingsBadge(meta.color, meta.glyph)}
      <div>
        <h2>${escapeHtml(name)}</h2>
        <p>${escapeHtml(meta.subtitle)}</p>
      </div>
    </header>
    ${renderSettingsRows(group.tools, "tool")}`;
  }
  if (id.startsWith("skill:")) {
    const name = id.slice(6);
    const group = catalog.skillGroups.find((item) => item.name === name);
    if (!group) return renderSettingsAllSkills(catalog);
    const meta = skillCategoryMeta(name);
    return `<header class="settings-pane-head">
      ${settingsBadge(meta.color, meta.glyph)}
      <div>
        <h2>${escapeHtml(name)}</h2>
        <p>${escapeHtml(meta.subtitle)}</p>
      </div>
    </header>
    ${renderSettingsRows(group.skills, "skill")}`;
  }
  return renderSettingsAllTools(catalog);
}

function settingsSearchIndex(catalog) {
  const rows = [];
  for (const group of catalog.tools) {
    for (const tool of group.tools) {
      rows.push({ label: tool, kind: "Tool", id: settingsNavId("tool", group.name) });
    }
  }
  for (const group of catalog.skillGroups) {
    for (const skill of group.skills) {
      rows.push({ label: skill, kind: "Skill", id: settingsNavId("skill", group.name) });
    }
  }
  return rows;
}

function renderSettingsSearch(query, catalog) {
  const needle = query.trim().toLowerCase();
  const matches = settingsSearchIndex(catalog).filter(
    (row) => row.label.toLowerCase().includes(needle) || row.kind.toLowerCase().includes(needle)
  );
  if (!matches.length) {
    return `<header class="settings-pane-head">
      <div>
        <h2>Search</h2>
        <p>No matches for “${escapeHtml(query.trim())}”.</p>
      </div>
    </header>`;
  }
  return `<header class="settings-pane-head">
      <div>
        <h2>Search</h2>
        <p>${matches.length} result${matches.length === 1 ? "" : "s"} for “${escapeHtml(query.trim())}”.</p>
      </div>
    </header>
    <div class="settings-group" role="list">${matches
      .map(
        (row) => `<button type="button" class="settings-row settings-result" data-settings-nav="${escapeHtml(row.id)}" role="listitem">
        <span class="settings-row-kind">${escapeHtml(row.kind)}</span>
        <span class="settings-row-label">${escapeHtml(row.label)}</span>
        <span class="settings-chevron" aria-hidden="true">${SETTINGS_GLYPHS.chevron}</span>
      </button>`
      )
      .join("")}</div>`;
}

function renderSettingsSidebar(selectedId, query, catalog) {
  const navButton = (id, label, color, glyph) =>
    `<button type="button" class="settings-nav-item" data-settings-nav="${escapeHtml(id)}" ${
      selectedId === id && !query.trim() ? 'aria-current="page"' : ""
    }>
      ${settingsBadge(color, glyph)}
      <span>${escapeHtml(label)}</span>
    </button>`;
  return `<aside class="settings-sidebar">
    <label class="settings-search">
      <span class="settings-search-icon" aria-hidden="true">${SETTINGS_GLYPHS.search}</span>
      <input type="search" value="${escapeHtml(query)}" placeholder="Search" aria-label="Search skills and tools">
    </label>
    <nav class="settings-nav" aria-label="Skills categories">
      <p class="settings-nav-label">Overview</p>
      ${navButton("tools-all", "All Tools", "#5b6b7a", "wrench")}
      ${navButton("skills-all", "All Skills", "#8a8178", "grid")}
      <p class="settings-nav-label">Tools</p>
      ${catalog.tools
        .map((group) => {
          const meta = toolCategoryMeta(group.name);
          return navButton(settingsNavId("tool", group.name), group.name, meta.color, meta.glyph);
        })
        .join("")}
      <p class="settings-nav-label">Skills</p>
      ${catalog.skillGroups
        .map((group) => {
          const meta = skillCategoryMeta(group.name);
          return navButton(settingsNavId("skill", group.name), group.name, meta.color, meta.glyph);
        })
        .join("")}
    </nav>
  </aside>`;
}

function mountSkills(el) {
  let selectedId = "tools-all";
  let query = "";
  const catalog = settingsCatalog();
  const render = (focusSearch = false) => {
    const pane = query.trim() ? renderSettingsSearch(query, catalog) : renderSettingsCategory(selectedId, catalog);
    el.innerHTML = `<div class="settings-app">
      ${renderSettingsSidebar(selectedId, query, catalog)}
      <section class="settings-pane" tabindex="-1">${pane}</section>
    </div>`;
    const input = el.querySelector(".settings-search input");
    if (focusSearch && input) {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  };
  el.addEventListener("click", (event) => {
    const target = event.target.closest("[data-settings-nav]");
    if (!target) return;
    selectedId = target.dataset.settingsNav;
    query = "";
    render();
  });
  el.addEventListener("input", (event) => {
    if (!event.target.closest(".settings-search input")) return;
    query = event.target.value;
    render(true);
  });
  el.addEventListener("keydown", (event) => {
    if (event.target.matches(".settings-search input")) return;
    const buttons = [...el.querySelectorAll(".settings-nav-item")];
    const current = document.activeElement;
    const index = buttons.indexOf(current);
    if (index < 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      buttons[Math.min(index + 1, buttons.length - 1)]?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      buttons[Math.max(index - 1, 0)]?.focus();
    }
  });
  render();
}

const ICONS = {
  welcome:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/></svg>',
  about:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3"/><path d="M5.5 19c1.2-3 3.4-4.5 6.5-4.5S16.8 16 18 19"/></svg>',
  experience:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/></svg>',
  projects:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h16v11H4z"/><path d="M9 8V6.8A1.8 1.8 0 0 1 10.8 5h2.4A1.8 1.8 0 0 1 15 6.8V8"/></svg>',
  playground:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="15.2" cy="13" r="0.9" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="0.9" fill="currentColor" stroke="none"/></svg>',
  skills:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 3 2.1 6.4H21l-5.3 3.9 2 6.2L12 16.4 6.3 19.5l2-6.2L3 9.4h6.9z"/></svg>',
  contact:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m4 11 8-7 8 7v9H4z"/></svg>',
};

const TRAFFIC_ICONS = {
  close:
    '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.15 3.15l5.7 5.7M8.85 3.15l-5.7 5.7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  min: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.6 6h6.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  expand:
    '<svg class="icon-expand" viewBox="0 0 12 12" aria-hidden="true"><path d="M6.7 2.4h3v3M5.3 9.6h-3v-3M9.7 2.4 7.1 5M2.3 9.6 4.9 7" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  restore:
    '<svg class="icon-restore" viewBox="0 0 12 12" aria-hidden="true"><path d="M7.1 2.3v2.6h2.6M4.9 9.7V7.1H2.3M9.7 4.9 7.3 2.5M2.3 7.1l2.4 2.4" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

function renderProjectTools(project) {
  if (!project.tools?.length) return "";
  return `<p class="tools">Tools · ${project.tools.map(escapeHtml).join(" · ")}</p>`;
}

function renderLinkedText(text) {
  const source = String(text || "");
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let result = "";
  let lastIndex = 0;
  for (const match of source.matchAll(pattern)) {
    result += escapeHtml(source.slice(lastIndex, match.index));
    const label = match[1];
    const href = match[2];
    result += isApprovedPublicResource(href)
      ? `<a class="where-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`
      : escapeHtml(label);
    lastIndex = match.index + match[0].length;
  }
  return result + escapeHtml(source.slice(lastIndex));
}

function renderWhere(item) {
  if (!item.links?.length) return `<p>${escapeHtml(item.where)}</p>`;
  return `<p>${item.links
    .map(
      (link) =>
        `<a class="where-link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
    )
    .join(" & ")}</p>`;
}

function renderTags(tags) {
  return `<p class="tags exp-tags">${tags
    .map((tag) => `<span data-tag="${TAG_SLUGS[tag] || "product"}">${escapeHtml(tag)}</span>`)
    .join("")}</p>`;
}

function renderExperiencePhoto(item) {
  if (!item.photo) return "";
  const caption = item.photoCaption
    ? `<figcaption>${escapeHtml(item.photoCaption)}</figcaption>`
    : "";
  return `<figure class="exp-photo">
    <img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.photoCaption || item.where)}" width="1200" height="800">
    ${caption}
  </figure>`;
}

function renderExperienceDetail(item) {
  const tools = item.tools?.length
    ? `<p class="tools">Tools · ${item.tools.map(escapeHtml).join(" · ")}</p>`
    : "";
  return `${renderWhere(item)}
    ${item.location ? `<p class="where-loc">${escapeHtml(item.location)}</p>` : ""}
    <p class="when">${escapeHtml(item.when)}</p>
    <h2>${escapeHtml(item.title)}</h2>
    ${renderTags(item.tags)}
    <ul class="points">${item.points.map((point) => `<li>${renderLinkedText(point)}</li>`).join("")}</ul>
    ${tools}
    ${renderExperiencePhoto(item)}`;
}

const EXP_PIN_ICON = `<svg class="exp-pin-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g transform="rotate(38 12 12)" fill="currentColor"><circle cx="12" cy="6.1" r="3.15"/><path d="M9.15 8.05c.7 1.55 1.7 3.55 2.85 6.05 1.15-2.5 2.15-4.5 2.85-6.05Z"/><rect x="11.2" y="13.4" width="1.6" height="7.4" rx="0.8"/></g></svg>`;

function renderExperienceNavButton(item, index, selected, pinned) {
  return `<button type="button" class="${pinned ? "exp-pin" : "exp-item"}" data-i="${index}" ${
    index === selected ? 'aria-current="true"' : ""
  }>${pinned ? EXP_PIN_ICON : ""}<span class="co">${escapeHtml(item.where)}</span><span class="role">${escapeHtml(
    item.title
  )}</span></button>`;
}

const EXP_SEARCH_ICON = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="7" cy="7" r="4.4"/><path d="M10.2 10.2 13.4 13.4" stroke-linecap="round"/></svg>`;
const EXP_HEADING_PIN = `<svg class="exp-heading-pin" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><g transform="rotate(38 8 8)" fill="currentColor"><circle cx="8" cy="4.15" r="1.85"/><path d="M6.35 5.3c.4.9 1 2.1 1.65 3.55.65-1.45 1.25-2.65 1.65-3.55Z"/><rect x="7.35" y="8.4" width="1.3" height="4.3" rx="0.65"/></g></svg>`;

function experienceSearchText(item) {
  return [
    item.where,
    item.title,
    item.location,
    item.when,
    ...(item.points || []),
    ...(item.tags || []),
    ...(item.tools || []),
    ...(item.links || []).map((link) => `${link.label} ${link.href}`),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function mountExperience(el) {
  let selected = 0;
  let query = "";
  const win = el.closest(".os-window");
  const bar = win?.querySelector(".os-titlebar");

  const matches = (item) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return experienceSearchText(item).includes(needle);
  };

  const grouped = () => {
    const pinned = [];
    const rest = [];
    experiences.forEach((item, index) => {
      if (!matches(item)) return;
      const entry = { item, index };
      if (PINNED_EXPERIENCE_ORGS.includes(item.where)) pinned.push(entry);
      else rest.push(entry);
    });
    pinned.sort(
      (a, b) => PINNED_EXPERIENCE_ORGS.indexOf(a.item.where) - PINNED_EXPERIENCE_ORGS.indexOf(b.item.where)
    );
    return { pinned, rest };
  };

  const viewingIndex = (pinned, rest) => {
    const ids = [...pinned, ...rest].map((entry) => entry.index);
    if (ids.includes(selected)) return selected;
    return ids[0] ?? selected;
  };

  const ensureSearch = () => {
    if (!bar || bar.querySelector(".exp-title-search")) return;
    const label = document.createElement("label");
    label.className = "exp-title-search";
    label.innerHTML = `<span class="exp-title-search-icon">${EXP_SEARCH_ICON}</span>
      <input type="search" placeholder="Search" aria-label="Search experience" autocomplete="off" spellcheck="false">
      <button type="button" class="exp-title-search-clear" data-exp-clear hidden aria-label="Clear search">×</button>`;
    bar.append(label);
    label.addEventListener("pointerdown", (event) => event.stopPropagation());
    const input = label.querySelector("input");
    const clear = label.querySelector("[data-exp-clear]");
    input.addEventListener("input", () => {
      query = input.value;
      render();
    });
    clear.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      query = "";
      input.value = "";
      input.focus();
      render();
    });
  };

  const render = () => {
    ensureSearch();
    const { pinned, rest } = grouped();
    const viewing = viewingIndex(pinned, rest);
    const input = bar?.querySelector(".exp-title-search input");
    const clear = bar?.querySelector("[data-exp-clear]");
    if (input && input.value !== query) input.value = query;
    if (clear) clear.hidden = !query.trim();
    const empty = !pinned.length && !rest.length;
    el.innerHTML = `<div class="split">
      <div class="split-nav exp-sidebar">
        ${
          pinned.length
            ? `<p class="exp-nav-label exp-pinned-label">${EXP_HEADING_PIN}Pinned</p>
        <div class="exp-pinned">${pinned
          .map(({ item, index }) => renderExperienceNavButton(item, index, viewing, true))
          .join("")}</div>`
            : ""
        }
        ${
          rest.length
            ? `<p class="exp-nav-label exp-pinned-label exp-more-label">More Experience</p>
        <div class="exp-all">${rest
          .map(({ item, index }) => renderExperienceNavButton(item, index, viewing, false))
          .join("")}</div>`
            : ""
        }
        ${empty ? `<p class="exp-empty">No matching experiences</p>` : ""}
      </div>
      <div class="split-pane">${renderExperienceDetail(experiences[viewing])}</div>
    </div>`;
  };
  el.addEventListener("click", (event) => {
    const button = event.target.closest("[data-i]");
    if (!button) return;
    selected = Number(button.dataset.i);
    render();
  });
  render();
}

function isApprovedPublicResource(href) {
  const value = String(href || "").trim();
  if (!value) return false;
  if (/^https?:\/\//i.test(value)) {
    try {
      const host = new URL(value).hostname.toLowerCase();
      if (host.endsWith(".local") || host.includes("intranet") || host.endsWith("nbcuni.com")) return false;
    } catch {
      return false;
    }
    return true;
  }
  if (value.includes("..")) return false;
  return /^(?:\.\/)?(?:assets\/)?[\w./-]+\.(pdf|xlsx|xls|xlsm)$/i.test(value);
}

function isFileDownload(href) {
  const value = String(href || "").trim();
  if (!value || /^https?:\/\//i.test(value)) return false;
  return isApprovedPublicResource(value);
}

function downloadConfirmTitle(href) {
  if (/\.pdf$/i.test(String(href || ""))) return "Download investment recommendation?";
  if (/\.xlsx?m?$/i.test(String(href || ""))) return "Download Excel model?";
  return "Download this file?";
}

function renderDownloadTrigger(href, label, className) {
  const value = String(href || "").trim();
  const name = value.split("/").pop() || "download";
  return `<button type="button" class="${className}" data-download="${escapeHtml(value)}" data-download-name="${escapeHtml(name)}">${escapeHtml(label)}</button>`;
}

function renderCaseResource(href, label, variant) {
  if (isFileDownload(href)) {
    return renderDownloadTrigger(href, `${label} ↗`, `btn ${variant}`);
  }
  if (isApprovedPublicResource(href)) {
    return `<a class="btn ${variant}" href="${escapeHtml(href.trim())}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  }
  return `<button type="button" class="btn ${variant}" disabled>${label} ↗</button>`;
}

function renderCaseResources(project) {
  const platform = project.webPlatformUrl ?? project.platformUrl;
  const presentation = project.presentationUrl;
  if (platform === undefined && presentation === undefined) return "";
  return `<div class="case-resources">
    ${renderCaseResource(platform, "View Web Platform", "btn-accent")}
    ${renderCaseResource(presentation, "View Presentation", "btn-ghost")}
  </div>`;
}

function isLocalProjectImage(src) {
  const value = String(src || "").trim();
  if (!value || value.includes("..")) return false;
  return /^(?:\.\/)?assets\/(?:projects|games)\/[\w./-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(value);
}

function projectImageCandidates(project, includeIcon) {
  const list = includeIcon
    ? [project.iconImage, project.coverImage, project.screenshot, ...(project.screenshots || [])]
    : [project.coverImage, project.screenshot, ...(project.screenshots || [])];
  return [...new Set(list.filter(isLocalProjectImage))];
}

function gameLibraryCoverImages() {
  const ranked = [...games].sort((a, b) => {
    const featuredA = a.inFeaturedSelector === false ? 1 : 0;
    const featuredB = b.inFeaturedSelector === false ? 1 : 0;
    if (featuredA !== featuredB) return featuredA - featuredB;
    return (a.featuredSlot ?? 99) - (b.featuredSlot ?? 99);
  });
  return [...new Set(ranked.map((game) => gameCardSrc(game)).filter(isLocalProjectImage))];
}

function projectGalleryImages(project) {
  if (project.confidential) return [];
  if (project.id === "catalog" || project.id === "medhyaos") return [];
  if (project.id === "gamedev") return gameLibraryCoverImages();
  const shots = [...new Set((project.screenshots || []).filter(isLocalProjectImage))];
  if (shots.length) return shots;
  return [...new Set([project.coverImage, project.screenshot].filter(isLocalProjectImage))];
}

function projectCoverSrc(project) {
  if (project.id === "gamedev" && project.iconImage) {
    return gameLibraryCoverImages()[0] || projectImageCandidates(project)[0] || "";
  }
  return projectImageCandidates(project)[0] || "";
}

function projectSectionMeta(project) {
  return PROJECT_SECTIONS.find((section) => section.id === project.section);
}

function projectCategoryLabel(project) {
  if (project.subtitle) return project.subtitle;
  const section = projectSectionMeta(project);
  if (section) return section.title;
  return (project.categories && project.categories[0]) || "";
}

function projectSearchText(project) {
  return [
    project.title,
    project.subtitle,
    project.summary,
    project.heroLine,
    project.org,
    project.role,
    project.field,
    project.focus,
    ...(project.tags || []),
    ...(project.categories || []),
    ...(project.tools || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function projectFeatureKicker(project) {
  if (project.id === "spotlight") return "Enterprise Product";
  if (project.id === "context") return "AI Product";
  if (project.id === "medhyaos") return "Interactive Portfolio";
  return project.categories?.[0] || projectCategoryLabel(project) || "Featured";
}

function projectActionLabel(project) {
  if (project.comingSoon) return "Coming Soon";
  return "View";
}

function renderConfidentialMark() {
  return `<span class="appstore-confidential">Overview only</span>`;
}

function renderComingSoonMark() {
  return `<span class="appstore-confidential">Coming Soon</span>`;
}

const CONTEXT_MARK =
  '<span class="appstore-context-mark"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 10.5h14.5L34 16v21.5H14z"/><path d="M28.5 10.5V16H34"/><path d="M19 23h10M19 28h10M19 33h6.5"/><circle cx="33.5" cy="34.5" r="5.2"/><path d="m37.2 38.2 3.6 3.6" stroke-linecap="round"/></svg><span>Context AI</span></span>';

function renderProjectArt(project, kind) {
  if (project.placeholder === "context" && kind === "icon") {
    return `<figure class="appstore-art appstore-art-${kind} is-placeholder is-context" aria-hidden="true">${CONTEXT_MARK}</figure>`;
  }
  const src = kind === "icon" ? project.iconImage || projectCoverSrc(project) : projectCoverSrc(project);
  const candidates = projectImageCandidates(project, kind === "icon").join("|");
  const label = escapeHtml(project.title);
  return `<figure class="appstore-art appstore-art-${kind}${src ? "" : " is-placeholder"}" data-art="${escapeHtml(src)}" data-art-fallbacks="${escapeHtml(candidates)}" aria-hidden="true">
    <img alt="">
    <span class="appstore-art-fallback">${label}</span>
  </figure>`;
}

function bindProjectArt(root) {
  root.querySelectorAll("[data-art]").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;
    const queue = [frame.dataset.art, ...(String(frame.dataset.artFallbacks || "").split("|"))].filter(
      (src, index, list) => src && isLocalProjectImage(src) && list.indexOf(src) === index
    );
    const hideFailedShot = () => {
      const shot = frame.closest(".appstore-shot");
      if (!shot) return;
      shot.hidden = true;
      const gallery = shot.closest(".appstore-gallery");
      const preview = shot.closest(".appstore-preview");
      if (gallery && !gallery.querySelector(".appstore-shot:not([hidden])")) {
        if (preview) preview.hidden = true;
        else gallery.hidden = true;
      }
    };
    const tryNext = () => {
      const next = queue.shift();
      if (!next) {
        frame.classList.add("is-placeholder");
        frame.classList.remove("has-art");
        img.removeAttribute("src");
        hideFailedShot();
        return;
      }
      img.src = next;
    };
    img.addEventListener("load", () => {
      if (!img.getAttribute("src")) return;
      frame.classList.add("has-art");
      frame.classList.remove("is-placeholder");
    });
    img.addEventListener("error", tryNext);
    tryNext();
  });
}

function renderProjectRow(project) {
  const line = project.subtitle || projectCategoryLabel(project) || project.summary;
  const action = projectActionLabel(project);
  const tag = project.comingSoon
    ? `<span class="appstore-row-action is-static">${escapeHtml(action)}</span>`
    : `<span class="appstore-row-action">${escapeHtml(action)}</span>`;
  return `<button type="button" class="appstore-row" data-project="${project.id}">
    ${renderProjectArt(project, "icon")}
    <span class="appstore-row-copy">
      <strong>${escapeHtml(project.title)}</strong>
      <span>${escapeHtml(line)}</span>
    </span>
    ${tag}
  </button>`;
}

const APPSTORE_NAV = [
  ["discover", "Discover"],
  ["builds", "0 → 1 Builds"],
  ["research", "Research & Analysis"],
];

const APPSTORE_ICONS = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.2"/><path d="M16 16.4 20.2 20.6" stroke-linecap="round"/></svg>',
  discover:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="m14.7 9.3-1.4 4.1-4.1 1.4 1.4-4.1z" stroke-linejoin="round"/></svg>',
  builds:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19V9.5L12 5l7 4.5V19"/><path d="M9.5 19v-6h5v6"/></svg>',
  research:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19V8.5"/><path d="M5 19h14"/><path d="M9 15v4M13 11v8M17 13v6"/></svg>',
};

const SPOTLIGHT_FEATURE_ICONS = {
  Search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16.5 20 20.5" stroke-linecap="round"/></svg>',
  Trending:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 17 9 11l4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 7h7v7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Following:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M15 18a3 3 0 0 1-6 0"/><path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 6-5.5 6-5.5 10H12C12 15.5 6.5 15.5 6.5 9.5Z" stroke-linejoin="round"/></svg>',
  Saved:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 4h10v16l-5-3.2L7 20V4Z" stroke-linejoin="round"/></svg>',
};

function renderSpotlightCase(project) {
  const kpis = [
    ["Silo Coverage", "Unique resource silos represented on Search or Trending pages."],
    ["Resource Access Speed", "Testers find a relevant resource in under one minute."],
    ["Resource Engagement Rate", "Testers click, save, follow, or open a resource."],
    ["Resource Discovery Rate", "Testers interact with Trending or Following resources."],
    ["Scheduling Efficiency", "Time to add an event to the calendar."],
  ];
  return `<article class="case-detail case-study spotlight-study">
    <section class="case-section">
      <p class="case-num">01 / The Problem</p>
      <h3>Valuable resources existed. Finding them was the challenge.</h3>
      <p>Professional development resources were fragmented across internal platforms, making relevant opportunities hard to find.</p>
      <div class="spotlight-pain">
        <article>
          <p class="spotlight-label">Limited Awareness</p>
          <p>Employees were not always aware of relevant opportunities.</p>
        </article>
        <article>
          <p class="spotlight-label">Time Constraints</p>
          <p>Finding resources across multiple platforms required time and effort.</p>
        </article>
      </div>
      <blockquote class="spotlight-quote">
        <p>How might we help employees find the right growth resources faster and with less effort?</p>
      </blockquote>
    </section>
    <section class="case-section">
      <p class="case-num">02 / Discovery &amp; Insights</p>
      <h3>Understanding the problem through research.</h3>
      <div class="spotlight-split">
        <p class="spotlight-stat"><span>20+</span> Employees surveyed</p>
        <p>I analyzed existing resource engagement and surveyed employees to understand how they discovered growth opportunities and where the process broke down.</p>
      </div>
      <div class="spotlight-pain">
        <article>
          <p class="spotlight-label">Finding 01</p>
          <p>Limited awareness of available resources.</p>
        </article>
        <article>
          <p class="spotlight-label">Finding 02</p>
          <p>Insufficient time to search across platforms.</p>
        </article>
      </div>
      <p class="spotlight-insight">The opportunity wasn't creating more content. It was making existing resources easier to discover.</p>
    </section>
    <section class="case-section">
      <p class="case-num">03 / Product Strategy &amp; MVP</p>
      <h3>One destination. Multiple ways to discover.</h3>
      <p>I helped define Spotlight as a centralized resource-discovery platform built around four MVP features.</p>
      <div class="feature-grid spotlight-features">
        <div class="feature-card">${SPOTLIGHT_FEATURE_ICONS.Search}<strong>Search</strong><span>Find relevant resources quickly.</span></div>
        <div class="feature-card">${SPOTLIGHT_FEATURE_ICONS.Trending}<strong>Trending</strong><span>Discover popular opportunities.</span></div>
        <div class="feature-card">${SPOTLIGHT_FEATURE_ICONS.Following}<strong>Following</strong><span>Stay updated on selected sources.</span></div>
        <div class="feature-card">${SPOTLIGHT_FEATURE_ICONS.Saved}<strong>Saved</strong><span>Revisit resources later.</span></div>
      </div>
      <p class="spotlight-note">Prioritized intuitive discovery and resource access over more complex personalization.</p>
      <p class="spotlight-meta">Design &amp; Requirements · Product requirements, functional specifications, and user flows in Figma and Miro.</p>
    </section>
    <section class="case-section">
      <p class="case-num">04 / Prototype &amp; Validation</p>
      <h3>From requirements to a working prototype.</h3>
      <p class="spotlight-label">Spec-Driven Development</p>
      <ol class="spotlight-flow">
        <li>Framing</li>
        <li>Requirements</li>
        <li>Spec Doc</li>
        <li>Technical Design</li>
        <li>Verification &amp; Delivery</li>
      </ol>
      <p>I translated research and stakeholder needs into structured product requirements and specifications.</p>
      <div class="spotlight-pair">
        <article>
          <p class="spotlight-label">Technical Feasibility</p>
          <p>I collaborated with design and engineering to assess product tradeoffs against technical constraints, not to implement the architecture myself.</p>
          <ul>
            <li>Resource aggregation and API feasibility</li>
            <li>Data availability and metadata</li>
            <li>Authentication and permissions</li>
            <li>Integration constraints</li>
            <li>Prototype versus production requirements</li>
          </ul>
        </article>
        <article>
          <p class="spotlight-label">AI-Assisted Discovery &amp; Copilot Studio</p>
          <p>Evaluated AI-assisted search relevance and usability, identifying opportunities to improve resource discovery.</p>
          <p>Microsoft Copilot Studio was considered as a potential experimentation approach for conversational search, knowledge retrieval, and fallback handling. It was not integrated into the prototype.</p>
        </article>
      </div>
    </section>
    <section class="case-section case-section-last">
      <p class="case-num">05 / Success Metrics &amp; Outcomes</p>
      <h3>Defining success and what comes next.</h3>
      <p class="spotlight-label">Proposed Success Targets</p>
      <div class="spotlight-kpis">
        ${kpis
          .map(
            ([name, definition]) =>
              `<article><p class="spotlight-kpi-name">${escapeHtml(name)}</p><p>${escapeHtml(definition)}</p></article>`
          )
          .join("")}
      </div>
      <p class="spotlight-label">Outcomes</p>
      <ul class="spotlight-outcomes">
        <li>Working prototype</li>
        <li>Product requirements and technical approach</li>
        <li>Roadmap and leadership presentation</li>
      </ul>
      <p>I presented our research, product direction, and recommendations to NBCUniversal technology leaders.</p>
      <blockquote class="spotlight-quote">
        <p>Effective product management isn't about building more features. It's about understanding the user problem, making deliberate tradeoffs, and defining how to measure success.</p>
      </blockquote>
    </section>
  </article>`;
}

function renderMedhyaosCase() {
  return `<article class="case-detail case-study">
    <section class="case-section">
      <p class="case-num">01 / The Opportunity</p>
      <h3>A portfolio should demonstrate how I think, not just describe what I’ve done.</h3>
      <p>Traditional portfolio websites often rely on static pages and linear navigation. I wanted to create something that reflected my interests in product management, technology, and game development while giving visitors a more interactive way to explore my work.</p>
      <p class="case-challenge"><strong>The challenge:</strong> How might I turn a personal portfolio into an engaging, intuitive product experience without sacrificing usability?</p>
    </section>
    <section class="case-section">
      <p class="case-num">02 / Product Strategy</p>
      <h3>Designing around exploration and discoverability.</h3>
      <p>I chose a desktop operating system as the central design concept because it provides a familiar interaction model while allowing different parts of my background to exist as independent applications.</p>
      <p>The experience is organized around:</p>
      <div class="feature-grid">
        <div class="feature-card"><strong>Experience</strong><span>My professional background and responsibilities. Inspired by Notepad: a focused list of roles with a readable detail pane.</span></div>
        <div class="feature-card"><strong>Projects</strong><span>Product builds, research, and analysis. Inspired by the macOS App Store: featured editorial, sidebar discovery, and case-study listings.</span></div>
        <div class="feature-card"><strong>Game Library</strong><span>Games and interactive experiences I’ve created. Inspired by the Epic Games Store: featured artwork, discovery, and a curated collection.</span></div>
        <div class="feature-card"><strong>About Me</strong><span>My background, interests, and story. Inspired by macOS Terminal: a command prompt that reveals the profile after typing about.</span></div>
        <div class="feature-card"><strong>Skills</strong><span>The tools and technologies I work with. Inspired by macOS System Settings: a searchable sidebar, grouped categories, and a detail pane.</span></div>
        <div class="feature-card"><strong>Contact</strong><span>How to reach me. Inspired by macOS Messages (iMessage): a conversation list, chat bubbles, and a composer.</span></div>
      </div>
      <p>The goal was to balance creative expression with straightforward navigation so visitors could explore freely or quickly find the information they needed.</p>
    </section>
    <section class="case-section">
      <p class="case-num">03 / Design &amp; Development</p>
      <h3>Turning the concept into a functional interface.</h3>
      <p>I designed MedhyaOS around a macOS-inspired desktop experience, incorporating familiar interface patterns such as application icons, draggable windows, a dock, and a menu bar.</p>
      <p class="case-num tech-label">App inspirations</p>
      <p>Each application borrows a familiar interaction model so visitors can orient quickly, then adapts that model to MedhyaOS’s visual system.</p>
      <div class="feature-grid">
        <div class="feature-card"><strong>Desktop</strong><span>macOS windows, dock, menu bar, and desktop icons.</span></div>
        <div class="feature-card"><strong>About Me</strong><span>macOS Terminal: a shell prompt where typing about reveals the portrait, biography, and Featured Apps.</span></div>
        <div class="feature-card"><strong>Experience</strong><span>Notepad: a simple list of entries with a clean reading surface for each role.</span></div>
        <div class="feature-card"><strong>Projects</strong><span>macOS App Store: featured banner, sidebar discovery, and product listings that open case studies.</span></div>
        <div class="feature-card"><strong>Game Library</strong><span>Epic Games Store: featured banner, sidebar discovery, and cover-driven browsing.</span></div>
        <div class="feature-card"><strong>Skills</strong><span>macOS System Settings: searchable sidebar, category navigation, and grouped rows for tools and skills.</span></div>
        <div class="feature-card"><strong>Contact</strong><span>macOS Messages (iMessage): sidebar conversations, message bubbles, and a composer that opens email.</span></div>
      </div>
      <p>Key design and interaction decisions included:</p>
      <ul class="case-list">
        <li><strong>Window-based navigation:</strong> Visitors can open and explore different sections without leaving the desktop.</li>
        <li><strong>Consistent design system:</strong> Warm espresso backgrounds, cream typography, and terracotta accents create a cohesive visual identity.</li>
        <li><strong>Light and dark modes:</strong> Support different viewing preferences while maintaining visual consistency.</li>
        <li><strong>Responsive layouts:</strong> Adapt the experience to different screen sizes and window dimensions.</li>
        <li><strong>Reusable components:</strong> Maintain consistent interactions and styling across applications.</li>
      </ul>
      <p class="case-num tech-label">Technology &amp; Tools</p>
      <p>Built with HTML, CSS, and JavaScript using a lightweight, framework-free architecture. Developed with Cursor for AI-assisted coding and iteration, with browser-based storage for persistent theme preferences. Designed as a responsive, interactive web experience.</p>
      <div class="tech-groups">
        <div class="tech-group">
          <p class="tech-group-label">Hosting</p>
          <p class="tech-chips"><span>Deployment planned.</span></p>
        </div>
      </div>
      <div class="token-board" aria-label="MedhyaOS color palette">
        <span class="token" style="background:var(--bg)" title="Background"></span>
        <span class="token" style="background:var(--paper)" title="Window"></span>
        <span class="token" style="background:var(--ink)" title="Ink"></span>
        <span class="token" style="background:var(--muted)" title="Muted"></span>
        <span class="token" style="background:var(--accent)" title="Accent"></span>
      </div>
      <p>Headlines use Georgia / Iowan Old Style. Interface and body copy use Avenir Next / Segoe UI.</p>
    </section>
    <section class="case-section">
      <p class="case-num">04 / Iteration &amp; Tradeoffs</p>
      <h3>Balancing personality with usability.</h3>
      <p>One of the central design challenges was creating an experience that felt distinctive without making it harder for visitors to find information.</p>
      <p>I explored different approaches to the Home screen, navigation, and project organization before settling on a more focused structure.</p>
      <p>Key decisions included:</p>
      <ul class="case-list">
        <li>Keeping desktop applications as the primary navigation model.</li>
        <li>Introducing Featured Apps on Home to guide first-time visitors.</li>
        <li>Organizing Projects into 0 → 1 Builds and Research &amp; Analysis.</li>
        <li>Giving game development its own dedicated Game Library.</li>
        <li>Using consistent project detail views to make deeper work easy to explore.</li>
      </ul>
      <p>These decisions reflect an iterative approach to simplifying navigation while preserving the personality of the original concept.</p>
    </section>
    <section class="case-section case-section-last">
      <p class="case-num">05 / Outcomes &amp; Learnings</p>
      <h3>A portfolio that is also a product.</h3>
      <p>MedhyaOS brings together my professional experience, product case studies, technical projects, and game development work in one interactive environment.</p>
      <p>Building it has given me hands-on experience translating a product vision into interface requirements, making design tradeoffs, implementing features, and iterating on the user experience.</p>
      <p><strong>My biggest takeaway:</strong> Building a compelling product requires more than an interesting concept. Every interaction should serve a purpose, and creativity is most effective when it makes the experience more intuitive.</p>
    </section>
  </article>`;
}

function renderGamedevCase(project) {
  const playtest = isApprovedPublicResource(project.playtestUrl)
    ? `<p class="case-ext"><a class="where-link" href="${escapeHtml(project.playtestUrl.trim())}" target="_blank" rel="noopener noreferrer">About NYU Playtest Thursdays</a></p>`
    : "";
  return `<article class="case-detail case-study">
    <section class="case-section">
      <p class="case-num">01 / The Opportunity</p>
      <h3>Great ideas only become great experiences when people interact with them.</h3>
      <p>Game development gave me a way to explore the intersection of creativity, technology, and user experience.</p>
      <p>I’ve designed and developed 27 game prototypes across genres including narrative, action, card games, RPGs, and simulation. A selection of those games is displayed in the Game Library.</p>
      <p>Each project presented a different challenge: translating an initial concept into an experience that players could understand, engage with, and enjoy.</p>
      <p class="case-challenge"><strong>The challenge:</strong> How might I turn an idea into an intuitive, engaging experience through rapid prototyping and continuous iteration?</p>
    </section>
    <section class="case-section">
      <p class="case-num">02 / Prototyping &amp; Development</p>
      <h3>Building quickly to test ideas early.</h3>
      <p>I used tools including GameMaker and Unity to translate game concepts into functional prototypes.</p>
      <p>My process involved:</p>
      <ul class="case-list">
        <li>Defining the core gameplay concept and player experience.</li>
        <li>Identifying the most important mechanics.</li>
        <li>Building a playable minimum viable prototype.</li>
        <li>Experimenting with controls, interactions, progression, and feedback.</li>
        <li>Refining the experience through successive iterations.</li>
      </ul>
      <p>Rather than building every feature upfront, I focused on validating the core gameplay loop before expanding the experience.</p>
    </section>
    <section class="case-section">
      <p class="case-num">03 / User Testing &amp; Feedback</p>
      <h3>Designing for players, not just for myself.</h3>
      <p>Playtesting was an important part of my development process.</p>
      <p>Through opportunities such as NYU Game Center’s Playtest Thursdays, I could put work-in-progress games in front of other players and designers to gather feedback.</p>
      <p>Playtest Thursdays provides an environment where developers can share early-stage games, observe gameplay, discuss mechanics, and identify opportunities to improve the experience.</p>
      <p>This helped me think about games from the player’s perspective rather than relying solely on my own assumptions.</p>
      <p>I focused on questions such as:</p>
      <ul class="case-list">
        <li>Can players understand the objective without extensive instructions?</li>
        <li>Are the controls and mechanics intuitive?</li>
        <li>Where do players get confused or frustrated?</li>
        <li>What makes the experience engaging?</li>
        <li>Which changes would most improve the next iteration?</li>
      </ul>
      <p><strong>Key insight:</strong> A feature working as intended doesn’t necessarily mean players experience it as intended.</p>
      ${playtest}
    </section>
    <section class="case-section">
      <p class="case-num">04 / Iteration &amp; Product Decisions</p>
      <h3>Turning feedback into better experiences.</h3>
      <p>I approached game development as an iterative process of building, testing, learning, and refining.</p>
      <p>Player feedback helped inform decisions about mechanics, usability, difficulty, pacing, and overall game flow.</p>
      <p>Rather than treating every suggestion as a feature request, I focused on identifying the underlying problem and considering which changes would have the greatest impact on the player experience.</p>
      <p>This required balancing:</p>
      <div class="feature-grid">
        <div class="feature-card"><strong>Experience vs. complexity</strong><span>Player experience versus technical complexity.</span></div>
        <div class="feature-card"><strong>Scope vs. time</strong><span>Feature scope versus development time.</span></div>
        <div class="feature-card"><strong>Vision vs. usability</strong><span>Creative vision versus usability.</span></div>
        <div class="feature-card"><strong>New vs. refine</strong><span>New features versus refinement of existing mechanics.</span></div>
      </div>
      <p>The goal was not simply to add more functionality, but to make the core experience stronger.</p>
    </section>
    <section class="case-section case-section-last">
      <p class="case-num">05 / Outcomes &amp; Learnings</p>
      <h3>Building games taught me to think like a product manager.</h3>
      <p>Across 27 prototypes, I gained hands-on experience translating ambiguous ideas into tangible products, making design decisions, and improving experiences through iteration.</p>
      <p>Game development reinforced several principles that apply directly to product management:</p>
      <ul class="case-list">
        <li>Build early to test assumptions.</li>
        <li>Observe how users actually behave.</li>
        <li>Prioritize problems rather than individual feature requests.</li>
        <li>Make tradeoffs between scope, complexity, and value.</li>
        <li>Iterate based on feedback rather than intuition alone.</li>
      </ul>
      <p><strong>My biggest takeaway:</strong> Building a successful experience isn’t just about making something functional. It’s about understanding how people interact with it and continuously improving the parts that matter most.</p>
    </section>
  </article>`;
}

const VALUATION_FLOW = [
  ["Historical Earnings", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v4M12 11v8M16 8v11"/></svg>'],
  ["Revenue Forecast", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 16 10 10l4 4 6-8" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
  ["Valuation", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="7"/><path d="M12 8v8M9.5 10.5h3.2a1.8 1.8 0 0 1 0 3.6H9.5"/></svg>'],
  ["Capital Structure", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 4v16"/><path d="M6 9h12M6 15h12"/></svg>'],
  ["Investment Returns", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 16h14M8 16V8M12 16V6M16 16v-4" stroke-linecap="round"/></svg>'],
];

function renderCatalogSupportCard(href, title, copy, action, icon, variant) {
  return `<article class="support-card">
    <span class="support-card-icon" aria-hidden="true">${icon}</span>
    <h4>${escapeHtml(title)}</h4>
    <p>${escapeHtml(copy)}</p>
    ${renderCaseResource(href, action, variant)}
  </article>`;
}

function renderCatalogCase(project) {
  const sheetIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="1.6"/><path d="M4 9.2h16M4 14.8h16M9.2 4v16M14.8 4v16"/></svg>';
  const docIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 3.5h7.2L19 8.2V20.5H7z"/><path d="M14 3.5V8h5"/><path d="M9.4 12.4h5.2M9.4 15.5h5.2M9.4 18.5h3.2"/></svg>';
  return `<article class="case-detail case-study">
    <section class="case-section">
      <p class="case-num">01 / The Investment Question</p>
      <h3>Turning future royalties into an investment decision.</h3>
      <p>Music catalogs generate income through streaming, publishing, licensing, and other royalty sources. For investors, their value depends not only on historical earnings but also on the durability and growth potential of future cash flows.</p>
      <p>The objective was to evaluate a hypothetical music catalog acquisition and determine how purchase price, revenue growth, financing, and exit assumptions influence investment returns.</p>
      <p class="case-challenge"><strong>The central question:</strong> How much should an investor pay for a music catalog, and under what assumptions would the acquisition generate an attractive return?</p>
    </section>
    <section class="case-section">
      <p class="case-num">02 / Valuation Methodology</p>
      <h3>Building a financial framework for acquisition analysis.</h3>
      <p>I developed an Excel-based financial model to evaluate the catalog through multiple valuation approaches.</p>
      <p>The analysis included:</p>
      <ul class="case-list">
        <li><strong>Cash Flow Forecasting:</strong> Projected future catalog earnings using revenue growth assumptions.</li>
        <li><strong>Discounted Cash Flow (DCF):</strong> Evaluated the present value of projected cash flows using a risk-adjusted discount rate.</li>
        <li><strong>Valuation Multiples:</strong> Applied enterprise value-to-earnings multiples to estimate acquisition and exit values.</li>
        <li><strong>Capital Structure:</strong> Examined the effect of debt and equity financing on investor returns.</li>
        <li><strong>IRR Analysis:</strong> Compared unlevered asset returns with levered equity returns.</li>
      </ul>
      <p>Together, these methods provided a framework for evaluating both the underlying asset and the proposed investment structure.</p>
      <p class="case-num tech-label">The Valuation Framework</p>
      <ol class="valuation-flow">
        ${VALUATION_FLOW.map(
          ([label, icon]) =>
            `<li class="valuation-step">${icon}<span>${escapeHtml(label)}</span></li>`
        ).join("")}
      </ol>
      <div class="feature-grid">
        <div class="feature-card"><strong>DCF</strong><span>Present value of projected cash flows.</span></div>
        <div class="feature-card"><strong>Valuation Multiples</strong><span>Acquisition and exit pricing relative to earnings.</span></div>
        <div class="feature-card"><strong>IRR</strong><span>Annualized investment returns.</span></div>
      </div>
    </section>
    <section class="case-section">
      <p class="case-num">03 / Scenario &amp; Sensitivity Analysis</p>
      <h3>Understanding what drives value and what creates risk.</h3>
      <p>Rather than relying on a single forecast, I explored how changes in assumptions could affect valuation and investment performance.</p>
      <p>Key variables included:</p>
      <ul class="case-list">
        <li>Catalog revenue growth and decline.</li>
        <li>Discount rates and required returns.</li>
        <li>Acquisition and exit valuation multiples.</li>
        <li>Debt financing and leverage.</li>
        <li>Opportunities for incremental licensing and monetization.</li>
      </ul>
      <p>I also considered potential upside scenarios involving synchronization licensing and fan-focused monetization strategies.</p>
      <p>The objective was to identify which assumptions had the greatest influence on valuation and where an investor could face downside risk.</p>
      <p><strong>Key insight:</strong> A compelling catalog can still be an unattractive investment if the acquisition price already assumes aggressive future growth.</p>
    </section>
    <section class="case-section">
      <p class="case-num">04 / Investment Analysis</p>
      <h3>Separating asset performance from financing effects.</h3>
      <p>A central part of the analysis was distinguishing the catalog’s underlying investment performance from the returns generated by its financing structure.</p>
      <p>I compared:</p>
      <ul class="case-list">
        <li><strong>Unlevered returns:</strong> The investment’s performance independent of financing.</li>
        <li><strong>Levered returns:</strong> Equity investor returns after incorporating debt financing.</li>
        <li><strong>Entry and exit valuations:</strong> How acquisition pricing and exit assumptions influence profitability.</li>
        <li><strong>Cash flow and risk:</strong> How forecast performance affects the ability to support financing obligations.</li>
      </ul>
      <p>This helped illustrate why leverage can increase potential equity returns while also increasing financial risk.</p>
      <p>The analysis emphasized evaluating the quality of the asset separately from the attractiveness of the financing structure.</p>
    </section>
    <section class="case-section">
      <p class="case-num">05 / Findings &amp; Learnings</p>
      <h3>Valuation is ultimately an exercise in understanding assumptions.</h3>
      <p>The project demonstrated how financial modeling can translate royalty income expectations into an investment framework.</p>
      <p>By combining DCF analysis, valuation multiples, and return modeling, I explored how acquisition pricing, growth expectations, and capital structure influence investment outcomes.</p>
      <p>The most important learning was that valuation is not simply about arriving at a single number. It is about understanding the assumptions behind that number, identifying key risks, and evaluating whether an investment can meet its required return.</p>
      <p><strong>My biggest takeaway:</strong> A strong investment decision depends as much on understanding what could go wrong as it does on forecasting what could go right.</p>
    </section>
    <section class="case-section case-section-last">
      <p class="case-num">Supporting Materials</p>
      <h3>Explore the financial model and investment analysis behind this project.</h3>
      <div class="support-grid">
        ${renderCatalogSupportCard(
          project.financialModelUrl,
          "Financial Model",
          "Explore the Excel model, including revenue forecasts, DCF valuation, financing assumptions, levered and unlevered IRR, and sensitivity analysis.",
          "View Excel Model",
          sheetIcon,
          "btn-accent"
        )}
        ${renderCatalogSupportCard(
          project.investmentAnalysisUrl,
          "Investment Recommendation",
          "Read the investment thesis, valuation methodology, key findings, risk assessment, and investment recommendation.",
          "View Investment Recommendation",
          docIcon,
          "btn-ghost"
        )}
      </div>
    </section>
  </article>`;
}

function renderContextCase(project) {
  const live = isApprovedPublicResource(project.liveUrl)
    ? `<p class="case-ext"><a class="where-link" href="${escapeHtml(project.liveUrl.trim())}" target="_blank" rel="noopener noreferrer">View live product</a></p>`
    : "";
  const stack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Supabase Auth",
    "Supabase Storage",
    "pgvector",
    "OpenAI API",
    "PDF.js",
    "Vercel",
    "GitHub",
    "Git",
    "Cursor",
  ];
  return `<article class="case-detail case-study">
    <section class="case-section">
      <p class="case-num">01 / The Problem</p>
      <h3>Research is scattered. AI answers are easy to over-trust.</h3>
      <p>Students move between PDFs, notes, search, and chat tools. Finding the passage that supports a claim is slow, and comparing conflicting papers is slower.</p>
      <p>General AI chat can sound complete even when the source never established the claim. The product problem was trust, not fluency.</p>
    </section>
    <section class="case-section">
      <p class="case-num">02 / User Research &amp; Discovery</p>
      <h3>Interviews and usability tests shaped what to ship.</h3>
      <p>I ran student interviews and usability tests during development.</p>
      <p class="spotlight-label">Key insights</p>
      <ul class="case-list">
        <li>Research was fragmented across PDFs, notes, tabs, and AI chat, so work needed one project library.</li>
        <li>Trust depended on the passage: students wanted to check AI claims against a specific source, not a fluent summary.</li>
        <li>Long explanations and dense evidence panels hid the finding, and prior questions were hard to reopen.</li>
      </ul>
      <p class="spotlight-label">From insights to product</p>
      <p>That research drove project-based PDF organization, semantic retrieval with source-linked answers, and evidence verdicts (supported, contradicted, or insufficient) so disagreement is distinct from a lack of evidence. Research history keeps questions persistent. Navigation and evidence copy were simplified so the verdict is visible first.</p>
    </section>
    <section class="case-section">
      <p class="case-num">03 / Product Strategy &amp; MVP</p>
      <h3>Make the evidence as visible as the answer.</h3>
      <p>The value proposition is narrow: AI-assisted research should be transparent, source-grounded, and verifiable. The first users are students working with academic PDFs, not anyone who wants a general assistant.</p>
      <p>If a feature did not help someone inspect evidence, it waited. The MVP is four jobs.</p>
      <div class="feature-grid">
        <div class="feature-card"><strong>Research</strong><span>Ask questions across uploaded PDFs and get cited answers.</span></div>
        <div class="feature-card"><strong>Evidence</strong><span>Check whether passages support, contradict, or fall short.</span></div>
        <div class="feature-card"><strong>Contradictions</strong><span>Compare documents without treating every difference as conflict.</span></div>
        <div class="feature-card"><strong>Documents</strong><span>Project libraries, text extraction, embeddings, original PDFs.</span></div>
      </div>
    </section>
    <section class="case-section">
      <p class="case-num">04 / Building the Product</p>
      <h3>Retrieve first, then verify the claim.</h3>
      <p>I used retrieval-augmented generation so answers have to come from uploaded documents, not the model’s prior knowledge. Semantic search finds passages by meaning, which helps when a student remembers an idea but not the page.</p>
      <p>A second layer checks citations with lexical safeguards and model-assisted entailment, because word overlap is not support. Evidence labels also separate theoretical support from empirical proof. Libraries are private to the signed-in user, and a source inspector can open the original PDF page.</p>
      <p class="spotlight-label">Tech stack</p>
      <p class="context-stack">${stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</p>
    </section>
    <section class="case-section">
      <p class="case-num">05 / Iteration &amp; Launch</p>
      <h3>Verification got stricter. The interface got quieter.</h3>
      <p>Early answers sometimes paraphrased ideas the sources did not support. Citation checks needed more than shared vocabulary, and evidence copy repeated itself. I tightened validation, shortened verdicts, and made passages expandable. Project navigation and research history were refined, then I deployed the MVP on Vercel.</p>
    </section>
    <section class="case-section case-section-last">
      <p class="case-num">06 / What's Next</p>
      <h3>From MVP to a smarter research experience.</h3>
      <p>The next phase of Context AI will focus on expanding its capabilities and refining the research experience. Planned improvements include more precise citation verification, stronger claim classification, and faster document retrieval.</p>
      <p>Future iterations will also incorporate student feedback to make research workflows more intuitive, with the long-term goal of building a reliable AI research companion that helps students move from information to evidence-backed insights.</p>
      ${live}
    </section>
  </article>`;
}

function renderProjectDetail(project) {
  if (project.layout === "spotlight") return renderSpotlightCase(project);
  if (project.layout === "context") return renderContextCase(project);
  if (project.layout === "medhyaos") return renderMedhyaosCase(project);
  if (project.layout === "gamedev") return renderGamedevCase(project);
  if (project.layout === "catalog") return renderCatalogCase(project);
  const research = project.section === "research";
  const cells = research
    ? [
        ["Research question", project.problem],
        ["Methodology", project.bet],
        ["Key findings", project.insight],
        ["Implications", project.next],
      ]
    : [
        ["Problem", project.problem],
        ["Insight", project.insight],
        ["Process", project.bet],
        ["Validation & next", project.next],
      ];
  return `<div class="case-detail">
    ${renderCaseResources(project)}
    <div class="case-grid">${cells
      .map(([label, copy]) => `<div><h4>${escapeHtml(label)}</h4><p>${escapeHtml(copy)}</p></div>`)
      .join("")}</div>
  </div>`;
}

function renderFeaturedProject(project) {
  return `<button type="button" class="appstore-featured${project.confidential ? " is-confidential" : ""}" data-project="${project.id}">
    <div class="appstore-featured-copy">
      <p class="appstore-kicker">${escapeHtml(projectFeatureKicker(project))}</p>
      <h3>${escapeHtml(project.title)}</h3>
      <p class="appstore-featured-desc">${escapeHtml(project.heroLine || project.summary)}</p>
      ${project.confidential ? renderConfidentialMark() : ""}
      ${project.comingSoon ? renderComingSoonMark() : ""}
    </div>
    ${renderProjectArt(project, "hero")}
  </button>`;
}

function renderFeaturedPair() {
  const featured = ["spotlight", "context"]
    .map((id) => projects.find((item) => item.id === id))
    .filter(Boolean);
  if (!featured.length) return "";
  return `<div class="appstore-heroes">${featured.map(renderFeaturedProject).join("")}</div>`;
}

function renderProjectGallery(project) {
  const shots = projectGalleryImages(project);
  if (!shots.length) return "";
  const many = shots.length > 1;
  return `<section class="appstore-preview" aria-label="Screenshots">
    ${many ? `<button type="button" class="appstore-preview-nav is-prev" data-gallery-prev aria-label="Previous screenshots">‹</button>` : ""}
    <div class="appstore-gallery${project.id === "gamedev" ? " is-covers" : ""}" data-gallery-track>
      ${shots
        .map(
          (src, index) =>
            `<button type="button" class="appstore-shot" data-lightbox="${escapeHtml(src)}" aria-label="Enlarge screenshot ${index + 1} of ${shots.length}">
              ${renderProjectArt({ ...project, coverImage: src, screenshot: "", screenshots: [], iconImage: "", placeholder: "" }, "shot")}
            </button>`
        )
        .join("")}
    </div>
    ${many ? `<button type="button" class="appstore-preview-nav is-next" data-gallery-next aria-label="Next screenshots">›</button>` : ""}
  </section>`;
}

function renderAppStoreFacts(project) {
  const section = projectSectionMeta(project);
  const cells = [
    ["Category", section?.title || ""],
    ["Field", project.field || ""],
    ["My Role", project.myRole || project.role || ""],
    ["Project Type", project.projectType || project.org || ""],
    ["Year", project.year || ""],
  ].filter(([, value]) => value);
  if (!cells.length) return "";
  return `<dl class="appstore-facts">${cells
    .map(
      ([label, value]) =>
        `<div class="appstore-fact"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`
    )
    .join("")}</dl>`;
}

function renderAppStoreGet(href, label) {
  if (isFileDownload(href)) {
    return renderDownloadTrigger(href, label, "appstore-get");
  }
  if (isApprovedPublicResource(href)) {
    return `<a class="appstore-get" href="${escapeHtml(href.trim())}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  }
  return `<button type="button" class="appstore-get" disabled>${escapeHtml(label)}</button>`;
}

function renderAppStoreAction(project) {
  if (project.confidential) {
    return `<span class="appstore-get is-locked">Confidential · Overview Only</span>`;
  }
  if (project.liveUrl) {
    return renderAppStoreGet(project.liveUrl, "Explore ↗");
  }
  if (project.comingSoon) {
    return `<span class="appstore-get is-locked">In Development</span>`;
  }
  if (project.id === "medhyaos") {
    return `<button type="button" class="appstore-get" data-open="about">Explore ↗</button>`;
  }
  if (project.id === "gamedev") {
    return `<button type="button" class="appstore-get" data-open="playground">Explore ↗</button>`;
  }
  if (project.id === "catalog") {
    return `<div class="appstore-gets">
      ${renderAppStoreGet(project.financialModelUrl, "Excel Model ↗")}
      ${renderAppStoreGet(project.investmentAnalysisUrl, "Investment Recommendation ↗")}
    </div>`;
  }
  return "";
}

function renderAppStoreAbout(project) {
  const copy = project.lede || project.summary;
  if (!copy) return "";
  const paragraphs = String(copy)
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return `<section class="appstore-about">
    <h2>About This Project</h2>
    ${paragraphs.map((part) => `<p>${escapeHtml(part)}</p>`).join("")}
    ${
      project.confidential
        ? `<p class="appstore-about-note">Project materials and presentation are not publicly available.</p>`
        : ""
    }
  </section>`;
}

function renderAppStoreDetail(project) {
  return `<article class="appstore-detail">
    <button type="button" class="appstore-back" data-back aria-label="Back">${APPSTORE_ICONS.back}</button>
    <header class="appstore-product">
      ${renderProjectArt(project, "icon")}
      <div class="appstore-product-copy">
        <h1>${escapeHtml(project.title)}</h1>
        <p class="appstore-product-summary">${escapeHtml(project.subtitle || "")}</p>
        ${renderAppStoreAction(project)}
        ${renderProjectTools(project)}
      </div>
    </header>
    ${renderAppStoreFacts(project)}
    ${renderProjectGallery(project)}
    ${renderAppStoreAbout(project)}
    <div class="appstore-case">${renderProjectDetail(project)}</div>
  </article>`;
}

function mountProjects(el) {
  let nav = "discover";
  let query = "";
  let openId = null;
  let listingScroll = 0;
  let lightboxIndex = -1;
  let lightboxShots = [];
  let pendingDownload = null;

  const matchesQuery = (project) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return projectSearchText(project).includes(needle);
  };

  const visibleInSection = (sectionId) =>
    projects.filter((project) => {
      if (project.section !== sectionId) return false;
      if (!query.trim() && nav !== "discover" && nav !== sectionId) return false;
      return matchesQuery(project);
    });

  const renderSection = (section) => {
    if (!query.trim() && nav !== "discover" && nav !== section.id) return "";
    const list = visibleInSection(section.id);
    if (query.trim() && !list.length) return "";
    return `<section class="project-section" id="project-section-${section.id}">
      ${
        nav === "discover"
          ? `<header class="appstore-section-head">
        <h3 class="project-section-title">${escapeHtml(section.title)}</h3>
        <button type="button" class="appstore-see-all" data-nav="${section.id}">See All</button>
      </header>`
          : ""
      }
      <div class="appstore-rows">${list.map(renderProjectRow).join("") || `<p class="project-empty">Nothing in this section yet.</p>`}</div>
    </section>`;
  };

  const pageTitle = () => {
    if (openId) {
      const project = projects.find((item) => item.id === openId);
      return project ? project.title : "Projects";
    }
    if (query.trim()) return "Search";
    const item = APPSTORE_NAV.find(([id]) => id === nav);
    return item ? item[1] : "Projects";
  };

  const setWindowTitle = () => {
    const title = el.closest(".os-window")?.querySelector(".os-title");
    if (title) title.textContent = pageTitle();
  };

  const listingHtml = () => {
    const searching = Boolean(query.trim());
    if (searching) {
      const list = projects.filter(matchesQuery);
      return `<div class="appstore-search-results">
        ${list.length ? `<div class="appstore-rows">${list.map(renderProjectRow).join("")}</div>` : `<p class="project-empty">No projects match that search.</p>`}
      </div>`;
    }
    const category = nav !== "discover" ? PROJECT_SECTIONS.find((section) => section.id === nav) : null;
    const heading = category
      ? `<header class="appstore-cat-head">
          <h2>${escapeHtml(category.title)}</h2>
          <p>${escapeHtml(category.subtitle)}</p>
        </header>`
      : "";
    return `${heading}
      ${nav === "discover" ? renderFeaturedPair() : ""}
      ${PROJECT_SECTIONS.map(renderSection).join("")}`;
  };

  const closeLightbox = () => {
    lightboxIndex = -1;
    lightboxShots = [];
    const box = el.querySelector(".appstore-lightbox");
    if (!box) return;
    box.hidden = true;
    box.querySelector("img").removeAttribute("src");
  };

  const closeDownloadConfirm = () => {
    pendingDownload = null;
    const box = el.querySelector(".appstore-confirm");
    if (box) box.hidden = true;
  };

  const openDownloadConfirm = (href, name) => {
    if (!isFileDownload(href)) return;
    pendingDownload = { href, name: name || href.split("/").pop() };
    const box = el.querySelector(".appstore-confirm");
    const title = box?.querySelector("#appstore-download-title");
    const copy = box?.querySelector("p");
    if (title) title.textContent = downloadConfirmTitle(href);
    if (copy) copy.textContent = `Do you want to download ${pendingDownload.name}?`;
    if (box) {
      box.hidden = false;
      box.querySelector("[data-download-ok]")?.focus();
    }
  };

  const startPendingDownload = () => {
    if (!pendingDownload || !isFileDownload(pendingDownload.href)) {
      closeDownloadConfirm();
      return;
    }
    const link = document.createElement("a");
    link.href = pendingDownload.href;
    link.download = pendingDownload.name;
    link.rel = "noopener";
    document.body.append(link);
    link.click();
    link.remove();
    closeDownloadConfirm();
  };

  const openLightbox = (src) => {
    const shots = lightboxShots.length ? lightboxShots : [src];
    lightboxShots = shots;
    lightboxIndex = Math.max(0, shots.indexOf(src));
    const box = el.querySelector(".appstore-lightbox");
    const img = box.querySelector("img");
    img.src = shots[lightboxIndex];
    img.alt = "Enlarged project screenshot";
    box.hidden = false;
    box.querySelector("[data-lightbox-prev]").hidden = shots.length < 2;
    box.querySelector("[data-lightbox-next]").hidden = shots.length < 2;
    box.querySelector("[data-lightbox-close]").focus();
  };

  const stepLightbox = (delta) => {
    if (lightboxIndex < 0 || lightboxShots.length < 2) return;
    lightboxIndex = (lightboxIndex + delta + lightboxShots.length) % lightboxShots.length;
    el.querySelector(".appstore-lightbox img").src = lightboxShots[lightboxIndex];
  };

  const renderSidebar = () => {
    const aside = el.querySelector(".appstore-sidebar");
    if (!aside) return;
    aside.querySelectorAll("[data-nav]").forEach((button) => {
      if (button.dataset.nav === nav) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    const input = aside.querySelector(".appstore-search input");
    if (input && input.value !== query) input.value = query;
    const clear = aside.querySelector("[data-search-clear]");
    if (clear) clear.hidden = !query.trim();
  };

  const bindGalleryNav = () => {
    const track = el.querySelector("[data-gallery-track]");
    const prev = el.querySelector("[data-gallery-prev]");
    const next = el.querySelector("[data-gallery-next]");
    if (!track || !prev || !next) return;
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth - 8;
      prev.disabled = track.scrollLeft <= 8;
      next.disabled = track.scrollLeft >= max;
      prev.hidden = next.hidden = max <= 0;
    };
    track.addEventListener("scroll", sync, { passive: true });
    requestAnimationFrame(sync);
  };

  const scrollGallery = (direction) => {
    const track = el.querySelector("[data-gallery-track]");
    if (!track) return;
    track.scrollBy({ left: direction * Math.round(track.clientWidth * 0.86), behavior: "smooth" });
  };

  const renderMain = () => {
    const main = el.querySelector(".appstore-main");
    if (!main) return;
    if (openId) {
      const project = projects.find((item) => item.id === openId);
      main.innerHTML = renderAppStoreDetail(project);
      main.scrollTop = 0;
      lightboxShots = projectGalleryImages(project);
    } else {
      main.innerHTML = listingHtml();
      requestAnimationFrame(() => {
        main.scrollTop = listingScroll;
      });
    }
    bindProjectArt(main);
    bindGalleryNav();
    renderSidebar();
    setWindowTitle();
  };

  const renderShell = () => {
    el.innerHTML = `<div class="appstore">
      <aside class="appstore-sidebar">
        <label class="appstore-search">
          <span class="appstore-search-icon">${APPSTORE_ICONS.search}</span>
          <input type="search" placeholder="Search" value="${escapeHtml(query)}" aria-label="Search projects" autocomplete="off">
          <button type="button" class="appstore-search-clear" data-search-clear hidden aria-label="Clear search">×</button>
        </label>
        <nav class="appstore-nav" aria-label="Projects">
          ${APPSTORE_NAV.map(
            ([id, label]) =>
              `<button type="button" data-nav="${id}" ${nav === id ? 'aria-current="page"' : ""}>${APPSTORE_ICONS[id]}<span>${label}</span></button>`
          ).join("")}
        </nav>
        <div class="appstore-profile">
          <span class="appstore-avatar" aria-hidden="true">MR</span>
          <span>Medhya Ravishankar</span>
        </div>
      </aside>
      <div class="appstore-main"></div>
      <div class="appstore-confirm" hidden>
        <div class="appstore-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="appstore-download-title">
          <h3 id="appstore-download-title">Download Excel model?</h3>
          <p>Do you want to download this Excel file to your computer?</p>
          <div class="appstore-confirm-actions">
            <button type="button" class="appstore-confirm-cancel" data-download-cancel>Cancel</button>
            <button type="button" class="appstore-confirm-ok" data-download-ok>Download</button>
          </div>
        </div>
      </div>
      <div class="appstore-lightbox" hidden role="dialog" aria-modal="true" aria-label="Screenshot">
        <button type="button" class="appstore-lightbox-close" data-lightbox-close aria-label="Close screenshot">Close</button>
        <button type="button" class="appstore-lightbox-prev" data-lightbox-prev aria-label="Previous screenshot">‹</button>
        <img alt="">
        <button type="button" class="appstore-lightbox-next" data-lightbox-next aria-label="Next screenshot">›</button>
      </div>
    </div>`;
    renderMain();
  };

  el.addEventListener("click", (event) => {
    if (event.target.closest("[data-download-cancel]") || event.target.classList.contains("appstore-confirm")) {
      closeDownloadConfirm();
      return;
    }
    if (event.target.closest("[data-download-ok]")) {
      startPendingDownload();
      return;
    }
    const download = event.target.closest("[data-download]");
    if (download) {
      event.preventDefault();
      event.stopPropagation();
      openDownloadConfirm(download.dataset.download, download.dataset.downloadName);
      return;
    }
    if (event.target.closest("[data-lightbox-close]") || event.target.classList.contains("appstore-lightbox")) {
      closeLightbox();
      return;
    }
    if (event.target.closest("[data-lightbox-prev]")) {
      stepLightbox(-1);
      return;
    }
    if (event.target.closest("[data-lightbox-next]")) {
      stepLightbox(1);
      return;
    }
    if (event.target.closest("[data-gallery-prev]")) {
      scrollGallery(-1);
      return;
    }
    if (event.target.closest("[data-gallery-next]")) {
      scrollGallery(1);
      return;
    }
    const shot = event.target.closest("[data-lightbox]");
    if (shot) {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(shot.dataset.lightbox);
      return;
    }
    if (event.target.closest("[data-open='about'], [data-open='home'], [data-open='playground']")) {
      const proj = windows.get("projects");
      if (proj?.maximized) maximizeWindow("projects");
      return;
    }
    if (event.target.closest("[data-search-clear]")) {
      query = "";
      openId = null;
      listingScroll = 0;
      closeLightbox();
      closeDownloadConfirm();
      renderMain();
      const input = el.querySelector(".appstore-search input");
      if (input) input.focus();
      return;
    }
    if (event.target.closest("[data-back]")) {
      openId = null;
      closeLightbox();
      closeDownloadConfirm();
      renderMain();
      return;
    }
    const tab = event.target.closest("[data-nav]");
    if (tab) {
      nav = tab.dataset.nav;
      openId = null;
      listingScroll = 0;
      closeLightbox();
      closeDownloadConfirm();
      renderMain();
      return;
    }
    const card = event.target.closest("[data-project]");
    if (!card) return;
    const main = el.querySelector(".appstore-main");
    listingScroll = main ? main.scrollTop : 0;
    openId = card.dataset.project;
    closeLightbox();
    renderMain();
  });
  el.addEventListener("input", (event) => {
    const input = event.target.closest(".appstore-search input");
    if (!input) return;
    query = input.value;
    openId = null;
    listingScroll = 0;
    renderMain();
    const restored = el.querySelector(".appstore-search input");
    if (restored) {
      restored.focus();
      const end = restored.value.length;
      restored.setSelectionRange(end, end);
    }
  });
  el.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && pendingDownload) {
      event.preventDefault();
      closeDownloadConfirm();
      return;
    }
    if (event.key === "Escape" && lightboxIndex >= 0) {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === "Escape" && query.trim() && event.target.closest(".appstore-search input")) {
      event.preventDefault();
      query = "";
      openId = null;
      renderMain();
      const input = el.querySelector(".appstore-search input");
      if (input) input.focus();
      return;
    }
    if (lightboxIndex < 0) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    }
  });
  renderShell();
}

function gameById(id) {
  return games.find((game) => game.id === id);
}

function featuredSelectorGames() {
  return games
    .filter((game) => game.inFeaturedSelector !== false)
    .sort((a, b) => (a.featuredSlot ?? 99) - (b.featuredSlot ?? 99));
}

function featuredGame(featuredId) {
  const pool = featuredSelectorGames();
  return pool.find((game) => game.id === featuredId) || pool.find((game) => game.featured) || pool[0] || games[0];
}

function gameHeroSrc(game) {
  const shot = (game.screenshots || []).find((src) => src && String(src).trim());
  const cover = game.coverImage || game.cover;
  if (cover && String(cover).trim()) return String(cover).trim();
  return shot ? String(shot).trim() : "";
}

function gameCardSrc(game) {
  const card = game.cardImage;
  if (card && String(card).trim()) return String(card).trim();
  return gameHeroSrc(game);
}

function gameThumbSrc(game) {
  const thumb = game.thumbImage;
  if (thumb && String(thumb).trim()) return String(thumb).trim();
  return gameHeroSrc(game);
}

function gameArtSrc(game, kind) {
  if (kind === "cover") return gameCardSrc(game);
  if (kind === "thumb") return gameThumbSrc(game);
  return gameHeroSrc(game);
}

function gameArtClass(game, kind) {
  if (kind === "cover" && game.cardImage) return "";
  const src = gameArtSrc(game, kind);
  if ((kind === "hero" || kind === "thumb") && src && /\.jpe?g$/i.test(src)) {
    return " is-illustrated";
  }
  return game.artStyle === "pixel" ? " is-pixel" : "";
}

function renderGameArt(game, kind) {
  const src = gameArtSrc(game, kind);
  const blank = kind === "hero";
  const fallback = blank
    ? `<div class="store-art-fallback is-blank" aria-hidden="true"${src ? " hidden" : ""}></div>`
    : `<div class="store-art-fallback" aria-hidden="true"${src ? " hidden" : ""}><span>${escapeHtml(game.title)}</span></div>`;
  if (src) {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(game.title)}" ${kind === "cover" ? 'width="240" height="320"' : ""} onerror="this.hidden=true;const fallback=this.nextElementSibling;if(fallback)fallback.hidden=false;">${fallback}`;
  }
  return fallback;
}

function renderPlayButton(game, variant = "btn-accent") {
  if (!isApprovedPublicResource(game.playUrl)) return "";
  return `<a class="btn ${variant}" href="${escapeHtml(game.playUrl.trim())}" target="_blank" rel="noopener noreferrer">Play Game ↗</a>`;
}

function renderSourceButton(game) {
  if (!isApprovedPublicResource(game.sourceUrl)) return "";
  return `<a class="btn btn-ghost" href="${escapeHtml(game.sourceUrl.trim())}" target="_blank" rel="noopener noreferrer">View Source ↗</a>`;
}

const STORE_ICONS = {
  library:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="15.2" cy="13" r="0.9" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="0.9" fill="currentColor" stroke="none"/></svg>',
  discover:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m14.8 9.2-1.7 4.9-4.9 1.7 1.7-4.9z"/></svg>',
  browse:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/></svg>',
};

function renderStoreCard(game) {
  return `<button type="button" class="store-card${game.placeholder ? " is-placeholder" : ""}" data-game="${game.id}">
    <div class="store-cover${gameArtClass(game, "cover")}">${renderGameArt(game, "cover")}</div>
    <div class="store-card-body">
      <h3>${escapeHtml(game.title)}</h3>
      ${game.genre ? `<p class="store-genre">${escapeHtml(game.genre)}</p>` : ""}
      ${game.tagline ? `<p class="store-card-tagline">${escapeHtml(game.tagline)}</p>` : ""}
    </div>
  </button>`;
}

function renderStoreHero(game) {
  const play = renderPlayButton(game);
  const tagList = (game.heroTags?.length ? game.heroTags : [game.genre, ...(game.secondaryGenres || [])].filter(Boolean)).slice(0, 3);
  const tags = tagList.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const description = game.heroPitch || game.description || "";
  return `<section class="store-hero">
    <div class="store-hero-copy">
      <p class="store-kicker">Featured Game</p>
      <h2>${escapeHtml(game.title)}</h2>
      <p class="store-hero-tagline">${game.tagline ? escapeHtml(game.tagline) : "&nbsp;"}</p>
      <p class="store-hero-pitch">${description ? escapeHtml(description) : "&nbsp;"}</p>
      <p class="store-hero-tags">${tags}</p>
      <div class="store-hero-actions">${play}</div>
    </div>
    <div class="store-hero-art${gameArtClass(game, "hero")}">${renderGameArt(game, "hero")}</div>
  </section>`;
}

function renderStoreRail(featuredId) {
  return `<div class="store-rail" role="list">${featuredSelectorGames()
    .map(
      (game) =>
        `<button type="button" class="store-rail-item${game.id === featuredId ? " is-active" : ""}" data-feature="${game.id}" aria-pressed="${game.id === featuredId ? "true" : "false"}">
          <span class="store-rail-thumb${gameArtClass(game, "thumb")}">${renderGameArt(game, "thumb")}</span>
          <span class="store-rail-title">${escapeHtml(game.title)}</span>
        </button>`
    )
    .join("")}</div>`;
}

function renderGameDetail(game) {
  const genres = [game.genre, ...(game.secondaryGenres || [])].filter(Boolean);
  const shots = (game.screenshots || [])
    .filter((src) => src && String(src).trim())
    .map((src) => `<figure class="store-shot${gameArtClass(game)}"><img src="${escapeHtml(String(src).trim())}" alt=""></figure>`)
    .join("");
  const banner = gameHeroSrc(game)
    ? `<figure class="store-banner${gameArtClass(game)}">${renderGameArt(game, "hero")}</figure>`
    : "";
  const facts = [
    game.engine ? ["Development tools", game.engine] : null,
    game.status ? ["Status", game.status] : null,
    genres.length ? ["Genre", genres.join(" · ")] : null,
  ].filter(Boolean);
  return `<article class="store-detail">
    <button type="button" class="btn btn-ghost back" data-store-back>← Back to Game Library</button>
    <p class="store-kicker">${escapeHtml(game.genre || "Game")}</p>
    <h1>${escapeHtml(game.title)}</h1>
    ${game.altTitle ? `<p class="store-hero-meta">Also known as ${escapeHtml(game.altTitle)}</p>` : ""}
    ${game.tagline ? `<p class="store-hero-tagline">${escapeHtml(game.tagline)}</p>` : ""}
    ${facts.length ? `<p class="store-hero-meta">${facts.map(([, value]) => escapeHtml(value)).join(" · ")}</p>` : ""}
    <div class="case-resources">
      ${renderPlayButton(game)}
      ${renderSourceButton(game)}
    </div>
    ${banner}
    ${game.description ? `<p class="store-kicker">About the Game</p><p class="lede">${escapeHtml(game.description)}</p>` : ""}
    ${game.gameType ? `<p class="store-hero-meta">${escapeHtml(game.gameType)}</p>` : ""}
    ${renderGameFeatures(game)}
    ${renderHowToPlay(game)}
    ${renderGameControls(game)}
    ${renderGameMechanics(game)}
    ${
      facts.length
        ? `<dl class="store-facts">${facts
            .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
            .join("")}</dl>`
        : ""
    }
    ${shots ? `<div class="store-gallery">${shots}</div>` : ""}
  </article>`;
}

function renderGameFeatures(game) {
  if (!game.features || !game.features.length) return "";
  return `<section class="store-howto">
    <p class="store-kicker">Key Features</p>
    <ul class="case-list">${game.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>`;
}

function renderHowToPlay(game) {
  if (!game.howToPlay || !game.howToPlay.length) return "";
  return `<section class="store-howto">
    <p class="store-kicker">How to Play</p>
    <ul class="case-list">${game.howToPlay.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>`;
}

function renderGameControls(game) {
  if (!game.controls || !game.controls.length) return "";
  return `<section class="store-controls">
    <p class="store-kicker">Controls</p>
    <dl class="store-facts">${game.controls
      .map(([key, action]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(action)}</dd></div>`)
      .join("")}</dl>
  </section>`;
}

function renderGameMechanics(game) {
  const mechanics = game.mechanics;
  if (!mechanics) return "";
  const characters = (mechanics.characters || [])
    .map(
      (character) =>
        `<div class="feature-card"><strong>${escapeHtml(character.name)}</strong><span>${escapeHtml(character.blurb)}</span><ul class="case-list">${(character.points || [])
          .map((point) => `<li>${escapeHtml(point)}</li>`)
          .join("")}</ul></div>`
    )
    .join("");
  return `<section class="store-mechanics">
    <p class="store-kicker">${escapeHtml(mechanics.heading)}</p>
    <div class="feature-grid">${characters}</div>
    ${
      mechanics.coop
        ? `<h3>${escapeHtml(mechanics.coop.heading)}</h3><p>${escapeHtml(mechanics.coop.copy)}</p>`
        : ""
    }
  </section>`;
}

function mountPlayground(el) {
  let view = "discover";
  let browseView = "discover";
  let featuredId = (games.find((game) => game.featured) || games[0]).id;
  let detailId = null;
  let storeScroll = 0;

  const render = () => {
    if (view === "detail") {
      const game = gameById(detailId) || games[0];
      el.innerHTML = renderGameDetail(game);
      el.scrollTop = 0;
      return;
    }
    const featured = featuredGame(featuredId);
    featuredId = featured.id;
    el.innerHTML = `<div class="game-library storefront">
      <aside class="store-sidebar">
        <p class="store-brand">${STORE_ICONS.library}<span>Game Library</span></p>
        <nav class="store-nav" aria-label="Game Library">
          <button type="button" data-store-view="discover" ${view === "discover" ? 'aria-current="page"' : ""}>${STORE_ICONS.discover}<span>Discover</span></button>
          <button type="button" data-store-view="all" ${view === "all" ? 'aria-current="page"' : ""}>${STORE_ICONS.browse}<span>All Games</span></button>
        </nav>
      </aside>
      <div class="store-main">
        <header class="store-topbar">
          <p>${view === "all" ? "All Games" : "Discover"}</p>
          <p class="store-count">${games.length} Games</p>
        </header>
        ${
          view === "discover"
            ? `<div class="store-featured">${renderStoreHero(featured)}${renderStoreRail(featured.id)}</div>`
            : ""
        }
        <section class="store-collection" id="library-all-games">
          ${view === "all" ? "" : `<p class="store-row-label">Discover Something New →</p>`}
          <div class="store-grid">${games.map(renderStoreCard).join("")}</div>
        </section>
      </div>
    </div>`;
    requestAnimationFrame(() => {
      el.scrollTop = storeScroll;
    });
  };

  el.addEventListener("click", (event) => {
    const back = event.target.closest("[data-store-back]");
    if (back) {
      view = browseView;
      detailId = null;
      render();
      requestAnimationFrame(() => {
        el.scrollTop = storeScroll;
      });
      return;
    }
    const tab = event.target.closest("[data-store-view]");
    if (tab) {
      view = tab.dataset.storeView;
      browseView = view;
      detailId = null;
      storeScroll = 0;
      render();
      return;
    }
    const thumb = event.target.closest("[data-feature]");
    if (thumb) {
      storeScroll = el.scrollTop;
      featuredId = thumb.dataset.feature;
      view = "discover";
      browseView = "discover";
      render();
      return;
    }
    const card = event.target.closest("[data-game]");
    if (!card || event.target.closest("a")) return;
    const game = gameById(card.dataset.game);
    if (card.classList.contains("store-card") && isApprovedPublicResource(game?.playUrl)) {
      window.open(game.playUrl.trim(), "_blank", "noopener,noreferrer");
      return;
    }
    storeScroll = el.scrollTop;
    detailId = card.dataset.game;
    view = "detail";
    render();
  });
  render();
}

const PROFILE_PHOTO_SRC = "assets/profile.jpg";

const CONTACT = {
  name: "Medhya Ravishankar",
  email: "mr6887@nyu.edu",
  linkedinUrl: "https://www.linkedin.com/in/medhya-ravishankar",
  linkedinHandle: "medhya-ravishankar",
};

const CONTACT_THREADS = [
  {
    id: "message",
    name: "Message Me",
    preview: "Hey! Thanks for checking out my portfolio 👋",
  },
  {
    id: "email",
    name: "Email",
    preview: CONTACT.email,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    preview: CONTACT.name,
  },
];

const IMESSAGE_ICONS = {
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.2"/><path d="m16 16 4 4" stroke-linecap="round"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 7.2v9.2M8.4 11.2 12 7.6l3.6 3.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="#fff"><path d="M7.2 9.2H4.6v10.2h2.6zm.2-3.3A1.55 1.55 0 0 0 5.9 4.4 1.55 1.55 0 0 0 4.4 5.9 1.55 1.55 0 0 0 5.9 7.4 1.55 1.55 0 0 0 7.4 5.9ZM19.4 13.3c0-3.1-1.6-4.5-3.8-4.5a3.3 3.3 0 0 0-2.9 1.5h-.1V9.2H10v10.2h2.6v-5.1c0-1.3.2-2.6 1.9-2.6s1.7 1.5 1.7 2.7v5h2.6z"/></svg>',
};

function contactMailto(body, subject = "Hello from MedhyaOS") {
  let href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
  if (body) href += `&body=${encodeURIComponent(body)}`;
  return href;
}

function openMailto(href) {
  const link = document.createElement("a");
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function contactAvatar(kind) {
  if (kind === "email") return `<span class="im-avatar im-avatar-mail">${IMESSAGE_ICONS.mail}</span>`;
  if (kind === "linkedin") return `<span class="im-avatar im-avatar-in">${IMESSAGE_ICONS.linkedin}</span>`;
  return `<span class="im-avatar"><img alt="" width="36" height="36" src="${PROFILE_PHOTO_SRC}"></span>`;
}

function renderContactThreadList(selectedId, query) {
  const needle = query.trim().toLowerCase();
  const threads = CONTACT_THREADS.filter(
    (thread) =>
      !needle ||
      thread.name.toLowerCase().includes(needle) ||
      thread.preview.toLowerCase().includes(needle)
  );
  if (!threads.length) {
    return `<p class="im-empty">No conversations match “${escapeHtml(query.trim())}”.</p>`;
  }
  return threads
    .map(
      (thread) => `<button type="button" class="im-row" data-im-thread="${escapeHtml(thread.id)}" ${
        selectedId === thread.id ? 'aria-current="page"' : ""
      }>
        ${contactAvatar(thread.id)}
        <span class="im-row-copy">
          <strong>${escapeHtml(thread.name)}</strong>
          <em>${escapeHtml(thread.preview)}</em>
        </span>
      </button>`
    )
    .join("");
}

function renderContactMessagePane(sent) {
  const incoming = [
    "Hey! Thanks for checking out my portfolio 👋",
    "Interested in connecting? Feel free to send me a message or reach out through LinkedIn!",
    `If you type a note below, it will open your email app so you can reach me at ${CONTACT.email}.`,
  ];
  return `<header class="im-header">
      ${contactAvatar("message")}
      <div class="im-header-copy">
        <h2>${escapeHtml(CONTACT.name)}</h2>
        <p>Message Me</p>
      </div>
    </header>
    <div class="im-log">
      ${incoming
        .map(
          (text) => `<div class="im-line im-in">
            ${contactAvatar("message")}
            <p class="im-bubble">${escapeHtml(text)}</p>
          </div>`
        )
        .join("")}
      ${sent
        .map(
          (text) => `<div class="im-line im-out">
            <p class="im-bubble">${escapeHtml(text)}</p>
          </div>
          <p class="im-system">Opens your email app. Messages are not sent from this site.</p>`
        )
        .join("")}
    </div>
    <form class="im-composer" autocomplete="off">
      <label class="im-composer-field">
        <span class="im-sr">Message</span>
        <input type="text" name="message" maxlength="1000" placeholder="Message" aria-label="Write a message">
      </label>
      <button type="submit" class="im-send" aria-label="Send, opens email">${IMESSAGE_ICONS.send}</button>
    </form>
    <p class="im-composer-note">Sending opens your email app to ${escapeHtml(CONTACT.email)}.</p>`;
}

function renderContactEmailPane() {
  return `<header class="im-header">
      ${contactAvatar("email")}
      <div class="im-header-copy">
        <h2>Email</h2>
        <p>${escapeHtml(CONTACT.email)}</p>
      </div>
    </header>
    <div class="im-log">
      <div class="im-line im-in">
        ${contactAvatar("email")}
        <p class="im-bubble">The fastest way to reach me is email. Use the button below to compose a note in your mail app.</p>
      </div>
      <div class="im-card">
        <p class="im-card-label">Email</p>
        <a class="im-card-value" href="${contactMailto("", "Hello Medhya")}">${escapeHtml(CONTACT.email)}</a>
        <a class="im-action" href="${contactMailto("", "Hello Medhya")}">Compose Email</a>
      </div>
    </div>`;
}

function renderContactLinkedInPane() {
  return `<header class="im-header">
      ${contactAvatar("linkedin")}
      <div class="im-header-copy">
        <h2>LinkedIn</h2>
        <p>${escapeHtml(CONTACT.name)}</p>
      </div>
    </header>
    <div class="im-log">
      <div class="im-line im-in">
        ${contactAvatar("linkedin")}
        <p class="im-bubble">I’m on LinkedIn if you’d rather connect there. It opens in a new tab.</p>
      </div>
      <div class="im-card">
        <p class="im-card-label">LinkedIn</p>
        <a class="im-card-value" href="${escapeHtml(CONTACT.linkedinUrl)}" target="_blank" rel="noopener noreferrer">linkedin.com/in/${escapeHtml(
          CONTACT.linkedinHandle
        )}</a>
        <a class="im-action" href="${escapeHtml(CONTACT.linkedinUrl)}" target="_blank" rel="noopener noreferrer">Open LinkedIn</a>
      </div>
    </div>`;
}

function mountContact(el) {
  let selectedId = "message";
  let query = "";
  const sent = [];
  const render = (focusComposer = false) => {
    const pane =
      selectedId === "email"
        ? renderContactEmailPane()
        : selectedId === "linkedin"
          ? renderContactLinkedInPane()
          : renderContactMessagePane(sent);
    el.innerHTML = `<div class="imessage">
      <aside class="im-sidebar">
        <label class="im-search">
          <span class="im-search-icon" aria-hidden="true">${IMESSAGE_ICONS.search}</span>
          <input type="search" value="${escapeHtml(query)}" placeholder="Search" aria-label="Search conversations">
        </label>
        <p class="im-heading">Messages</p>
        <nav class="im-nav" aria-label="Conversations">${renderContactThreadList(selectedId, query)}</nav>
      </aside>
      <section class="im-thread">${pane}</section>
    </div>`;
    const log = el.querySelector(".im-log");
    if (log) log.scrollTop = log.scrollHeight;
    const composer = el.querySelector(".im-composer input");
    if (focusComposer && composer) composer.focus({ preventScroll: true });
    const search = el.querySelector(".im-search input");
    if (search && document.activeElement === search) {
      const end = search.value.length;
      search.setSelectionRange(end, end);
    }
  };
  el.addEventListener("click", (event) => {
    const thread = event.target.closest("[data-im-thread]");
    if (!thread) return;
    selectedId = thread.dataset.imThread;
    render(selectedId === "message");
  });
  el.addEventListener("input", (event) => {
    if (!event.target.closest(".im-search input")) return;
    query = event.target.value;
    const visible = CONTACT_THREADS.filter(
      (thread) =>
        !query.trim() ||
        thread.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        thread.preview.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (visible.length && !visible.some((thread) => thread.id === selectedId)) selectedId = visible[0].id;
    render();
    const search = el.querySelector(".im-search input");
    if (search) {
      search.focus();
      const end = search.value.length;
      search.setSelectionRange(end, end);
    }
  });
  el.addEventListener("submit", (event) => {
    const form = event.target.closest(".im-composer");
    if (!form) return;
    event.preventDefault();
    const input = form.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    sent.push(text);
    openMailto(contactMailto(text));
    render(true);
  });
  render(true);
}

const HOME_APP_ICONS = {
  experience:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/></svg>',
  projects:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3.5 8.5h17v11h-17z"/><path d="M8.5 8.5V6.8A1.8 1.8 0 0 1 10.3 5h3.4A1.8 1.8 0 0 1 15.5 6.8V8.5"/></svg>',
  playground:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="15.2" cy="13" r="0.9" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="0.9" fill="currentColor" stroke="none"/></svg>',
};

function renderAboutProfile() {
  return `<article class="term-profile welcome">
        <p class="term-section">ABOUT MEDHYA</p>
        <figure class="welcome-photo">
          <img class="welcome-photo-img" alt="Portrait of Medhya Ravishankar" width="330" height="330">
          <div class="welcome-photo-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.2"/><circle cx="9" cy="9" r="1.8"/><path d="m21 15-3.2-3.2a2 2 0 0 0-2.7 0L6 21"/></svg>
            <span>Profile photo</span>
          </div>
        </figure>
        <div class="welcome-intro">
          <p class="welcome-kicker">
            <span class="welcome-name">Medhya Ravishankar</span>
            <span class="welcome-focus">Product Management · Enterprise Technology · Finance · AI</span>
          </p>
          <h1>I turn complex problems into products people can actually use.</h1>
          <p class="lede">Hi, I’m Medhya. I’m a product-minded builder working at the intersection of enterprise technology, finance, and AI. I’ve worked on product discovery, finance systems, AI-powered tools, and analytics.</p>
          <p class="about-copy">I’m a student aiming at product roles: I like sitting between users, design, and engineering. I write clearly, ask annoying questions, and care more about whether we learned something than whether the deck looked finished.</p>
        </div>
        <section class="welcome-featured" aria-label="Featured apps">
          <h2 class="welcome-featured-label">FEATURED APPS</h2>
          <div class="welcome-apps">
            <button type="button" class="welcome-app" data-open="experience">
              <span class="welcome-app-icon">${HOME_APP_ICONS.experience}</span>
              <span class="welcome-app-copy"><strong>Experience</strong><span>Where I’ve worked</span></span>
              <span class="welcome-app-arrow" aria-hidden="true">→</span>
            </button>
            <button type="button" class="welcome-app" data-open="projects">
              <span class="welcome-app-icon">${HOME_APP_ICONS.projects}</span>
              <span class="welcome-app-copy"><strong>Projects</strong><span>Research & 0 → 1 builds</span></span>
              <span class="welcome-app-arrow" aria-hidden="true">→</span>
            </button>
            <button type="button" class="welcome-app" data-open="playground">
              <span class="welcome-app-icon">${HOME_APP_ICONS.playground}</span>
              <span class="welcome-app-copy"><strong>Game Library</strong><span>Games I’ve created</span></span>
              <span class="welcome-app-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </article>`;
}

function bindAboutPhoto(root) {
  root.querySelectorAll(".welcome-photo").forEach((photo) => {
    const img = photo.querySelector(".welcome-photo-img");
    if (!img) return;
    img.addEventListener("load", () => photo.classList.add("has-photo"));
    img.addEventListener("error", () => photo.classList.remove("has-photo"));
    img.src = PROFILE_PHOTO_SRC;
  });
}

function mountAbout(el) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.innerHTML = `<div class="term">
      <div class="term-stream">
        <p class="term-welcome">Welcome to MedhyaOS.</p>
        <p class="term-hint">Type '<span>about</span>' to get started.</p>
        <form class="term-form" autocomplete="off">
          <label class="term-line">
            <span class="term-prompt">medhya@medhyaos ~ %</span>
            <span class="term-field">
              <input class="term-input" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" autofocus aria-label="Terminal command">
              <span class="term-caret" aria-hidden="true"></span>
            </span>
          </label>
        </form>
      </div>
    </div>`;
  const stream = el.querySelector(".term-stream");
  const form = el.querySelector(".term-form");
  const input = el.querySelector(".term-input");

  const sizeInput = () => {
    input.style.width = `${Math.max(1, input.value.length + 1)}ch`;
  };

  const insertBeforePrompt = (node) => {
    stream.insertBefore(node, form);
  };

  const echoCommand = (cmd) => {
    const line = document.createElement("p");
    line.className = "term-echo";
    const prompt = document.createElement("span");
    prompt.className = "term-prompt";
    prompt.textContent = "medhya@medhyaos ~ % ";
    const typed = document.createElement("span");
    typed.className = "term-cmd";
    typed.textContent = cmd;
    line.append(prompt, typed);
    insertBeforePrompt(line);
  };

  const showError = () => {
    const line = document.createElement("p");
    line.className = "term-error";
    line.append("Command not found. Type '");
    const hint = document.createElement("span");
    hint.textContent = "about";
    line.append(hint, "' to get started.");
    insertBeforePrompt(line);
  };

  const scrollToPrompt = () => {
    el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const printAbout = () => {
    const holder = document.createElement("div");
    holder.innerHTML = renderAboutProfile();
    const profile = holder.firstElementChild;
    insertBeforePrompt(profile);
    bindAboutPhoto(profile);
    requestAnimationFrame(() => {
      profile.classList.add("is-in");
      scrollToPrompt();
    });
  };

  const submitCommand = () => {
    const cmd = input.value.trim();
    input.value = "";
    sizeInput();
    if (!cmd) return;
    echoCommand(cmd);
    if (cmd.toLowerCase() === "about") printAbout();
    else showError();
    scrollToPrompt();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitCommand();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitCommand();
  });
  input.addEventListener("input", sizeInput);
  el.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, a, input")) return;
    input.focus({ preventScroll: true });
  });
  sizeInput();
  const focusPrompt = () => {
    if (!input.isConnected) return;
    input.focus({ preventScroll: true });
  };
  focusPrompt();
  requestAnimationFrame(focusPrompt);
}

const APPS = {
  about: {
    title: "About Me",
    icon: "about",
    desktop: true,
    dock: true,
    center: true,
    size: { w: 1080, h: 680 },
    render: mountAbout,
  },
  experience: {
    title: "Experience",
    icon: "experience",
    desktop: true,
    dock: true,
    size: { w: 860, h: 560 },
    render: mountExperience,
  },
  projects: {
    title: "Projects",
    icon: "projects",
    desktop: true,
    dock: true,
    size: { w: 1180, h: 740 },
    render: mountProjects,
  },
  playground: {
    title: "Game Library",
    icon: "playground",
    desktop: true,
    dock: true,
    center: true,
    size: { w: 1100, h: 720 },
    render: mountPlayground,
  },
  skills: {
    title: "Skills",
    icon: "skills",
    desktop: true,
    dock: true,
    size: { w: 840, h: 620 },
    render: mountSkills,
  },
  contact: {
    title: "Contact",
    icon: "contact",
    desktop: true,
    dock: true,
    size: { w: 820, h: 560 },
    render: mountContact,
  },
};

const windowsLayer = document.getElementById("os-windows");
const iconsLayer = document.getElementById("os-icons");
const dockEl = document.getElementById("os-dock");
const appNameEl = document.getElementById("os-app-name");
const clockEl = document.getElementById("os-clock");
const windows = new Map();
let zTop = 10;
let cascade = 0;

function typingField(win) {
  if (!win || win.minimized) return null;
  if (win.id === "about") return win.el.querySelector(".term-input");
  if (win.id === "contact") return win.el.querySelector(".im-composer input");
  return null;
}

function frontmostWindow() {
  const open = [...windows.values()].filter((win) => !win.minimized);
  if (!open.length) return null;
  return open.reduce((top, win) => ((win.z ?? 0) >= (top.z ?? 0) ? win : top));
}

function focusTypingField(win) {
  const field = typingField(win);
  if (!field) return;
  field.focus({ preventScroll: true });
}

function focusFrontTypingApp() {
  const top = frontmostWindow();
  if (!top) return;
  requestAnimationFrame(() => focusTypingField(top));
}

function menubarBounds() {
  const desktop = document.getElementById("os-desktop").getBoundingClientRect();
  return {
    top: 38,
    left: 12,
    right: desktop.width - 12,
    bottom: desktop.height - 88,
    width: desktop.width,
    height: desktop.height,
  };
}

function clampRect(x, y, w, h) {
  const box = menubarBounds();
  const width = Math.max(280, Math.min(w, box.width - 24));
  const height = Math.max(200, Math.min(h, box.bottom - box.top));
  const left = Math.min(Math.max(x, box.left), box.right - 80);
  const top = Math.min(Math.max(y, box.top), box.bottom - 48);
  return { left, top, width, height };
}

function updateChrome() {
  const active = [...windows.values()].find((win) => win.el.classList.contains("is-active") && !win.minimized);
  const app = active ? APPS[active.id] : null;
  appNameEl.textContent = app ? app.title : "Desktop";
  dockEl.querySelectorAll("[data-app]").forEach((button) => {
    const win = windows.get(button.dataset.app);
    button.classList.toggle("is-open", Boolean(win) && !win.minimized);
    button.classList.toggle("is-min", Boolean(win?.minimized));
  });
}

function focusWindow(id) {
  windows.forEach((win) => win.el.classList.remove("is-active"));
  const win = windows.get(id);
  if (!win) return;
  zTop += 1;
  win.z = zTop;
  win.el.style.zIndex = String(zTop);
  win.el.classList.add("is-active");
  if (win.minimized) restoreWindow(id);
  updateChrome();
  if (id === "about" || id === "contact") {
    requestAnimationFrame(() => focusTypingField(win));
  }
}

function restoreWindow(id) {
  const win = windows.get(id);
  if (!win) return;
  win.minimized = false;
  win.el.classList.remove("is-minimized");
  if (win.prevRect && !win.maximized) {
    Object.assign(win.el.style, {
      left: `${win.prevRect.left}px`,
      top: `${win.prevRect.top}px`,
      width: `${win.prevRect.width}px`,
      height: `${win.prevRect.height}px`,
    });
  }
  focusWindow(id);
}

function closeWindow(id) {
  const win = windows.get(id);
  if (!win) return;
  win.el.classList.remove("is-open");
  setTimeout(() => {
    win.el.remove();
    windows.delete(id);
    updateChrome();
    focusFrontTypingApp();
  }, 160);
}

function minimizeWindow(id) {
  const win = windows.get(id);
  if (!win) return;
  win.minimized = true;
  win.el.classList.add("is-minimized");
  win.el.classList.remove("is-active");
  updateChrome();
  focusFrontTypingApp();
}

function maximizeWindow(id) {
  const win = windows.get(id);
  if (!win) return;
  const box = menubarBounds();
  if (win.maximized) {
    win.maximized = false;
    win.el.classList.remove("is-maximized");
    const rect = win.prevRect;
    Object.assign(win.el.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  } else {
    win.prevRect = {
      left: win.el.offsetLeft,
      top: win.el.offsetTop,
      width: win.el.offsetWidth,
      height: win.el.offsetHeight,
    };
    win.maximized = true;
    win.el.classList.add("is-maximized");
    Object.assign(win.el.style, {
      left: "0px",
      top: "0px",
      width: `${box.width}px`,
      height: `${box.bottom - 8}px`,
    });
  }
  const maxBtn = win.el.querySelector(".max");
  maxBtn.setAttribute("aria-label", win.maximized ? "Restore" : "Maximize");
  focusWindow(id);
}

function bindWindowChrome(win) {
  const { el, id } = win;
  el.querySelector(".close").addEventListener("click", (event) => {
    event.stopPropagation();
    closeWindow(id);
  });
  el.querySelector(".min").addEventListener("click", (event) => {
    event.stopPropagation();
    minimizeWindow(id);
  });
  el.querySelector(".max").addEventListener("click", (event) => {
    event.stopPropagation();
    maximizeWindow(id);
  });
  el.addEventListener("pointerdown", () => focusWindow(id));

  const bar = el.querySelector(".os-titlebar");
  bar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".os-traffic, .exp-title-search, .appstore-search, button, input") || win.maximized) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origL = el.offsetLeft;
    const origT = el.offsetTop;
    const move = (moveEvent) => {
      const next = clampRect(
        origL + (moveEvent.clientX - startX),
        origT + (moveEvent.clientY - startY),
        el.offsetWidth,
        el.offsetHeight
      );
      el.style.left = `${next.left}px`;
      el.style.top = `${next.top}px`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });

  el.querySelector(".os-resize").addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    if (win.maximized) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origW = el.offsetWidth;
    const origH = el.offsetHeight;
    const origL = el.offsetLeft;
    const origT = el.offsetTop;
    const move = (moveEvent) => {
      const next = clampRect(
        origL,
        origT,
        origW + (moveEvent.clientX - startX),
        origH + (moveEvent.clientY - startY)
      );
      el.style.width = `${next.width}px`;
      el.style.height = `${next.height}px`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });
}

function windowRect(app) {
  const box = menubarBounds();
  const iconGutter = app.center && box.width > 980 ? 210 : 24;
  const rightPad = 24;
  const width = Math.min(app.size.w, box.width - iconGutter - rightPad);
  const height = Math.min(app.size.h, box.bottom - box.top - 12);
  if (app.center) {
    const avail = box.width - iconGutter - rightPad;
    return {
      left: iconGutter + Math.max(0, Math.round((avail - width) / 2)),
      top: Math.max(16, Math.round((box.bottom - box.top - height) / 2)),
      width,
      height,
    };
  }
  cascade = (cascade + 1) % 6;
  return {
    left: Math.max(24, Math.round((box.width - width) / 2 + cascade * 18 - 40)),
    top: Math.max(16, 28 + cascade * 22),
    width,
    height,
  };
}

function openApp(id) {
  if (id === "home") id = "about";
  const app = APPS[id];
  if (!app) return;
  if (windows.has(id)) {
    focusWindow(id);
    return;
  }
  const { left, top, width, height } = windowRect(app);
  const el = document.createElement("section");
  el.className = "os-window";
  el.dataset.app = id;
  el.style.cssText = `left:${left}px;top:${top}px;width:${width}px;height:${height}px;z-index:${++zTop}`;
  el.innerHTML = `<div class="os-titlebar">
      <div class="os-traffic">
        <button type="button" class="close" aria-label="Close">${TRAFFIC_ICONS.close}</button>
        <button type="button" class="min" aria-label="Minimize">${TRAFFIC_ICONS.min}</button>
        <button type="button" class="max" aria-label="Maximize">${TRAFFIC_ICONS.expand}${TRAFFIC_ICONS.restore}</button>
      </div>
      <span class="os-title">${escapeHtml(app.title)}</span>
    </div>
    <div class="os-body"></div>
    <div class="os-resize" aria-hidden="true"></div>`;
  windowsLayer.appendChild(el);
  const win = { id, el, minimized: false, maximized: false, prevRect: { left, top, width, height }, z: zTop };
  windows.set(id, win);
  app.render(el.querySelector(".os-body"));
  bindWindowChrome(win);
  requestAnimationFrame(() => el.classList.add("is-open"));
  focusWindow(id);
}

iconsLayer.innerHTML = Object.entries(APPS)
  .filter(([, app]) => app.desktop)
  .map(
    ([id, app]) =>
      `<button type="button" class="os-icon" data-app="${id}">
        <span class="os-icon-glyph">${ICONS[app.icon]}</span>
        <span>${escapeHtml(app.title)}</span>
      </button>`
  )
  .join("");

dockEl.innerHTML = ["about", "experience", "projects", "playground", "skills", "contact"]
  .map((id) => {
    const title = APPS[id].title.replace(".pdf", "");
    return `<button type="button" class="os-dock-item" data-app="${id}" data-tooltip="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">${ICONS[APPS[id].icon]}</button>`;
  })
  .join("");

function launchFromIcon(id) {
  openApp(id);
}

iconsLayer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-app]");
  if (!button) return;
  iconsLayer.querySelectorAll(".os-icon").forEach((el) => el.classList.remove("is-selected"));
  button.classList.add("is-selected");
  if (coarse) launchFromIcon(button.dataset.app);
});

iconsLayer.addEventListener("dblclick", (event) => {
  const button = event.target.closest("[data-app]");
  if (button) launchFromIcon(button.dataset.app);
});

dockEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-app]");
  if (!button) return;
  openApp(button.dataset.app);
});

windowsLayer.addEventListener("click", (event) => {
  const openId = event.target.closest("[data-open]")?.dataset.open;
  if (openId) openApp(openId);
});

function tickClock() {
  clockEl.textContent = new Date().toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
tickClock();
setInterval(tickClock, 30000);

const spotlight = document.getElementById("os-spotlight");
const spotlightInput = document.getElementById("os-spotlight-input");
const spotlightResults = document.getElementById("os-spotlight-results");

function spotlightItems(query) {
  const q = query.trim().toLowerCase();
  const apps = Object.entries(APPS).map(([id, app]) => ({
    id,
    label: app.title,
    kind: "App",
  }));
  const roles = experiences.map((item, index) => ({
    id: "experience",
    label: `${item.title} · ${item.where}`,
    kind: "Role",
    extra: index,
  }));
  const cases = projects.map((item) => ({
    id: "projects",
    label: item.title,
    kind: "Project",
  }));
  return [...apps, ...roles, ...cases].filter((item) =>
    `${item.label} ${item.kind}`.toLowerCase().includes(q)
  );
}

function renderSpotlight() {
  const items = spotlightItems(spotlightInput.value).slice(0, 8);
  spotlightResults.innerHTML = items
    .map(
      (item, index) =>
        `<li><button type="button" data-open="${item.id}" ${index === 0 ? 'aria-current="true"' : ""}><strong>${escapeHtml(item.label)}</strong> · ${escapeHtml(item.kind)}</button></li>`
    )
    .join("");
}

function openSpotlight() {
  spotlight.hidden = false;
  spotlightInput.value = "";
  renderSpotlight();
  spotlightInput.focus();
}

function closeSpotlight() {
  spotlight.hidden = true;
}

document.getElementById("os-search").addEventListener("click", openSpotlight);
spotlight.addEventListener("click", (event) => {
  if (event.target === spotlight) closeSpotlight();
  const openId = event.target.closest("[data-open]")?.dataset.open;
  if (openId) {
    closeSpotlight();
    openApp(openId);
  }
});
spotlightInput.addEventListener("input", renderSpotlight);
window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (spotlight.hidden) openSpotlight();
    else closeSpotlight();
    return;
  }
  if (event.key === "Escape") closeSpotlight();
  if (!spotlight.hidden) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const top = frontmostWindow();
  const field = typingField(top);
  if (!field) return;
  if (
    event.target instanceof Element &&
    top.el.contains(event.target) &&
    event.target.closest("input, textarea, select, [contenteditable='true']")
  ) {
    return;
  }
  field.focus({ preventScroll: true });
  if (event.key.length === 1) {
    event.preventDefault();
    field.value += event.key;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    const end = field.value.length;
    field.setSelectionRange(end, end);
  }
});
window.addEventListener("focus", focusFrontTypingApp);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") focusFrontTypingApp();
});

requestAnimationFrame(() => {
  openApp("about");
  updateChrome();
});
