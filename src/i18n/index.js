import pt from "./pt.json";
import en from "./en.json";
import es from "./es.json";

const translations = { pt, en, es };

export function getTranslation(lang = "pt") {
  return translations[lang] || translations["pt"];
}
