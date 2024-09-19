import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Services.scss';
import ServicesData from './ServiceData';
import Service from '../../components/Service/Service';

const Services = () => {
    return (
        <section className='service-section pt-100 pb-70' data-aos="fade-up" data-aos-duration="2000">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <SectionTitle title="Enjoy the process" subTitle="Services"/>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <p className='service-title-text'>Get everything you need in no time.</p>
                    </div>
                </div>

                <div className="row">
                    {
                        ServicesData.map(singleService => 
                            <Service key={singleService.id} serviceList={singleService} />
                        )
                    }
                </div>

            </div>
        </section>
    );
};

export default Services;
