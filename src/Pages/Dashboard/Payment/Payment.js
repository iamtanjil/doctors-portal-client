import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe('pk_test_51M6etLLfeDcBXGrxFdUohLr2kb7wR1GX0M5858nCaxJYlLy7eEJV7VRaBfBzWt0F5ug9I3ULHRjZHq6kWQp3IiUB00b4LLgxZF');

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, slot, appoinmentDate } = booking;
    return (
        <div className='p-5 mx-auto'>
            <h2 className='text-3xl'>Payment for {treatment}</h2>
            <h2 className='text-xl mt-3'>Please pay <strong>${price}</strong> for your appointment on <strong>{appoinmentDate}</strong> at <strong>{slot}.</strong></h2>
            <div className='w-96 p-7 shadow-lg my-12 rounded-lg'>
                <Elements stripe={stripePromise}>
                    <CheckOut
                    booking={booking}
                    ></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;