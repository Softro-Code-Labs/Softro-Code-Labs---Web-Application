/**
 * English wording for the site's pages and interface.
 * The Sinhala version in si/ui.ts must have exactly the same keys; the build fails if one is missing.
 * {name} style placeholders are filled in by the page.
 */
export const en = {
  meta: {
    siteTitle: "Softro Code Labs: websites, online stores and mobile apps",
    description:
      "Softro Code Labs builds websites, online stores, mobile apps and custom web tools, shaped around how your customers actually behave.",
    locale: "en_LK",
  },
  address: "No. 30, Robert De Zoysa Mawatha, Walagedara, Balapitiya, Sri Lanka",
  replyTime: "2 working days",

  chrome: {
    skip: "Skip to content",
    work: "Work",
    services: "Services",
    lab: "The Lab",
    about: "About",
    contact: "Contact",
    start: "Start a project",
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
  },

  home: {
    /** Words between *asterisks* are highlighted. */
    heading: "Software that *fits* the people using it.",
    availability: "Open for new projects",
    lead: "We're Softro Code Labs. We build websites, online stores, mobile apps and browser tools, shaped around how your customers actually behave.",
    whatsapp: "Chat on WhatsApp",
    seeWork: "See our work",
    assurances: ["We reply within {time}", "We work in English and Sinhala"],
    /** Only real numbers. Each value counts up from zero when the page opens. */
    stats: [
      { value: 3, label: "client projects in education, retail and travel" },
      { value: 46, label: "free browser tools built in our Lab" },
      { value: 2, label: "languages we build in: English and Sinhala" },
      { value: 2, label: "working days to reply to an enquiry" },
    ],
    workEyebrow: "Selected work",
    workHeading: "What we've built so far",
    servicesHeading: "Four ways we can help",
    servicesLink: "See all services",
    processEyebrow: "Process",
    processHeading: "How a project runs",
  },

  projectRow: { cta: "See the case study", ctaLabel: "See the {name} case study" },

  lab: {
    title: "The Lab",
    description: "Our own products, including Swift Converter Hub: 46 free file tools that run inside your browser.",
    heading: "What we build when nobody asks",
    intro: "The Lab is where we build our own products. It keeps our skills sharp and lets us test ideas with real users.",
    productLead: "46 free file tools that run inside your browser, so your files never leave your device.",
    tryIt: "Try Swift Converter Hub",
    chip: "Runs on your device. Nothing is uploaded.",
    barsHeading: "Tools in each studio",
    howHeading: "Most converters upload your file. Ours comes to your file.",
    how: [
      { title: "The tool loads into your browser", text: "Opening a tool downloads its engine, such as ImageMagick or FFmpeg, into the tab." },
      { title: "Your device does the work", text: "Files go straight into the tab's memory and are processed at your computer's speed." },
      { title: "The result saves back to your device", text: "There is no server copy to delete, because there never was one." },
    ],
    screensHeading: "Screens from Swift Converter Hub",
  },

  testimonialsHeading: "What clients say",

  closing: {
    heading: "Have something you want built?",
    lead: "Tell us what it needs to do, and we'll tell you how we'd build it.",
    whatsapp: "Prefer WhatsApp? Message us",
    nextHeading: "What happens next",
    next: [
      "We reply within {time}.",
      "We talk through what it needs to do and who will use it.",
      "We tell you how we'd build it, and what it will cost.",
    ],
    direct: "Or reach us directly",
  },

  form: {
    label: "Start a project",
    name: "Your name",
    contact: "Email or WhatsApp number",
    kindLegend: "What do you need?",
    message: "What do you want to build?",
    messageHint: "",
    nameError: "Enter your name.",
    contactError: "Enter an email address or WhatsApp number so we can reply.",
    messageError: "Tell us a little about what you want to build.",
    offline: "Your enquiry didn't send. Check your connection and try again, or email us at",
    failed: "Sorry, our form isn't working right now. Please email us at",
    or: "or",
    whatsappLink: "message us on WhatsApp",
    send: "Send enquiry",
    sending: "Sending enquiry",
    sentHeading: "Enquiry sent.",
    sentText: "We'll reply within {time}.",
    privacyNote: "We only use your details to reply.",
    privacyLink: "Privacy policy",
    /** The value is what arrives in the enquiry email, so it stays in English in both languages. */
    kinds: [
      { value: "Website", label: "Website" },
      { value: "Online store", label: "Online store" },
      { value: "Mobile app", label: "Mobile app" },
      { value: "Custom tool", label: "Custom tool" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
  },

  contact: {
    title: "Contact",
    description: "Tell Softro Code Labs what you want to build. Send an enquiry, email us or message us on WhatsApp.",
    heading: "Tell us what you need",
    lead: "A few lines is enough. We'll reply within {time}.",
  },

  services: {
    title: "Services",
    description: "Websites, online stores, mobile apps and custom web tools, each backed by a real project you can see.",
    heading: "What you can hire us for",
    lead: "Every service below comes from work we've already shipped, so you can see a real example before you talk to us.",
    example: "Example:",
  },

  work: {
    title: "Work",
    description: "Client projects by Softro Code Labs: Ola Kids, Baileyn and Tourvista Tours.",
    heading: "Work we've shipped",
    lead: "Each project had a different audience and a different problem. Here is what we built and why.",
  },

  caseStudy: {
    allWork: "All work",
    needed: "What it needed",
    stands: "Where it stands",
    built: "What we built",
    screensApp: "Screens from the app",
    screensSite: "Screens from the site",
    next: "Next project: {name}",
    kindLabel: "Type",
    techLabel: "Built with",
  },

  about: {
    title: "About",
    description: "Softro Code Labs is a software studio in Balapitiya, Sri Lanka, building websites, stores, apps and tools.",
    heading: "A small lab that ships real software",
    lead: "Softro Code Labs is based in Balapitiya, Sri Lanka. We build websites, online stores, mobile apps and browser tools for people who need them to work in real life.",
    storyHeading: "Our story",
    story: [
      "In Sri Lanka, plenty of customers order on a phone, ask questions on WhatsApp, read in Sinhala and pay at the door. A lot of software ignores all of that. We started Softro Code Labs to build software that doesn't.",
      "So we begin every project with one question: who will actually use this? That question gave a coconut oil store cash on delivery and order tracking by SMS. It gave young children a handwriting app that works with no internet, and travellers one place to explore the island and plan a trip.",
      "Between client projects, we build in the Lab. Swift Converter Hub began with another simple idea: converting a file shouldn't mean handing it to someone else's server. It now has 46 free tools that run inside the browser.",
      "We're based in Balapitiya, and we're ready for the next project.",
    ],
    valuesHeading: "What we care about",
    values: [
      { name: "Fit", text: "Software should suit its users, including their language, their phone and how they pay." },
      { name: "Care with data", text: "If an app doesn't need your data, it shouldn't collect it." },
      { name: "Plain speaking", text: "You'll always know what we're building, why, and what it costs." },
    ],
    processHeading: "How we work with you",
  },

  legal: { updated: "Last updated {date}", date: "4 November 2026" },

  notFound: {
    heading: "This page doesn't exist.",
    lead: "The link may be old, or the address may have a typo.",
    home: "Go to the home page",
  },
};

export type UI = typeof en;
