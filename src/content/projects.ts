export type Slug = "ola-kids" | "baileyn" | "tourvista-tours";

export type Project = {
  slug: Slug;
  name: string;
  kind: string;
  summary: string;
  tech: string[];
  need: string[];
  built: string[];
  stands: string;
  /** A two or three word status shown as a badge, such as "Live". */
  status: string;
  /** The colour of the glow behind the project's screens. */
  tint: string;
  link?: { href: string; label: string };
  /** The screen shown in the sloped panel on the Home, Work and case study pages. */
  screen: Shot;
  /** A second screen layered with the first in the panel, from tablet width up. */
  accent?: Shot;
  /** All screens, shown on the case study page. */
  gallery: Shot[];
};

/**
 * A real screenshot in public/work.
 * frame: "browser" for a desktop page, "phone" for an upright phone screen, "phone-wide" for a sideways one.
 */
export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  frame: "browser" | "phone" | "phone-wide";
  /** Show larger (three quarters of the gallery width, beside a phone), for screens with lots of small text. */
  wide?: boolean;
};

/** The translatable parts of a project and a screenshot, used by si/projects.ts. */
export type ProjectText = Pick<Project, "kind" | "summary" | "tech" | "need" | "built" | "stands" | "status"> & { linkLabel?: string };
export type ShotText = Pick<Shot, "alt" | "caption">;
export type Service = { name: string; short: string; long: string; example: { label: string; href: string } };
export type Step = { name: string; text: string };

/**
 * The wider range of software we can build, beyond the core services.
 * These are things we can build, not past projects: real projects belong in `projects` above.
 */
export type CapabilityId =
  | "erp-crm"
  | "business"
  | "inventory-pos"
  | "booking"
  | "saas"
  | "web-platforms"
  | "lms"
  | "cloud"
  | "ai"
  | "automation"
  | "integrations"
  | "custom"
  | "desktop"
  | "enterprise";
export type CapabilityGroupId = "run" | "online" | "smarter" | "bespoke";
export type CapabilityText = { name: string; text: string };
export type Capability = CapabilityText & { id: CapabilityId };
export type CapabilityGroup = CapabilityText & { id: CapabilityGroupId; items: Capability[] };

const ola = {
  guide: { src: "/work/ola-kids-guide.webp", width: 1200, height: 470, frame: "phone-wide", alt: "Ola Kids Show Me guide drawing a capital B, with a large dot moving down the first stroke and the dots ahead still pale, beside a football picture and OlaSauras", caption: "Show Me: a moving dot draws each stroke in order before the child tries." },
  trace: { src: "/work/ola-kids-trace-g.webp", width: 1200, height: 470, frame: "phone-wide", alt: "Ola Kids tracing screen with a capital G traced in blue and a small g still to trace, beside a grapes picture and the OlaSauras mascot", caption: "Tracing. The capital G is done; the small g is next." },
  celebrate: { src: "/work/ola-kids-celebrate-g.webp", width: 1200, height: 470, frame: "phone-wide", alt: "Ola Kids celebration screen saying You did it, with confetti, a grapes picture, the word Grapes and OlaSauras jumping", caption: "A finished letter earns a star and a celebration." },
  traceSinhala: { src: "/work/ola-kids-trace-sinhala.webp", width: 1200, height: 470, frame: "phone-wide", alt: "Ola Kids tracing screen for the Sinhala letter අ with dotted guides, a mango picture and Sinhala captions", caption: "The same tracing in Sinhala, with every caption translated." },
  home: { src: "/work/ola-kids-home.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids home screen greeting the child by name, with a star count and Letters and Numbers activities", caption: "Home: a greeting, stars earned and the activities." },
  welcome: { src: "/work/ola-kids-welcome.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids welcome screen with the Trace the O app icon, the heading Welcome to OlaKids! and a Next button", caption: "Welcome: the first screen a new child sees." },
  meet: { src: "/work/ola-kids-meet.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids screen titled Meet OlaSauras!, with the friendly green dinosaur beside a waving hand above a card about how he will learn with the child", caption: "Meet OlaSauras, the little dinosaur who learns alongside the child." },
  homeLion: { src: "/work/ola-kids-home-lion.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids home screen with a lion avatar and the greeting Good evening, a My Stars bar at 0 of 35, Letters and Numbers cards with Start buttons, Writing and Listening marked Coming soon, and OlaSauras below", caption: "Each child's home screen shows their animal, their stars and what to learn next." },
  profile: { src: "/work/ola-kids-profile.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids profile screen where a child picks an animal friend, enters a name and chooses English or Sinhala", caption: "Each child picks an animal, a name and a language." },
} satisfies Record<string, Shot>;

