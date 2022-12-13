import React, { useState } from 'react';
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner';
import AvailableAppoinment from '../AvailableAppointment/AvailableAppoinment';

const Appoinment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className='mx-5'>
            <AppoinmentBanner
            selectedDate={selectedDate}
            setSelectedDate= {setSelectedDate}
            ></AppoinmentBanner>
            <AvailableAppoinment
            selectedDate ={selectedDate}
            ></AvailableAppoinment>
        </div>

    );
};

export default Appoinment;