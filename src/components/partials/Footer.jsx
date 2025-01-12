import React, { useState, useTransition } from 'react';
import '../../styles/components/Footer.css'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';

const Footer = ({ changeView }) => {
    const{t} = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="footer-section about">
                    <h2 className="footer-title">{t('footer-about')}</h2>
                    <p>{t('footer-about-description')}</p>
                </section>

                <section className="footer-section language">
                    <h2 className="footer-title">{t('footer-language')}</h2>
                    <button className="footer-language-btn" onClick={() => changeLanguage('en')}>{t('english')}</button>
                    <button className="footer-language-btn" onClick={() => changeLanguage('es')}>{t('spanish')}</button>

                </section>

                <section className="footer-section contact">
                    <h2 className="footer-title">{t('footer-contact')}</h2>
                    <ul>
                        <li>{t('footer-contact-mail')}</li>
                        <li>{t('footer-contact-phone')}</li>
                    </ul>
                </section>
            </div>

            <div className="footer-bottom">
                <p></p>
            </div>
        </footer>
    );
};

export default Footer;
