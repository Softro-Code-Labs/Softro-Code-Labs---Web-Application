import type { ReactNode, SVGProps } from "react";

/** Line icons drawn inline, so they cost no extra downloads. All are decorative (aria-hidden). */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
export const ArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Icon>
);
export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);
export const ArrowUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Icon>
);
export const Chat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.5-4.6a8.4 8.4 0 1 1 15.5-4.3Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth={2.4} />
  </Icon>
);
export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);
export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </Icon>
);
export const Pin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-5.6-7-11.2a7 7 0 0 1 14 0C19 15.4 12 21 12 21Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </Icon>
);
export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Icon>
);
export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Icon>
);
export const Moon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z" />
  </Icon>
);
export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Icon>
);
export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
export const Browser = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" />
    <path d="M7 13h6M7 16h9" />
  </Icon>
);
export const Bag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Icon>
);
export const Smartphone = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 18.5h3" />
  </Icon>
);
export const Wrench = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 10a5.5 5.5 0 0 1-7.6 5.6L7 22l-3-3 6.4-6.4A5.5 5.5 0 0 1 16 5l-1.3 1.3Z" />
  </Icon>
);
export const Shield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Icon>
);
export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M4.5 17v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V17" />
  </Icon>
);
export const Cpu = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <path d="M9.5 9.5h5v5h-5zM9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
  </Icon>
);
export const Save = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3.5h11l3.5 3.5v11.5a2 2 0 0 1-2 2h-12.5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
    <path d="M8 3.5v5h7v-5M8 20.5v-6h8v6" />
  </Icon>
);
export const Puzzle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 4.5a2 2 0 1 1 4 0V6h4a1 1 0 0 1 1 1v4h-1.5a2 2 0 1 0 0 4H18v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 1 0-4 0V20H5a1 1 0 0 1-1-1v-4h1.5a2 2 0 1 0 0-4H4V7a1 1 0 0 1 1-1h4V4.5Z" />
  </Icon>
);
export const Quote = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 7C6.5 7.8 5 10 5 13v4h5v-5H7.3c.2-1.6 1-2.6 2.2-3.1L9.5 7ZM18.5 7c-3 .8-4.5 3-4.5 6v4h5v-5h-2.7c.2-1.6 1-2.6 2.2-3.1V7Z" />
  </Icon>
);
