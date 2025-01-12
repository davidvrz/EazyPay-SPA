import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // carga desde backend
  .use(LanguageDetector) // detecta el idioma automáticamente
  .use(initReactI18next) // pasa i18n a react-i18next
  .init({
    fallbackLng: 'en', // idioma por defecto
    debug: true, // desactiva en producción

    interpolation: {
      escapeValue: false, // react ya hace escaping
    },

    backend: {
      loadPath: '/../locales/{{lng}}/translation.json', // ruta a las traducciones
    }
  });

export default i18n;
