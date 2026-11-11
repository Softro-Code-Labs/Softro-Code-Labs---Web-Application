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
  mascot: { src: "/work/ola-kids-mascot.webp", width: 540, height: 1142, frame: "phone", alt: "OlaSauras, a friendly green dinosaur, introducing himself in a speech bubble and inviting the child on a letter adventure", caption: "OlaSauras says hello and invites the child on a letter adventure." },
  profile: { src: "/work/ola-kids-profile.webp", width: 540, height: 1142, frame: "phone", alt: "Ola Kids profile screen where a child picks an animal friend, enters a name and chooses English or Sinhala", caption: "Each child picks an animal, a name and a language." },
} satisfies Record<string, Shot>;

const baileyn = {
  phone: { src: "/work/baileyn-phone.webp", width: 540, height: 1169, frame: "phone", alt: "Baileyn store home page on a phone, with English and Sinhala language buttons, the cart and an Order now button", caption: "On a phone, where most customers order." },
  pressing: { src: "/work/baileyn-pressing.webp", width: 1200, height: 750, frame: "browser", alt: "Baileyn home page chapter At the mill: a 3D bottle tilted as oil pours into it, beside the headline Pressed the traditional way, then filtered", caption: "The home page tells the oil's story with a 3D bottle that moves as you scroll." },
  product: { src: "/work/baileyn-cart.webp", width: 1200, height: 750, frame: "browser", alt: "Baileyn cart page showing the delivery fee for the chosen district before anyone orders", caption: "The cart shows the delivery fee for the chosen district before anyone orders." },
  checkout: { src: "/work/baileyn-checkout.webp", width: 1200, height: 750, frame: "browser", alt: "Baileyn checkout with steps for cart, details and confirmation, fields for name, mobile number and district, and an order summary with a Place order button", caption: "Guest checkout: a mobile number and a district, then pay on delivery." },
  sinhala: { src: "/work/baileyn-track.webp", width: 1200, height: 750, frame: "browser", alt: "Baileyn order tracking page with fields for order number and mobile number, and a one-time SMS code", caption: "Order tracking: the order number and mobile number, then a one-time SMS code." },
} satisfies Record<string, Shot>;

const tourvista = {
  home: { src: "/work/tourvista-home.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista Tours home page with the headline Your Journey to Serendipity Starts Here and a landmark search box", caption: "The landing page and its landmark search." },
  packages: { src: "/work/tourvista-packages.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista packages page with a destination search, a budget filter and tour cards for Kandy and Wilpattu showing prices", caption: "Packages, with search and a budget filter." },
  heritage: { src: "/work/tourvista-heritage.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista attractions page section Ancient Wonders and Sacred Heritage, with cards for Sigiriya, Galle Fort and Dambulla Cave Temple", caption: "Attractions are grouped by theme, from ancient heritage to wildlife." },
  beaches: { src: "/work/tourvista-beaches.webp", width: 1200, height: 750, frame: "browser", alt: "Tourvista attractions page section Sri Lankan Beaches, with cards for Hikkaduwa, Talpe, Mirissa, Unawatuna, Weligama and Bentota", caption: "Each place has its own card and page." },
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
    gallery: [ola.guide, ola.trace, ola.celebrate, ola.traceSinhala, ola.welcome, ola.mascot, ola.profile],
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
    gallery: [baileyn.pressing, baileyn.product, baileyn.checkout, baileyn.sinhala, baileyn.phone],
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
      "WhatsApp contact and links to Facebook, Instagram and TikTok",
      "Privacy, terms and cancellation pages",
      "Page titles, descriptions and share images written for search",
    ],
    stands: "The site is live.",
    status: "Live",
    tint: "#22b8cf",
    link: { href: "https://tourvistatours.com/", label: "Visit Tourvista Tours" },
    screen: tourvista.home,
    accent: tourvista.packages,
    gallery: [tourvista.home, tourvista.packages, tourvista.heritage, tourvista.beaches],
  },
];

/** Swift Converter Hub, our own product, shown on The Lab page. */
export const labShots = {
  home: { src: "/work/sch-home.webp", width: 1200, height: 750, frame: "browser", alt: "Swift Converter Hub home page with the headline Convert files without uploading them, a drop zone and the most used tools", caption: "Drop any file and it lists every tool that can open it." },
  convert: { src: "/work/sch-tool-convert.webp", width: 1200, height: 872, frame: "browser", alt: "Swift Converter Hub in dark mode converting a PNG to WebP, showing the file shrinking from 82.95 KB to 17.38 KB with a Download button and the note Runs on your device, nothing is uploaded", caption: "A real conversion: 83 KB down to 17 KB, without leaving the browser." },
  menu: { src: "/work/sch-menu-dark.webp", width: 2000, height: 1505, frame: "browser", wide: true, alt: "Swift Converter Hub All tools menu in dark mode, listing every tool in six studios: Image, Audio, Video, Document, Data and Text", caption: "One menu holds all 46 tools, grouped into six studios." },
  password: { src: "/work/sch-tool-password.webp", width: 1200, height: 872, frame: "browser", alt: "Swift Converter Hub password generator in dark mode with a coloured password, a Very strong rating and Password, Passphrase and PIN modes", caption: "The password generator, one of the 13 text tools. Dark mode follows the visitor's setting." },
  phone: { src: "/work/sch-phone.webp", width: 540, height: 1169, frame: "phone", alt: "Swift Converter Hub home page on a phone with the headline and the drop zone", caption: "It works the same on a phone." },
} satisfies Record<string, Shot>;

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
