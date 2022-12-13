import React from 'react';
import chair from '../../../assets/images/chair.png';
import './Banner.css'


const Banner = () => {
    return (
        <div className='banner-bg mt-5 p-10 rounded-lg'>
            <div className='banner-bg-overlay'></div>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6">We have modern well equipped Operation unit. We use modern technology including  Autoclave Machine, UV Cabinet,  Endodontic Electric Motor, Apex Locator, Intraoral camera  to offer best oral treatment. </p>
                        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;