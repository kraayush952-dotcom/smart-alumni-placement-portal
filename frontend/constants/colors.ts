export const colors = {
  brand: {
    primary: "#1E4C9A",
    secondary: "#ED1C24",
  },

  background: {
    primary: "#FFFFFF",
    secondary: "#F8FAFC",
    tertiary: "#F1F5F9",
  },

  text: {
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#64748B",
    white: "#FFFFFF",
  },

  border: {
    light: "#E2E8F0",
    medium: "#CBD5E1",
  },

  status: {
    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",
    info: "#2563EB",
  },
} as const;

export type Colors = typeof colors;