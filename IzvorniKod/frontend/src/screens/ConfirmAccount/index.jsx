import React from 'react'

import axios from 'axios';
import { api_url } from '../../App';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConfirmAccount = () => {
    let query = useQuery();

    console.log(query.get("token"));

    axios.get(api_url + 'auth/confirm?token=' + query.get("token")).then((response) => {
        window.location.href = '/';
    });

    return null;
};

export default ConfirmAccount;
