import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../componenst/Spinner/Spinner';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] =useAdmin(user?.email)
    if(loading || isAdminLoading){
        return <Spinner></Spinner>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;