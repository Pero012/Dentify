import React from 'react';
import './ContactForm.scss';
import icon from '../../assets/banner/icons/Calling.png';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const navigate = useNavigate(); // Move useNavigate hook inside the component

    const formSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        alert('Thanks for the email. We will respond in 24h');
        navigate('/'); // Navigate to home page
    };

    return (
        <form onSubmit={formSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name..." />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>E-mail Address</label>
                        <input type="email" className="form-control" placeholder="Enter email address..." />
                    </div>
                </div>
           
                <div className="col-lg-12">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Messages</label>
                        <textarea className="form-control" placeholder='Enter your messages...' rows="3"></textarea>
                    </div>
                </div>

                <div className="col-lg-6">
                    <button type="submit" className="btn appointment-btn">Send</button>
                </div>
                <div className="col-lg-6">
                    <div className="appointment-call">
                        <div className='icon'>
                            <img src={icon} alt="icon" />
                        </div>
                        <div className='call-text'>
                            <p>Dental 24H Emergency</p>
                            <h6>+385 91 123 123</h6>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
