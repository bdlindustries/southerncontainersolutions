/** Standard finished-office specs aligned with shop product listings (source of truth). */

export const OFFICE_20_STANDARD_SPECS = [
  '2" closed-cell spray foam insulation',
  "12,000 BTU LG mini split heat pump (AC & heat)",
  "Moisture-resistant PVC wall and ceiling panels",
  "LED interior and exterior photocell lighting",
  "Jobsite breaker panel with 10 interior outlets and 1 exterior outlet",
  'One 42" × 30" sliding window with steel security bars',
  '36" steel man door with deadbolt',
  "Operational cargo doors",
] as const;

export const OFFICE_40_STANDARD_SPECS = [
  '2" closed-cell spray foam insulation',
  "12,000 BTU LG mini split heat pump (AC & heat)",
  "Moisture-resistant PVC wall and ceiling panels",
  "4 interior LED lights + exterior photocell light",
  "Jobsite breaker panel with 18 interior outlets and 1 exterior outlet",
  'Two 42" × 30" sliding windows with steel security bars',
  '36" steel man door with deadbolt',
  "Operational cargo doors",
] as const;

export const SHOP_PRODUCT_FORM_OPTIONS = [
  { value: "scs-20-office", label: "20' Standard Office Container" },
  { value: "scs-40-office", label: "40' Standard Office Container" },
  { value: "scs-40-combo", label: "40' Office / Storage Combo" },
  { value: "scs-20-climate-storage", label: "20' Climate Controlled Storage Container" },
  { value: "scs-40-climate-storage", label: "40' Climate Controlled Storage Container" },
  { value: "custom-build", label: "Custom Build" },
] as const;