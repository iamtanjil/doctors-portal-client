import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Spinner from '../../../componenst/Spinner/Spinner';

const AddDoctor = () => {
    const { register, handleSubmit, reset } = useForm();
    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;

    const { data: specialities = [], isLoading } = useQuery({
        queryKey: ['specialities'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-orpin-ten.vercel.app/appointmentSpecialty');
            const data = res.json();
            return data;
        }
    });
    if(isLoading){
        return <Spinner></Spinner>;
    }

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specility: data.speciality,
                    img: imgData.data.url
                }
                fetch('https://doctors-portal-server-orpin-ten.vercel.app/adddoctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        toast.success(`Doctor added successfully.`);
                        reset();
                    }
                })
            }
        })
    }

    
    return (
        <div className='p-5 mx-auto'>
            <h2 className="text-3xl">Add a doctor</h2>
            <div className='w-full p-7 shadow-lg rounded-lg'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="text-lg">Name</span>
                        </label>
                        <input {...register("name",
                            {
                                required: 'Enter Your Name'
                            })}
                            type="text" name='name' placeholder="Name"
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-lg">Email</span>
                        </label>
                        <input {...register("email",
                            {
                                required: 'Enter Your Email'
                            })}
                            type="email" name='email' placeholder="Email"
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-lg">Specialty</span>
                        </label>
                        <select {...register('speciality')} className="select select-bordered w-full">
                            {
                                specialities.map(specialty =>
                                    <option key={specialty._id} value={specialty.name}>{specialty.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="text-lg">Upload Image</span>
                        </label>
                        <input {...register("image",
                            {
                                required: 'Upload Photo'
                            })}
                            type="file" name='image'
                            className="file-input file-input-bordered file-input-accent w-full" />
                    </div>
                    <input className='btn btn-accent w-full mt-7' value='Add Doctor' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;