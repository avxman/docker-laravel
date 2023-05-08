import i18n from "i18next"
import {HttpBackendOptions} from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const resources = {
    en: {
        frontend: {

        },
        admin: {

        },
    },
    uk: {
        frontend: {

        },
        admin: {

        },
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        resources,
        fallbackLng: "en",
        debug: true,
        lng: "en",
        ns: [
            'frontend',
            'admin',
        ],
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })
    .then(r => (r))
    .catch(e=>(e))

export default i18n