const baileyn = {
  phone: { src: "/work/baileyn-phone.webp", width: 335, height: 751, frame: "phone", alt: "Baileyn store home page on a phone, with English and Sinhala language buttons, the cart, a 3D bottle between two coconuts and an Order now button", caption: "On a phone, where most customers order." },
  pressing: { src: "/work/baileyn-pressing.webp", width: 1200, height: 549, frame: "browser", alt: "Baileyn home page with the headline From our palms to your pan, Order now and Order on WhatsApp buttons, and a glowing 3D bottle of white coconut oil between two coconuts", caption: "The home page opens with a 3D bottle that follows the oil's story as you scroll." },
  estate: { src: "/work/baileyn-estate.webp", width: 355, height: 798, frame: "phone", alt: "Baileyn home page chapter From the estate on a phone, with the 3D bottle between two halves of a coconut above the headline One ingredient: coconut, and a bar with WhatsApp and Order now buttons", caption: "Scroll on and the bottle turns to each chapter, starting on the estate." },
  product: { src: "/work/baileyn-cart.webp", width: 355, height: 798, frame: "phone", alt: "Baileyn cart on a phone with a 1 litre bottle of white coconut oil and an order summary showing the delivery fee for Colombo and the total to pay on delivery", caption: "The cart shows the delivery fee for the chosen district before anyone orders." },
  checkout: { src: "/work/baileyn-checkout.webp", width: 1200, height: 549, frame: "browser", alt: "Baileyn checkout with steps for cart, details and confirmation, fields for name, mobile number, email and district, and an order summary with a Place order button", caption: "Guest checkout: a mobile number and a district, then pay on delivery." },
  sinhala: { src: "/work/baileyn-track.webp", width: 355, height: 798, frame: "phone", alt: "Baileyn order tracking page on a phone with fields for order number and mobile number, and a Send code button for a one-time SMS code", caption: "Order tracking: the order number and mobile number, then a one-time SMS code." },
  dashboard: { src: "/work/baileyn-admin-dashboard.webp", width: 1200, height: 549, frame: "browser", alt: "Baileyn store admin dashboard with a sales chart, orders counted by status from New to Cancelled, a low stock panel and message alerts", caption: "The store admin: sales, orders by status, low stock and failed messages at a glance." },
  order: { src: "/work/baileyn-admin-order.webp", width: 1200, height: 549, frame: "browser", alt: "Baileyn admin order page with buttons to start preparing or mark dispatched, a status menu open with Processing, Dispatched and Cancelled, the items and the order history", caption: "Staff move each order along, with an optional note at every step. Customer details are blurred here." },
} satisfies Record<string, Shot>;

