import React from 'react';
import './Emergency.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import EmergencyImg from '../../assets/emergency.png';
import { Link } from 'react-router-dom';

const Emergency = () => {
    return (
        <section className='emergency-section' data-aos="fade-up" data-aos-duration="2000">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="emergency-img">
                            <img src={EmergencyImg} alt="Emergency" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="emergency-text">
                        <SectionTitle
  subTitle="Dental 24/7 Care"
  title="Expert Dental Services for Your Brightest Smile"
  description="At Dental 24/7, we are dedicated to providing top-notch dental care around the clock. Our team of highly skilled dentists is committed to offering gentle, professional treatment tailored to your needs. Whether you require routine check-ups, emergency care, or cosmetic enhancements, we ensure a comfortable and compassionate experience. Trust us to keep your smile healthy and radiant with our comprehensive dental services."
/>

                            <div className="theme-btn">
                            <Link to="/appointments">Book an appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Emergency;