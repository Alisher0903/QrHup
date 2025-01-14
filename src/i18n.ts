import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Tarjima fayllarini import qilish
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

// Tarjima resurslarini konfiguratsiya qilish
const resources = {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
};

// i18next konfiguratsiyasi
i18n
    .use(initReactI18next) // React uchun integratsiya
    .use(LanguageDetector) // Brauzer tilini aniqlash uchun
    .init({
        resources,
        fallbackLng: "en", // Til topilmasa, standart til
        interpolation: {
            escapeValue: false, // React XSS muammosini oldini olish
        },
    });

export default i18n;
