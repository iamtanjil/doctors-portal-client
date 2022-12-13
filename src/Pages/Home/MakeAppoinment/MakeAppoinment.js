import React from 'react';
import doctor from '../../../assets/images/doctor-small.png';
import './MakeAppointment.css'

const MakeAppoinment = () => {
    return (
        <section className='app-bg mt-36'>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} alt='' className="-mt-32 hidden md:block w-1/2 rounded-lg" />
                    <div>
                        <h1 className="text-5xl text-white font-bold">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppoinment;