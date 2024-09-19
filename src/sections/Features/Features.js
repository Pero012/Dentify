import React from 'react';
import './Features.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import IconList from '../../components/IconList/IconList';
import featuresData from './FeaturesData';

const Features = () => {
    return (
        <section className='section-bg section-common features-section pt-100 pb-70' data-aos="fade-up" data-aos-duration="2000">
            <div className="container">
            <SectionTitle 
    subTitle="Our Advantages" 
    title="Tailored Dental Care with Expertise and Compassion" 
    description="At our practice, we believe that exceptional dental care is both an art and a science. 
    Our team of experienced dentists offers specialized treatments designed to meet your unique needs. 
    With a focus on personalized care, advanced techniques, and a compassionate approach, we strive to make each visit a positive experience."
/>


                <div className="row align-items-center">
                    {featuresData.map((singleFeature, index) => (
                        <IconList 
                            key={index}
                            icon={singleFeature.icon} 
                            title={singleFeature.title}
                            description={singleFeature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
