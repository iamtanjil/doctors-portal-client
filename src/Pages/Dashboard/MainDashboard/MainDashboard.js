import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const MainDashboard = () => {
    const { user } = useContext(AuthContext);
    const url = `https://doctors-portal-server-orpin-ten.vercel.app/bookings?email=${user?.email}`
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: () => fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    });
    return (
        <div className='p-5 mx-auto'>
            <h3 className="text-3xl mb-7">My Appointment</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings &&
                            bookings?.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.patient}</td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.appoinmentDate}</td>
                                    <td>{booking.slot}</td>
                                    <td>
                                        {
                                            booking.price && !booking.paid && <Link to={`dashboard/payment/${booking._id}`}>
                                                <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white btn-sm'>Pay Now</button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid && <button className='btn btn-accent btn-sm text-white'>Successfully Paid</button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainDashboard;