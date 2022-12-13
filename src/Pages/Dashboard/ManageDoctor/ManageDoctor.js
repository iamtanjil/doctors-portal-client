import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () => {
        setDeletingDoctor(null);
    };
    
    const { data: doctors = [], refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-orpin-ten.vercel.app/managedoctor', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteDoctor = doctor => {
        fetch(`https://doctors-portal-server-orpin-ten.vercel.app/managedoctor/${doctor._id}`,{
            method: 'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Doctor${doctor.name} Deleted Successfully`)
            }
            console.log(data);
        })
    };

    return (
        <div className='p-5 mx-auto'>
            <h2 className='text-3xl'>Manage Doctors</h2>
            <div className='mt-5'>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Avartar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Specialty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors?.map((doctor, i) =>
                                    <tr key={doctor._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <img src={doctor.img} alt='' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.specility}</td>
                                        <td>
                                            <label onClick={()=> setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-outline btn-error btn-sm">Delete</label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {
                    deletingDoctor && <ConfirmationModal
                    title={'Are You Sure to Delete?'}
                    message={`If you delete ${deletingDoctor.name}. You can not recover this data again.`}
                    closeModal={closeModal}
                    modalData={deletingDoctor}
                    buttonName='Okey! Procced'
                    successAction={handleDeleteDoctor}
                    >

                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default ManageDoctor;