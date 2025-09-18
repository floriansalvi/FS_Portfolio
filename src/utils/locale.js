import { locales } from "../i18n";

/**
 * Returns the user's browser language if supported, otherwise defaults to 'fr'.
 */
export function getBrowserLocale() {
    const browserLocale = navigator.language || navigator.userLanguage;
    return locales.find(lang => browserLocale.startsWith(lang)) || 'fr'
}

/**
 * Returns the locale from localStorage if available and valid, otherwise uses browser locale.
 */
export function getLocalStorageLocale() {
    let locale = localStorage.getItem('locale') || getBrowserLocale();
    locale = locales.includes(locale) ? locale : 'fr';
    return locale;
}