import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentModal from '../AppoinmentModal/AppointmentModal';
import AvailableappointmentCard from './AvailableappointmentCard';

const AvailableAppoinment = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);


    const date = format(selectedDate, "PP")
    const { data: availableAppoinment = [], refetch } = useQuery({
        queryKey: ['appointmentoption', date],
        queryFn: () => fetch(`https://doctors-portal-server-orpin-ten.vercel.app/appointmentoption?date=${date}`)
            .then(res => res.json())
    });

    return (
        <div>
            <p className='text-primary text-xl font-bold text-center mt-10'>Available Appointment On: {format(selectedDate, 'PP')}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                {
                    availableAppoinment.map(options =>
                        <AvailableappointmentCard
                            key={options._id}
                            appoinmentoption={options}
                            setTreatment={setTreatment}
                        >
                        </AvailableappointmentCard>)
                }
            </div>
            {treatment &&
                <AppointmentModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></AppointmentModal>
            }
        </div>
    );
};

export default AvailableAppoinment;