import { colors } from "./colors";

export const boxShadow = {
  primary: "0 4px 6px 2px rgba(0, 0, 0, 0.2)",
  light: "0 3px 4px 1px rgba(0, 0, 0, 0.15)",
  xlight: `0 2px 3px 1px rgba(0, 0, 0, 0.05)`,
  input: `0 0 3px 1px ${colors.brand['primary-50']}`,
  interior: "0 0 3px 1px inset rgba(0, 0, 0, 0.2)",
  "light-interior": `inset 0 1px 2px 0 ${colors.brand['primary-10']}`,
  hero: `0 0 5px 1px ${colors.brand.primary}33`,
};
