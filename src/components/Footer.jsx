import React, { useState } from 'react';
import '../styles/components/Footer.css'

const Footer = ({ changeView }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="footer-section about">
                    <h2 className="footer-title">About us</h2>
                    <p>"We are a leading company in the online payments market. Our goal is to make our customers lives easier.</p>
                </section>

                <section className="footer-section language">
                    <h2 className="footer-title"></h2>
                    <p>selecciona lenguaje</p>
                </section>

                <section className="footer-section contact">
                    <h2 className="footer-title">Contact with us</h2>
                    <ul>
                        <li>info@eazypay.com</li>
                        <li>Phone</li>
                    </ul>
                </section>
            </div>

            <div className="footer-bottom">
                <p>EazyPay | All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
