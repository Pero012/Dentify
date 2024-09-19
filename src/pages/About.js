import React from 'react';
import AboutBanner from '../sections/AboutBanner/AboutBanner';
import Faq from '../sections/Faq/Faq';
import Priority from '../sections/Priority/Priority';

const About = () => {
    return (
        <>
            <AboutBanner />
            <Priority />
            <Faq />
        </>
    );
};

export default About;