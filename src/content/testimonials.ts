export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

/**
 * Add only words a client has actually said or approved.
 * The testimonial section stays hidden while this list is empty.
 */
export const testimonials: Testimonial[] = [];
