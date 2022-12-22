import { format } from 'date-fns/esm';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AppointmentModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP')
    const { user } = useContext(AuthContext);

    const handleOnSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;


        const booking = {
            patient: name,
            treatment: treatment.name,
            email,
            phone,
            appoinmentDate: date,
            slot,
            price
        }

        fetch('https://doctors-portal-server-orpin-ten.vercel.app/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Appointment Successfully Booked');
                    refetch();
                }
                else{
                    toast.error(data.message)
                }
            })
    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleOnSubmit} className='gird grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} className="input input-bordered w-full mb-3" />
                        <select name="slot" className="select select-bordered w-full mb-3">
                            {
                                slots.map((slot, i) =>
                                    <option key={i} value={slot}>{slot}</option>
                                )
                            }
                        </select>
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Full Name" className="input input-bordered  w-full mb-3" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered  w-full mb-3" />
                        <input name="email" required type="email" defaultValue={user.email} disabled placeholder="Email" className="input input-bordered w-full" />
                        <input type="submit" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white mt-5 w-full" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AppointmentModal;