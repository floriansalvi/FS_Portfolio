import { createI18n } from "vue-i18n";

const modules = import.meta.glob('./locales/**/*.json', { eager: true });

const messages = {};
const availableLocales = new Set();

for (const path in modules) {
    const matched = path.match(/\.\/locales\/([a-z]{2})\/(.*)\.json$/);
    if (matched) {
        const locale = matched[1];
        const namespace = matched[2];
        if (!messages[locale]) messages[locale] = {}
        messages[locale][namespace] = modules[path];
        availableLocales.add(locale)
    }
}
export const locales = [...availableLocales]

export const localesLabels = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  it: "Italiano"
};

export default createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'en',
    messages
})