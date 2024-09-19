import React from 'react';
import Banner from '../sections/Banner/Banner';
import Emergency from '../sections/Emergency/Emergency';
import Expert from '../sections/Expert/Expert';
import Features from '../sections/Features/Features';
import Services from '../sections/Services/Services';

const Home = () => {

    return (
        <>
            <Banner/>
            <Services/>
            <Emergency/>
            <Features />
            <Expert/>
        </>
    );
};

export default Home;