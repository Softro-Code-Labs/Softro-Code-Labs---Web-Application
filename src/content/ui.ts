/**
 * English wording for the site's pages and interface.
 * The Sinhala version in si/ui.ts must have exactly the same keys; the build fails if one is missing.
 * {name} style placeholders are filled in by the page. In headings, words between *asterisks* are highlighted.
 *
 * Search results: each page's `title` and `description` are what Google shows, and what appears when the page is shared.
 * " | Softro Code Labs" is added after every title except the home page's, so keep titles under about 40 characters
 * (60 for siteTitle) and descriptions under about 155.
 */
export const en = {
  meta: {
    /** The home page's title, in full. */
    siteTitle: "Software development company in Sri Lanka | Softro Code Labs",
    description:
      "Mobile apps, websites, business systems and custom software that help businesses grow. Tell Softro Code Labs your idea, and we'll bring it to life.",
    locale: "en_LK",
  },
  address: "No. 30, Robert De Zoysa Mawatha, Walagedara, Balapitiya, Sri Lanka",
  replyTime: "2 working days",

  chrome: {
    skip: "Skip to content",
    /** The first step of the breadcrumb trail that search results show. */
    home: "Home",
    work: "Work",
    services: "Services",
    lab: "The Lab",
    about: "About",
    contact: "Contact",
    start: "Start your project",
    menu: "Menu",
    close: "Close",
    mainNav: "Main",
    phoneNav: "Phone",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    otherLang: "සිංහල",
    otherLangLabel: "Read this page in Sinhala",
    privacy: "Privacy policy",
    terms: "Terms of use",
    footerPages: "Pages",
    footerLegal: "Legal",
    backToTop: "Back to top",
    tagline: "From mobile apps to complete business systems, we build software that helps businesses grow.",
  },

  home: {
    heading: "We build the *software* your business needs.",
    availability: "Open for new projects",
    lead: "From mobile apps and websites to advanced business platforms and custom software, we build digital solutions that help businesses grow. Whatever your idea, we have the technology and creativity to bring it to life.",
    whatsapp: "Chat on WhatsApp",
    seeWork: "See our work",
    /** The small note under the 3D logo on the home page. */
    dragHint: "Drag to turn",
    assurances: ["We reply within {time}", "One team from idea to launch", "English or Sinhala, your choice"],
    /** Only real numbers. Each value counts up from zero when the page opens. */
    stats: [
      { value: 3, label: "client projects across education, retail and travel" },
      { value: 46, label: "free browser tools built in our Lab" },
      { value: 2, label: "languages we build in: English and Sinhala" },
      { value: 2, label: "working days to reply to an enquiry" },
    ],
    workEyebrow: "Selected work",
    workHeading: "Projects we've brought to life",
    workLead: "Real projects for real businesses. Each one started with the same simple question: who will use this?",
    processEyebrow: "Process",
    processHeading: "How we bring your idea to life",
  },

  /** "What we build": the core services, then everything else we can build. Used on the Home and Services pages. */
  build: {
    eyebrow: "What we build",
    heading: "One team for *every kind* of software",
    lead: "Start with something we build every day, or bring us something completely new. Either way, you get one friendly team from the first idea to launch day, and beyond.",
    servicesLink: "Explore all services",
    moreEyebrow: "Beyond the core",
    moreHeading: "And that's just the start",
    moreLead: "Here are more of the systems we can build for you. Each one is shaped around your business, not the other way round.",
    ideaTitle: "Your idea could be next",
    ideaText: "Don't see what you need? Tell us anyway. If it can be built as software, we'll find a way to build it.",
    ideaCta: "Tell us your idea",
  },

  projectRow: { cta: "Read the case study", ctaLabel: "Read the {name} case study" },

  lab: {
    title: "The Lab: our own software products",
    description: "Our own products: Swift Converter Hub, 46 free file tools in your browser, and Surelane, an AI agent that finds open jobs.",
    heading: "What we build when nobody asks",
    intro: "The Lab is where we build our own products, from free tools anyone can use to commercial software. It keeps our skills sharp and lets us try new ideas with real people.",
    /** The switch between the Lab's products, on The Lab page, the home page and each product's page. */
    products: { label: "Our products", free: "Free", commercial: "Commercial" },
    productLead: "46 free file tools that run right in your browser, so your files never leave your device.",
    tryIt: "Try Swift Converter Hub",
    chip: "Runs on your device. Nothing is uploaded.",
    barsHeading: "Tools in each studio",
    howHeading: "Most converters upload your file. Ours comes to your file.",
    how: [
      { title: "The tool loads into your browser", text: "Opening a tool downloads its engine, such as ImageMagick or FFmpeg, straight into the tab." },
      { title: "Your device does the work", text: "Files go straight into the tab's memory and are processed at your computer's own speed." },
      { title: "The result saves back to your device", text: "There's no server copy to delete, because there never was one." },
    ],
    screensHeading: "A look inside Swift Converter Hub",
  },

  /** Surelane, our commercial job-search agent: its own page at /lab/surelane, and a section on The Lab page. */
  surelane: {
    title: "Surelane: AI job-search agent",
    description: "Surelane searches job sites three times a day, checks each vacancy is still open, ranks it against your CV and emails the new matches.",
    kind: "Commercial product",
    tagline: "AI job-search agent",
    lead: "Upload a CV once. Three times a day, Surelane searches permitted job sites, checks that each vacancy is still open, ranks it against the CV and emails the new matches.",
    note: "Surelane is commercial software. To use it, send us a message and we'll set it up for you.",
    ask: "Ask about Surelane",
    more: "See how Surelane works",
    facts: [
      { label: "Searches", value: "Three times a day, even when your computer is off" },
      { label: "Job sources", value: "Sri Lankan, government and global job sites, plus company career pages" },
      { label: "AI", value: "Open-source Qwen 3, with a built-in engine that works on its own" },
    ],
    stepsHeading: "A job search that runs itself",
    steps: [
      { title: "Upload a CV once", text: "Surelane reads the roles, skills and experience in it, and keeps the CV encrypted." },
      { title: "It searches three times a day", text: "At 8:00 AM, 12:30 PM and 5:00 PM Sri Lanka time, even when the computer is off." },
      { title: "Only open jobs, ranked", text: "Every vacancy is checked to be still open, then scored out of 100 against the CV." },
      { title: "New matches by email", text: "Local and global jobs arrive in separate sections, and no job is ever sent twice." },
    ],
    doesHeading: "What it does",
    does: [
      "Searches Sri Lankan, government and global job sites, plus company career pages",
      "Shows the skills a job shares with the CV, and the ones to add",
      "Gives a second opinion on the best matches with open-source AI",
      "Helps tailor a cover letter to any job",
      "Tracks each application from saved to offer",
      "Builds ready-made searches for sites it can't read, such as LinkedIn",
      "Works in a phone's browser and can be added to the home screen",
    ],
    trustHeading: "Built to be trusted",
    trust: [
      "Only reads job sites that allow it, and says plainly which ones it can't",
      "Recommends a job only if its source confirmed it in the last 3 days",
      "Keeps the CV encrypted, and never puts it in an email",
      "Deletes job data after 30 days",
      "Keeps working on its built-in engine if the AI can't start",
    ],
    screensHeading: "A look inside Surelane",
    ctaHeading: "Want to use Surelane?",
    ctaText: "Tell us a little about who will use it. We'll reply within {time} and talk you through getting started.",
  },

  testimonialsHeading: "What our clients say",

  closing: {
    heading: "Got an idea? Let's *build it* together.",
    lead: "Whether it's an app, a website or a complete business system, tell us what you need. We'll show you how we'd build it.",
    whatsapp: "Prefer WhatsApp? Message us",
    nextHeading: "What happens next",
    next: ["We reply within {time}.", "We talk through your idea, your users and your goals.", "We show you how we'd build it, and what it will cost."],
    direct: "Or reach us directly",
  },

  form: {
    label: "Start your project",
    name: "Your name",
    contact: "Email or WhatsApp number",
    kindLegend: "What would you like to build?",
    message: "Tell us about your idea",
    messageHint: "A few lines is plenty. You can write in English or Sinhala.",
    nameError: "Please enter your name.",
    contactError: "Please add an email address or WhatsApp number so we can reply.",
    messageError: "Tell us a little about your idea.",
    offline: "Your message didn't send. Check your connection and try again, or email us at",
    failed: "Sorry, our form isn't working right now. Please email us at",
    or: "or",
    whatsappLink: "message us on WhatsApp",
    send: "Send message",
    sending: "Sending message",
    sentHeading: "Thanks, we've got it!",
    sentText: "We'll reply within {time}.",
    privacyNote: "We only use your details to reply to you.",
    privacyLink: "Privacy policy",
    /** The value is what arrives in the enquiry email, so it stays in English in both languages. */
    kinds: [
      { value: "Website or web app", label: "Website or web app" },
      { value: "Mobile app", label: "Mobile app" },
      { value: "Online store", label: "Online store" },
      { value: "Business system", label: "Business system" },
      { value: "AI or automation", label: "AI or automation" },
      { value: "Custom software", label: "Custom software" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
    /** Extra choices that appear only when a page links to the form with ?interest=..., already picked. */
    interests: {
      surelane: { value: "Surelane", label: "Surelane" },
    },
  },

  contact: {
    title: "Contact us: get a quote for your project",
    description: "Tell Softro Code Labs about your idea. Send a message, email us or chat on WhatsApp, and we'll reply within 2 working days.",
    heading: "Let's talk about your idea",
    lead: "Big or small, tell us what you have in mind. A few lines is enough, and we'll reply within {time}.",
  },

  services: {
    title: "Web, app & software development services",
    description: "Mobile apps, websites, online stores, business systems, SaaS platforms, AI tools and custom software, built by one team from idea to launch.",
    heading: "Whatever you need, we can build it",
    lead: "Start with one of our core services, each backed by a real project you can look at. Or bring us something new: our skills reach well beyond what you see here.",
    example: "See a real example:",
  },

  work: {
    title: "Portfolio: apps and websites we've built",
    description: "Client projects by Softro Code Labs, including Ola Kids, Baileyn and Tourvista Tours. See what we built, and why.",
    heading: "Work we're proud of",
    lead: "Every project had a different audience and a different problem to solve. Here's what we built, and why.",
  },

  caseStudy: {
    /** The title of each case study page, such as "Baileyn: Online store". */
    title: "{name}: {kind}",
    allWork: "All work",
    needed: "The challenge",
    stands: "Where it is now",
    built: "What we built",
    screensApp: "A closer look at the app",
    screensSite: "A closer look at the site",
    next: "Next project: {name}",
    kindLabel: "Type",
    techLabel: "Built with",
  },

  about: {
    title: "About us: a software company in Sri Lanka",
    description: "Softro Code Labs is a software company in Balapitiya, Sri Lanka. We build mobile apps, websites, business systems and custom software that help businesses grow.",
    heading: "The team that turns ideas into software",
    lead: "Softro Code Labs is a software company based in Balapitiya, Sri Lanka. We design and build mobile apps, websites, business systems and custom software that work in real life, for real people.",
    storyHeading: "Our story",
    story: [
      "In Sri Lanka, many customers order on a phone, ask questions on WhatsApp, read in Sinhala and pay at the door. A lot of software ignores all of that. We started Softro Code Labs to build software that doesn't.",
      "So every project starts with one question: who will actually use this? That question gave a coconut oil store cash on delivery and order tracking by SMS. It gave young children a handwriting app that works without internet, and travellers one place to explore the island and plan a trip.",
      "Our skills reach well beyond websites and apps. We can build business systems, online platforms, automation and AI tools, and we ask the same question every time.",
      "Between client projects, we build in the Lab. Swift Converter Hub began with another simple idea: converting a file shouldn't mean handing it to someone else's server. It now has 46 free tools that run right in your browser.",
      "We're based in Balapitiya, and we'd love to hear about your idea.",
    ],
    valuesHeading: "What we care about",
    values: [
      { name: "Made to fit", text: "Software should suit the people using it: their language, their phone and the way they pay." },
      { name: "Careful with data", text: "If an app doesn't need your data, it shouldn't collect it." },
      { name: "Straight talk", text: "You'll always know what we're building, why, and what it costs." },
      { name: "Here for the long run", text: "We stay close after launch, so your software keeps up as your business grows." },
    ],
    processHeading: "How we work with you",
  },

  legal: { updated: "Last updated {date}", date: "4 November 2026" },

  notFound: {
    heading: "We couldn't find that page.",
    lead: "The link may be old, or there might be a typo in the address.",
    home: "Back to the home page",
  },
};

export type UI = typeof en;
