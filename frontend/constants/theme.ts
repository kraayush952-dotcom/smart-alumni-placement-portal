export const theme = {
  layout: {
    maxWidth: "1280px",
    navbarHeight: "72px",
    sidebarWidth: "280px",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  transition: {
    default: "transition-all duration-300 ease-in-out",
    fast: "transition-all duration-200 ease-in-out",
  },
} as const;

export type Theme = typeof theme;