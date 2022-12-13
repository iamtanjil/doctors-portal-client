import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLogin] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-orpin-ten.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin)
                setIsAdminLogin(false)
            })
        }
    }, [email]);
    return [isAdmin, isAdminLoading]
}

export default useAdmin;