const tourvista = {
  home: { src: "/work/tourvista-dark-home.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista Tours home page in the dark theme with the headline Your Journey to Serendipity Starts Here, a Where do you want to go? search box and quick links for Sigiriya, Ella Rock, Galle Fort and Nine Arch Bridge", caption: "The landing page and its landmark search, here in the dark theme." },
  packages: { src: "/work/tourvista-dark-packages.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista packages page with tour cards for Southern Shores and Marine Life Expedition, The Sacred City and Sigiriya Rock Climb, and Deep South Leopard and Elephant Safari, each with a price per person, days and a Book now button", caption: "Tour packages show the price per person, the length and a Book now button." },
  adminContent: { src: "/work/tourvista-admin-content.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista admin studio managing the Ancient Wonders and Sacred Heritage attractions, with cards for Sigiriya Rock Fortress and Galle Fort and buttons to add and view gallery items", caption: "The admin studio: attractions are grouped by theme, each with its own photo gallery." },
  adminTours: { src: "/work/tourvista-admin-tours.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista admin Tour Manager with counts for total, live and hidden tours, a search with price filters and a Live only switch, and four tour cards with prices", caption: "The Tour Manager: every tour, live or hidden, with search and price filters." },
  attractions: { src: "/work/tourvista-phone-attractions.webp", width: 540, height: 1169, frame: "phone", alt: "Tourvista Ancient Wonders and Sacred Heritage section on a phone, with a card for Sigiriya Rock Fortress, Lion Rock Kingdom", caption: "Attractions on a phone, grouped by theme." },
  package: { src: "/work/tourvista-phone-package.webp", width: 540, height: 1169, frame: "phone", alt: "Tourvista tour overview on a phone for Southern Shores and Marine Life Expedition, with location, 4 days, 1 to 15 guests, 120 dollars per person and a Proceed to reservation button", caption: "Each tour shows its length, group size and price before booking." },
  editor: { src: "/work/tourvista-phone-editor.webp", width: 540, height: 1169, frame: "phone", alt: "Tourvista admin Edit Package screen on a phone with a Live switch, cover photo, title, location, duration, vehicle type and guest limits, and an Update Package button", caption: "Staff can edit a tour, or take it offline, from a phone." },
  menu: { src: "/work/tourvista-phone-menu.webp", width: 540, height: 1169, frame: "phone", alt: "Tourvista Admin Studio menu on a phone with System Overview, Attractions, Culture, Showcases, Manage Tours, Reservations Hub, Payments Hub and Customer Base", caption: "The admin studio covers content, tours, bookings, payments and customers." },
} satisfies Record<string, Shot>;

export const projects: Project[] = [
  {
    slug: "ola-kids",
    name: "Ola Kids",
    kind: "Mobile app for Android and iOS",
    summary:
      "A handwriting app that teaches children English and Sinhala letters by tracing them. It works with no internet, no ads and no accounts.",
    tech: ["Flutter", "Dart", "SQLite", "On-device text-to-speech"],
    need: [
      "Young children need to learn letters and numbers before they can read instructions. So the app had to guide small hands with pictures, sound and encouragement.",
      "It also had to teach both English and Sinhala, run on everyday phones, and keep every child's data on the device.",
    ],
    built: [
      "Tracing for English A to Z, Sinhala letters and numbers 1 to 9",
      "Animated guides that show where to start and which way to go",
      "A trace checker that confirms a child stayed on the letter, covered enough of it and skipped nothing",
      "OlaSauras, a mascot who speaks English and Sinhala with on-screen captions",
      "Separate profiles and saved progress for several children on one phone",
      "Stars and gentle encouragement instead of scolding",
      "Support for reduced motion, larger text and screen readers",
      "The Trace the O brand identity, app icons and animated launch screen",
    ],
    stands: "The Android client test build is ready, and the app is being prepared for Google Play and the App Store.",
    status: "Test build ready",
    tint: "#8b5cf6",
    screen: ola.home,
    accent: ola.guide,
    gallery: [ola.guide, ola.trace, ola.celebrate, ola.traceSinhala, ola.welcome, ola.meet, ola.profile, ola.homeLion],
  },
  {
    slug: "baileyn",
    name: "Baileyn",
    kind: "Online store",
    summary:
      "A coconut oil store in English and Sinhala. Customers order on their phone, track by SMS code and pay at the door.",
    tech: ["Next.js", "Supabase"],
    need: [
      "Baileyn sells white coconut oil from its own estate in Sri Lanka. It needed a store that works the way its customers buy: on a phone, in their own language, paying when the order arrives.",
      "The site also had to tell the story of the oil, from the palm to the bottle.",
    ],
    built: [
      "English and Sinhala versions of the store",
      "A home page that follows the oil through six steps, from estate to kitchen",
      "Product pages with size options, a cart and a buy-now route",
      "Guest checkout with cash on delivery, so nobody needs an account",
      "Delivery fees based on district and order size, shown before ordering",
      "Order tracking with an order number and a one-time SMS code",
      "WhatsApp ordering alongside the online store",
    ],
    stands: "The store is complete and online.",
    status: "Live",
    tint: "#f5a524",
    link: { href: "https://baileynstore.com/", label: "Visit the Baileyn store" },
    screen: baileyn.phone,
    accent: baileyn.pressing,
    gallery: [baileyn.pressing, baileyn.checkout, baileyn.dashboard, baileyn.order, baileyn.phone, baileyn.estate, baileyn.product, baileyn.sinhala],
  },
  {
    slug: "tourvista-tours",
    name: "Tourvista Tours",
    kind: "Travel website",
    summary: "A travel site that helps visitors explore Sri Lanka, compare tour packages and plan a trip.",
    tech: ["Next.js"],
    need: [
      "Tourvista is a tour company in Galle offering curated and tailor-made Sri Lanka tours. It needed one place where travellers could discover the island and plan a trip with local guides.",
    ],
    built: [
      "A landing page with a landmark search and travel categories",
      "Attractions and culture sections that present Sri Lanka as a destination",
      "A packages page with search and a budget filter",
      "A reservations section for booking",
      "An admin studio to manage attractions, culture, tours, reservations, payments and customers",
      "WhatsApp contact and links to Facebook, Instagram and TikTok",
      "Privacy, terms and cancellation pages",
      "Page titles, descriptions and share images written for search",
    ],
    stands: "The site is live.",
    status: "Live",
    tint: "#22b8cf",
    link: { href: "https://tourvistatours.com/", label: "Visit Tourvista Tours" },
    screen: tourvista.package,
    accent: tourvista.home,
    gallery: [tourvista.home, tourvista.packages, tourvista.adminContent, tourvista.adminTours, tourvista.attractions, tourvista.package, tourvista.editor, tourvista.menu],
  },
];

