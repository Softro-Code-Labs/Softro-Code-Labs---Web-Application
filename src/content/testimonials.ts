import type { Slug } from "./projects";

export type Testimonial = {
  /** The client's own words, one string per paragraph. Shown in English on both versions of the site. */
  quote: string[];
  /** Leave out until the client is happy to be named; the role and company are shown instead. */
  name?: string;
  role: string;
  company: string;
  /** The project the words are about. The quote also appears on that case study. */
  project: Slug;
  /** A small square photo in public/work, 96px, shown round beside the name. */
  photo?: string;
};

/**
 * Add only words a client has actually said or approved.
 * The testimonial section stays hidden while this list is empty.
 */
export const testimonials: Testimonial[] = [
  {
    quote: [
      "Excellent work! I am truly impressed with the quality of the website developed for our “Baileynstore” company. Your creativity, technical skills, attention to detail, and professional approach are highly appreciated. You clearly understood our requirements and transformed our ideas into a well-designed, modern, and user-friendly website.",
      "It was a pleasure working with you. Thank you for your dedication, commitment, and outstanding work. Highly recommended to anyone looking for a talented and reliable web developer!",
    ],
    name: "Navindu De Zoysa",
    role: "Owner",
    company: "Baileyn Estate",
    project: "baileyn",
    photo: "/work/client-baileyn.webp",
  },
  {
    // The client's text also gave the site's address after its name; it's left out because the case study links to it.
    quote: [
      "Softro Code Labs built the website for my travel agency, Tourvista Tours. From the very beginning, their team listened carefully to my vision and brought it to life on a grand scale. I am truly grateful to them for delivering exactly what my business needed.",
      "If you are looking to build your dream website, I highly recommend Softro Code Labs. Wishing the entire team a very bright future!",
    ],
    name: "H G Pushpa Kumara",
    role: "Proprietor",
    company: "Tourvista Tours",
    project: "tourvista-tours",
    photo: "/work/client-tourvista.webp",
  },
];
