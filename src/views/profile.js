import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import Avatar from "../asset/avatar.png"

const Profile = () => {
    const user = useSelector(state => state.user.value);
    const [cookie] = useCookies(['cookie-name']);
    const [data, setData] = useState([]);
    useEffect(() => {
        getTran()
    }, [])

    const getTran = async () => {
        try {
            const res = await fetch("https://us-central1-babu-33902.cloudfunctions.net/transactions?uid=" + cookie.uid).then(res => res.json())
            setData(res.data)
        } catch (err) {

        }
    }
    return (
        <div>
            <div style={{ backgroundColor: "#FFF", padding: 20, margin: 20, borderRadius: 10, textAlign: 'center' }}>
                <img src={Avatar} width={75} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: "bold" }}>Name: {user.name}</div>
                    <div style={{ fontWeight: "bold" }}>Balance: {user.balance}</div>
                </div>
            </div>
            <div style={{ backgroundColor: "#FFF", padding: 20, margin: 20, borderRadius: 10, textAlign: 'center' }}>
                <h3>History</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <b>Amount</b>
                    <b>Status</b>
                    <b>Type</b>
                </div>
                {data.length ?
                    data.map(e => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Type</div>
                        </div>
                    ))
                    :
                    <div style={{padding: 20}}>No Data</div>
                }

            </div>
        </div>
    )
}

export default Profile;