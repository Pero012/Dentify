import React from 'react';
import './Footer.scss';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import call from '../../assets/footer/calling.png';
import time from '../../assets/footer/time.png';

const Footer = () => {
    const footerMenu = [
        { name: 'Home', link: '/' },
        { name: 'About Us', link: '/about' },
        { name: 'Appointments', link: '/appointments' },
        { name: 'Contact', link: '/contact' }
    ];

    const footerContacts = [
        { title: 'Phone Number', info: '+385 91 123 123', icon: call },
        { title: 'Open Hour', info: '09:00 AM - 18:00 PM', icon: time },
    ];

    return (
        <footer className='pt-100 pb-70'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-5">
                        <p>
                            Dentify - Dental Clinic
                        </p>

                        <div className="social-logo">
                            <p>Follow us on</p>
                            <ul>
                                <li><a href="/"><FaFacebookF /></a></li>
                                <li><a href="/"><FaTwitter /></a></li>
                                <li><a href="/"><FaInstagram /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2">
                        <div className="footer-link">
                            <p>Quick Links</p>
                            <ul>
                                {footerMenu.map((singleMenu, index) => (
                                    <li key={index}>
                                        <Link to={singleMenu.link}>{singleMenu.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5">
                        <div className="footer-contact">
                            <p>Contact & Information</p>
                            {footerContacts.map((footerContact, index) => (
                                <div className="contact-list" key={index}>
                                    <div className="contact-icon">
                                        <img src={footerContact.icon} alt="contact icon" />
                                    </div>
                                    <div className="contact-text">
                                        <p>{footerContact.title}</p>
                                        <h5>{footerContact.info}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className='copy-text'>
                        <p>&copy; Dentify. All Right Reserved</p>
                    </div>  
                    <div className='copy-links'>
                        <ul>
                            <li><Link to='/'>PZI 2024</Link></li>
                        </ul>
                    </div>                          
                </div>
            </div>
        </footer>
    );
};

export default Footer;
