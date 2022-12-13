import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const navigate = useNavigate();
    const{logOut} = useContext(AuthContext);
    const error = useRouteError();
    const handleLogout =() => {
        logOut();
        navigate('/login')
    };
    return (
        <div>
            <h1 className='text-3xl text-center text-red-500'>Something went wrong</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <h2 className='text-center text-primary'>Please <button className='btn btn-accent btn-sm' onClick={handleLogout}>Logout</button> and login again</h2>
        </div>
    );
};

export default DisplayError;