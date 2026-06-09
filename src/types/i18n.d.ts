import { SUPPORTED_LOCALES } from "@/constants/i18nConfig";
import { en } from "@/translations/en";

declare global {
  type Locale = (typeof SUPPORTED_LOCALES)[number];
  type LangDir = "ltr" | "rtl";
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof en;
  }
}
