import React from 'react';

const AvailableappointmentCard = ({ appoinmentoption, setTreatment }) => {
    const {name, slots, price} = appoinmentoption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-primary font-bold text-2xl">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available Now.</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-center">
                    <label htmlFor="booking-modal" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white mt-5" disabled={slots.length === 0} onClick={()=> setTreatment(appoinmentoption)}>Book Appoinment</label>
                </div>
            </div>
        </div>
    );
};

export default AvailableappointmentCard;