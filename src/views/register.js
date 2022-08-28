import React, { useState } from "react";
import { NotificationManager } from 'react-notifications';
import { Link ,useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({sponsorId:""});
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        const { email, password, name, sponsorId } = data;
        setLoading(true);
        try {
            await fetch("https://us-central1-babu-33902.cloudfunctions.net/register", {
                method: "POST",
                body: JSON.stringify({ email, password, name, sponsorId })
            }).then(res => res.json());
            setLoading(false);
            NotificationManager.success('Success', 'Success');
            navigate("/login");
        } catch (err) {
            setLoading(false);
            NotificationManager.error('Register fail', 'Fail');
            console.log(err)
        }
    }

    return (
        <div style={{ margin: 20, marginTop: 100, backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
            <div>
                <h3 style={{ textAlign: 'center' }}>Register</h3>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontWeight: "bold" }}>Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    onChange={e => { setData({ ...data, email: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputName" style={{ fontWeight: "bold" }}>Name</label>
                <input className="form-control" id="exampleInputName" placeholder="Enter name"
                    onChange={e => { setData({ ...data, name: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputsponsorId" style={{ fontWeight: "bold" }}>Sponsor Id</label>
                <input className="form-control" id="exampleInputsponsorId" placeholder="Enter Sponsor Id"
                    onChange={e => { setData({ ...data, sponsorId: e.target.value.trim() }) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" style={{ fontWeight: "bold" }}>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    onChange={e => { setData({ ...data, password: e.target.value.trim() }) }}
                />
            </div>
            {
                !loading ?
                    <button className="btn btn-primary"
                        onClick={onSubmit}
                        disabled={!(data && data.email && data.name && data.password && data.password.length >= 6)}
                        style={{
                            width: "100%", marginBottom: 10,
                            backgroundImage: "linear-gradient(to right, pink , red)",
                            borderWidth: 0
                        }}>
                        REGISTER
                </button>
                    :
                    <button className="btn btn-primary" style={{
                        width: "100%", marginBottom: 10,
                        backgroundImage: "linear-gradient(to right, pink , red)",
                        borderWidth: 0
                    }}>
                        <div class="spinner-border spinner-border-sm text-light" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </button>
            }


            <Link className="btn btn-primary"
                to="/login"
                style={{
                    width: "100%", borderColor: "pink",
                    backgroundColor: "#fff",
                    color: "pink"
                }}>
                SIGN IN
                </Link>
        </div>
    )
}

export default Register;