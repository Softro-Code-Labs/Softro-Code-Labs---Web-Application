const headers = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

export default {
  poweredByHeader: false,
  // One 404 page for both languages (src/app/global-not-found.tsx), because the page layout sits inside the language folder.
  experimental: { globalNotFound: true },
  async headers() {
    return [{ source: "/(.*)", headers }];
  },
};