/** Swift Converter Hub, our own product, shown on The Lab page. */
export const labShots = {
  home: { src: "/work/sch-home.webp", width: 1200, height: 574, frame: "browser", alt: "Swift Converter Hub home page with the headline Convert files without uploading them, a drop zone that accepts images, audio, video, PDFs, Office files and data, and the most used tools below", caption: "Drop any file and it lists every tool that can open it." },
  menu: { src: "/work/sch-menu-dark.webp", width: 1200, height: 574, frame: "browser", alt: "Swift Converter Hub All tools menu listing every tool in six studios: Image, Audio, Video, Document, Data and Text", caption: "One menu holds all 46 tools, grouped into six studios." },
  privacy: { src: "/work/sch-privacy.webp", width: 1200, height: 574, frame: "browser", alt: "Swift Converter Hub section How your files stay on your device, with three steps: the tool loads into your browser, your device does the work, and the result saves back to your device", caption: "The site explains how files stay on the visitor's device, and how to check it." },
  docs: { src: "/work/sch-docs.webp", width: 1200, height: 574, frame: "browser", alt: "Swift Converter Hub Document Suite page with 8 tools, including cards for Merge PDF Files, Split PDF Pages and Compress PDF, and a filter box", caption: "Each studio has its own page. The Document Suite holds 8 PDF and Office tools." },
  search: { src: "/work/sch-phone-search.webp", width: 355, height: 798, frame: "phone", alt: "Swift Converter Hub search on a phone, listing recently used tools such as Password Generator and Image to PDF, then popular tools", caption: "Search finds any tool and remembers the ones used recently." },
  nav: { src: "/work/sch-phone-menu.webp", width: 355, height: 798, frame: "phone", alt: "Swift Converter Hub menu on a phone with the Image Studio open, showing its 8 tools, and the other five studios with their tool counts", caption: "On a phone, the studios fold open one at a time." },
  convert: { src: "/work/sch-tool-convert.webp", width: 355, height: 798, frame: "phone", alt: "Swift Converter Hub Image Format Converter on a phone, with the note Runs on your device, nothing is uploaded, and popular conversions such as JPG to PNG and HEIC to JPG", caption: "The image converter handles 155 formats, right on the phone." },
  password: { src: "/work/sch-tool-password.webp", width: 355, height: 798, frame: "phone", alt: "Swift Converter Hub password generator on a phone with a coloured password, Copy and New password buttons, and a Very strong rating", caption: "The password generator, one of the 13 text tools." },
} satisfies Record<string, Shot>;

/* ---------------------------------------------------------------- The Lab's commercial apps */

