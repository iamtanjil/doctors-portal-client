import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {signIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loggedUserEmail, setLoggedUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [token] = useToken(loggedUserEmail);
    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, {replace: true});
    }

    const handelLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setLoggedUserEmail(data.email)
            
        })
        .catch(err => {
            setLoginError(err.message)
        })
    };

    return (
        <div className='flex h-[800px] items-center justify-center'>
            <div className='w-96 p-7 shadow-lg rounded-lg'>
                <h2 className='text-4xl text-center  mb-7'>Login</h2>
                <form onSubmit={handleSubmit(handelLogin)}>
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
                                minLength: {value: 6, message: 'Password should be 6 digits.'}
                            })}
                            type="password" name='password' placeholder="Passoword"
                            className="input input-bordered w-full max-w-xs" />
                        <span className="label-text mt-2"><a href="./">Forget password?</a></span>
                        {errors.password && <p className='text-red-600 '>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mt-7' value='Login' type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='text-center text-sm mt-3'>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create new account.</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full mt-3'>Login With Google</button>
            </div>
        </div>
    );
};

export default Login;