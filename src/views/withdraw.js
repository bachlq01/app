import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { NotificationManager } from 'react-notifications';

const Withdraw = () => {
    const [cookies] = useCookies(['cookie-name']);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        const { bank, bankNumber, bankMaster, bankAmount } = data;
        setLoading(true);
        try {
            await fetch("https://us-central1-babu-33902.cloudfunctions.net/withdraw", {
                method: "POST",
                body: JSON.stringify({ uid: cookies.uid, bank, bankNumber, bankMaster, bankAmount })
            }).then(res => res.json());
            setLoading(false);
            NotificationManager.success('Success', 'Success');
        } catch (err) {
            setLoading(false);
            NotificationManager.error('Login fail', 'Fail');
            console.log(err)
        }
    }

    return (
        <div style={{ margin: 20, marginTop: 50, backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
            <div>
                <h3 style={{ textAlign: 'center' }}>Rút</h3>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontWeight: "bold" }}>Ngân hàng</label>
                <input className="form-control" id="exampleInputEmail1" placeholder="VD: TPBank"
                    onChange={e => { setData({ ...data, bank: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputName" style={{ fontWeight: "bold" }}>Số tài khoản</label>
                <input className="form-control" id="exampleInputName" placeholder="VD: 123456789"
                    onChange={e => { setData({ ...data, bankNumber: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputsponsorId" style={{ fontWeight: "bold" }}>Chủ tài khoản</label>
                <input className="form-control" id="exampleInputsponsorId" placeholder="VD: NGUYEN VAN A"
                    onChange={e => { setData({ ...data, bankMaster: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" style={{ fontWeight: "bold" }}>Số tiền</label>
                <input className="form-control" id="exampleInputPassword1" placeholder="VD: 50000"
                    onChange={e => { setData({ ...data, bankAmount: e.target.value.trim() }) }}
                />
            </div>
            {
                !loading ?
                    <button className="btn btn-primary"
                        onClick={onSubmit}
                        disabled={!(data && data.bank && data.bankNumber && data.bankMaster && data.bankAmount)}
                        style={{
                            width: "100%", marginBottom: 10,
                            backgroundImage: "linear-gradient(to right, pink , red)",
                            borderWidth: 0
                        }}>
                        Withdraw
                </button>
                    :
                    <button className="btn btn-primary" style={{
                        width: "100%", marginBottom: 10,
                        backgroundImage: "linear-gradient(to right, pink , red)",
                        borderWidth: 0
                    }}>
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </button>
            }
        </div>
    )
}

export default Withdraw;