const surelane = {
  today: { src: "/work/surelane-today.webp", width: 1200, height: 575, frame: "browser", alt: "Surelane Today page with the next search time, a timeline of the 8:00 AM, 12:30 PM and 5:00 PM searches all marked Searched, counts of jobs found, new today, strong, good and potential matches, and the best match at 90%", caption: "Today: the next search, the day's three searches and the best matches." },
  applications: { src: "/work/surelane-applications.webp", width: 1200, height: 575, frame: "browser", alt: "Surelane Applications page with counts for Saved, Interested, Applied, Interview, Shortlisted and Offer Received, and a Full-Stack Developer job marked 80% Strong with a stage menu and a Move to Applied button", caption: "Each application moves from saved to offer, with a note at every step." },
  sources: { src: "/work/surelane-sources.webp", width: 1200, height: 575, frame: "browser", alt: "Surelane Job sources page listing ITPro.lk, Jobpal.lk, Govjobs.lk, Govdoc Jobs and Himalayas, each marked Checked with the number of listings and when they were read", caption: "Every source is shown with what happened last time, and what is never read." },
  storage: { src: "/work/surelane-storage.webp", width: 1200, height: 575, frame: "browser", alt: "Surelane Storage page showing database usage, stored job records, the last and next daily cleanup, and a 30 day retention period", caption: "Job data is deleted after 30 days, and the page shows exactly when." },
  jobs: { src: "/work/surelane-phone-jobs.webp", width: 355, height: 798, frame: "phone", alt: "Surelane Jobs for you on a phone, with 14 open vacancies, match filters, a panel to search more job sites with the CV, and an iOS Developer Intern job matched at 90% Strong", caption: "Jobs for you: only open vacancies, each ranked against the CV." },
  match: { src: "/work/surelane-phone-match.webp", width: 355, height: 798, frame: "phone", alt: "Surelane job details on a phone with the job facts, a How you match note, the skills the person has in green and the skills to add in amber, and an Apply on site button", caption: "Each job shows the skills you share, and the ones to add." },
  insights: { src: "/work/surelane-phone-insights.webp", width: 355, height: 798, frame: "phone", alt: "Surelane Career insights on a phone, listing the skills matching jobs ask for most, such as Communication, Problem Solving and Linux, with links to free courses", caption: "Career insights point to free courses for the skills jobs ask for most." },
  settings: { src: "/work/surelane-phone-settings.webp", width: 355, height: 798, frame: "phone", alt: "Surelane Search settings on a phone with switches for the Surelane agent, local job opportunities, global job opportunities and match emails", caption: "Switches for local and global jobs, and for the email alerts." },
} satisfies Record<string, Shot>;

const framecraft = {
  images: { src: "/work/framecraft-images.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft creating images: the Image tab with the FLUX.2 klein model, a prompt for an astronaut in a sunflower field, a gold Create button, and a gallery of results including a poster, a hummingbird, a coffee cup and a fox in snow", caption: "Pick a model, describe the picture and press Create. Every result joins the gallery." },
  welcome: { src: "/work/framecraft-welcome.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft in Video mode on a first visit, with the LTX-2.5 model that makes video with sound, a prompt box, a start-image drop zone, and a Let's create something guide in three steps", caption: "Video mode: LTX-2.5 makes short clips with sound, and a three-step guide helps on the first visit." },
  chat: { src: "/work/framecraft-chat.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft Edit in chat beside a rainy street café picture, with earlier versions and instructions such as make it a bright sunny morning and add a red bicycle", caption: "Edit in chat: each message changes the picture, and every version is kept." },
  download: { src: "/work/framecraft-download.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft asking before it downloads the Wan 2.2 video model: an 18 GB download, the free space before and after, where it will be saved and about how long it takes, with Download and Not now buttons", caption: "Before a model downloads, Framecraft shows its size, the free space left and where it will go." },
  viewer: { src: "/work/framecraft-viewer.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft viewer showing a photo-like portrait of an astronaut in a sunflower field, with its prompt, seed, size, steps, time and graphics memory used, and buttons to edit in chat, reuse settings, show in folder or delete", caption: "Every result keeps its prompt, seed and settings, ready to edit in chat or reuse." },
  models: { src: "/work/framecraft-models.webp", width: 1200, height: 675, frame: "browser", alt: "Framecraft Models window listing video models such as LTX-2.5, Wan 2.2 and MiniMax H3 and image models such as Qwen-Image 2.1, FLUX.2 klein and Ideogram 4, each with its size, status and buttons to download or load", caption: "Models download when first needed, or load from a drive you already have." },
} satisfies Record<string, Shot>;

