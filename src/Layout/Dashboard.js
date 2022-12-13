import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Header from '../Pages/Shared/Header/Header';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email)
    return (
        <div>
            <Header />
            <div className="drawer drawer-mobile">
                <input id="dasboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dasboardDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 rounded-r-md text-base-content mt-1">
                        <li><Link to='/dashboard'>My Appointment</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/users'>Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;