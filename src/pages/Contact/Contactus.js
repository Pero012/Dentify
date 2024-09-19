import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Contactus.scss';
import ContactForm from '../../components/ContactForm/ContactForm';

const Contactus = () => {
    return (
        <>
            <section className='section-bg section-common contact-section'>
                <SectionTitle 
                    title="Contact Us"
                    description="We respond in 24h."
                />
            </section>
            <section className='contact-form-area' data-aos="fade-up" data-aos-duration="2000">
                <ContactForm />
            </section>
        </>
    );
};

export default Contactus;