/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { toast } from "react-toastify";


const Oauth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const token = new URLSearchParams(location.search).get('state');
    const profile = new URLSearchParams(location.search).get("profile");
    useEffect(() => {
        secureLocalStorage.setItem("token", token);
        secureLocalStorage.setItem("profile", profile);
        toast.success("Successfully Logged In");
        navigate('/home/');
    })



    return (
        <div>
            Redirecting to home page...
        </div>
    )
}

export default Oauth