const autoledger = {
  login: { src: "/work/autoledger-login.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger sign-in screen with the headline Every service. Every rupee., a list of what the app does and a Welcome back form with email, password and a Keep me logged in option", caption: "Each person signs in to their own private ledger." },
  dashboard: { src: "/work/autoledger-dashboard.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger dashboard with total spend, this month, the monthly average and the odometer, a monthly spend chart, a category donut chart and recent expenses", caption: "The dashboard: this month against last, a 12-month chart and the share per category." },
  addExpense: { src: "/work/autoledger-add-expense.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger Add expense form with item, category, vendor, date, odometer, unit cost and quantity, and the total worked out as LKR 126,000", caption: "Adding an expense: the total works itself out from the cost and quantity." },
  log: { src: "/work/autoledger-expense-log.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger expense log with search, category, vendor and date filters, totals, an Export CSV button and a table of services, parts and fuel with coloured category badges", caption: "The expense log searches, filters and exports exactly what's on screen." },
  categories: { src: "/work/autoledger-categories.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger Categories and vendors page with a card for each category, such as Brakes, Fuel, Service and Tyres, showing how many expenses it has, the last date and its total spend on a coloured bar", caption: "Each category shows its total spend, and its colour carries through the charts." },
  backups: { src: "/work/autoledger-backups.webp", width: 1200, height: 750, frame: "browser", alt: "AutoLedger administrator Backups page showing the last backup, the next automatic backup in 30 minutes, the stored snapshots and buttons to back up now, import or restore", caption: "Backups run every 30 minutes, and any of them can be restored in one click." },
} satisfies Record<string, Shot>;

export type LabAppSlug = "surelane" | "framecraft" | "autoledger";

/** A commercial app from the Lab. Each has its own page at /lab/{slug}; its words are in ui.apps. */
export type LabApp = {
  slug: LabAppSlug;
  name: string;
  /** The square app icon in public/work. */
  icon: string;
  /** The colour of the glow behind the app's screens. */
  tint: string;
  /** For search engines (schema.org): where it runs and what kind of app it is. */
  platform: "Web" | "Windows";
  category: "BusinessApplication" | "MultimediaApplication" | "FinanceApplication";
  /** The screen in front, and the one behind it, at the top of the app's page. */
  screen: Shot;
  accent?: Shot;
  /** All screens, shown on the app's page. The first desktop one also appears on The Lab page. */
  gallery: Shot[];
};

/** In the order they appear, after Swift Converter Hub. */
export const labApps: LabApp[] = [
  {
    slug: "surelane",
    name: "Surelane",
    icon: "/work/surelane-icon.webp",
    tint: "#6f5cf0",
    platform: "Web",
    category: "BusinessApplication",
    screen: surelane.jobs,
    accent: surelane.today,
    gallery: [surelane.today, surelane.applications, surelane.sources, surelane.storage, surelane.jobs, surelane.match, surelane.insights, surelane.settings],
  },
  {
    slug: "framecraft",
    name: "Framecraft",
    icon: "/work/framecraft-icon.webp",
    tint: "#c9a56a",
    platform: "Windows",
    category: "MultimediaApplication",
    screen: framecraft.images,
    accent: framecraft.viewer,
    gallery: [framecraft.images, framecraft.chat, framecraft.welcome, framecraft.viewer, framecraft.models, framecraft.download],
  },
  {
    slug: "autoledger",
    name: "AutoLedger",
    icon: "/work/autoledger-icon.webp",
    tint: "#2dd4bf",
    platform: "Windows",
    category: "FinanceApplication",
    screen: autoledger.dashboard,
    accent: autoledger.categories,
    gallery: [autoledger.dashboard, autoledger.addExpense, autoledger.log, autoledger.categories, autoledger.backups, autoledger.login],
  },
];

export const studios = [
  { name: "Text", tools: 13 },
  { name: "Image", tools: 8 },
  { name: "Document", tools: 8 },
  { name: "Data", tools: 7 },
  { name: "Audio", tools: 5 },
  { name: "Video", tools: 5 },
];

