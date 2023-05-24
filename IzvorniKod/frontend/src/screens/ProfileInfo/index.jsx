import React from 'react'

import axios from 'axios';
import Header from '../../components/Header';
import { api_url } from '../../App';
import authHeader from '../../utils/AuthHeader';

const ProfileInfo = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(api_url + 'account', { headers: authHeader() }).then((response) => {
        setData(response.data);
        });
    }, []);

    if (!data) return null;

    return (
        <div>
            <Header></Header>
            <div className='forms' style={{margin: "20px"}}>
                <h2>Profil</h2>
                <p>{data.email}</p>
                <p>{data.firstName}</p>
                <p>{data.lastName}</p>
                <p>{data.businessName}</p>
                <p>{data.oib}</p>
                <p>{data.phoneNumber}</p>
                <p>{data.bio}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
