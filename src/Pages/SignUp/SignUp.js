import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';


const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signUp, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const [token] = useToken(createdUserEmail)
    if(token){
        navigate('/')
    }

    const handelSignUp = data => {
        signUp(data.email, data.password)

            .then(result => {
                const userInfo = {
                    displayName: data.name
                };
                updateUser(userInfo)
                    .then(() => { 
                        saveUserToDB(data.email, data.name)
                    })
                    .catch(err => console.log(err))
                toast.success("Sign Up Successful")
            })
            .catch(err => {
                setSignUpError(err.message);
            })
    };

    const saveUserToDB = (email, name) => {
        const user = {email, name}
        fetch('https://doctors-portal-server-orpin-ten.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setCreatedUserEmail(email)
        })
    }
    return (
        <div className='flex h-[800px] items-center justify-center'>
            <div className='w-96 p-7 shadow-lg rounded-lg'>
                <h2 className='text-4xl text-center  mb-7'>Sign Up</h2>
                <form onSubmit={handleSubmit(handelSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="text-lg">Name</span>
                        </label>
                        <input {...register("name",
                            {
                                required: 'Enter Your Name'
                            })}
                            type="text" name='name' placeholder="Name"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600 mt-2'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="text-lg">Email</span>
                        </label>
                        <input {...register("email",
                            {
                                required: 'Enter Your Email'
                            })}
                            type="email" name='email' placeholder="Email"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600 mt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="text-lg">Password</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password Is Required",
                                minLength: { value: 6, message: 'Password should be 6 digits.' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password should be Uppercase, Lowercase, and Special Charactor' }
                            })}
                            type="password" name='password' placeholder="Passoword"
                            className="input input-bordered w-full max-w-xs" />
                        <span className="label-text mt-2"><a href="./">Forget password?</a></span>
                        {errors.password && <p className='text-red-600 '>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-7' value='Sign Up' type="submit" />
                </form>
                <p className='text-center text-sm mt-3'>Already Have an Account? <Link to='/login' className='text-secondary'>Login Now.</Link></p>
                <div>
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </div>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full mt-3'>Sign Up With Google</button>
            </div>
        </div>
    )
};

export default SignUp;