export const services: Service[] = [
  {
    name: "Mobile apps",
    short: "Android and iOS apps your customers will love to use, including apps that work offline.",
    long: "For ideas that belong in your customers' hands. We build one app for both Android and iOS, with offline use and English or Sinhala wherever you need it.",
    example: { label: "Ola Kids", href: "/work/ola-kids" },
  },
  {
    name: "Online stores",
    short: "Stores that make buying easy, from Sinhala product pages to cash on delivery.",
    long: "For sellers who want their own store instead of a marketplace. You get product pages, a cart, guest checkout, delivery rules and order tracking, all set up the way your customers like to buy.",
    example: { label: "Baileyn", href: "/work/baileyn" },
  },
  {
    name: "Websites and web apps",
    short: "Fast, mobile-friendly websites and web apps that bring in enquiries, bookings and sales.",
    long: "For businesses that want to be found, trusted and chosen. You get a fast site that works beautifully on phones, with clear pages, search basics and easy ways to get in touch, such as WhatsApp.",
    example: { label: "Tourvista Tours", href: "/work/tourvista-tours" },
  },
  {
    name: "Browser tools and custom software",
    short: "Software shaped around the way your business works, from handy tools to complete systems.",
    long: "For jobs that off-the-shelf software handles badly. We learn how you work, then build a tool or system that fits it, and keep it simple to use.",
    example: { label: "Swift Converter Hub", href: "/lab" },
  },
];

export const steps: Step[] = [
  { name: "We listen", text: "You tell us about your idea, your customers and your goals. We ask the right questions." },
  { name: "We design", text: "You see and approve every screen before we write any code." },
  { name: "We build", text: "You get a working preview early, so you can try it as it grows." },
  { name: "We launch", text: "We put it live, test it with real users and stay close afterwards." },
];

/** Which capabilities sit in which group, in the order they appear. Their words are below and in si/projects.ts. */
export const capabilityLayout: { id: CapabilityGroupId; items: CapabilityId[] }[] = [
  { id: "run", items: ["erp-crm", "business", "inventory-pos", "booking"] },
  { id: "online", items: ["saas", "web-platforms", "lms", "cloud"] },
  { id: "smarter", items: ["ai", "automation", "integrations"] },
  { id: "bespoke", items: ["custom", "desktop", "enterprise"] },
];

export const capabilityGroupText: Record<CapabilityGroupId, CapabilityText> = {
  run: { name: "Run your business", text: "Systems that keep your sales, stock, customers and team in one place, so you spend less time on admin." },
  online: { name: "Grow online", text: "Platforms that let you sell, teach or serve customers online, and grow right along with you." },
  smarter: { name: "Work smarter", text: "AI and automation that take repetitive work off your plate and connect the tools you already use." },
  bespoke: { name: "Made just for you", text: "When nothing off the shelf fits, we build software around the way you work." },
};

export const capabilityText: Record<CapabilityId, CapabilityText> = {
  "erp-crm": { name: "ERP and CRM systems", text: "Manage customers, sales and operations from one dashboard." },
  business: { name: "Business management systems", text: "Handle daily work like orders, staff and reports in one place." },
  "inventory-pos": { name: "Inventory and POS systems", text: "Track stock and sell in store, with sales reports you can trust." },
  booking: { name: "Booking and appointment systems", text: "Let customers book online at any time, with reminders built in." },
  saas: { name: "SaaS platforms", text: "Turn your idea into an online product people can subscribe to." },
  "web-platforms": { name: "Web-based platforms", text: "Portals, marketplaces and dashboards that work in any browser." },
  lms: { name: "Learning management systems", text: "Run courses, lessons and quizzes online, with progress tracking." },
  cloud: { name: "Cloud-based solutions", text: "Secure systems you can reach from anywhere, that grow with you." },
  ai: { name: "AI-powered applications", text: "Chat assistants, smart search and tools that understand your data." },
  automation: { name: "Automation tools", text: "Hand repetitive tasks, reminders and reports over to software." },
  integrations: { name: "API and system integrations", text: "Connect payment gateways, SMS, WhatsApp and the systems you already use." },
  custom: { name: "Custom software", text: "Built from scratch around your exact needs." },
  desktop: { name: "Desktop applications", text: "Fast, reliable software for Windows, macOS and Linux." },
  enterprise: { name: "Enterprise software", text: "Larger systems for bigger teams, built to stay secure and grow over time." },
};
