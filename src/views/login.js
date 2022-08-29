import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { NotificationManager } from 'react-notifications';
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const [cookie,setCookie] = useCookies(['cookie-name']);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onSubmit = async () => {
        const { email, password } = data;
        setLoading(true);
        try {
            const res = await fetch("https://us-central1-babu-33902.cloudfunctions.net/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            }).then(res => res.json());
            if(!res.status){
                setLoading(false);
                NotificationManager.error('Login fail', 'Fail');
                return;
            }
            setCookie('uid', res.message.email, { path: '/' });
            setLoading(false);
            NotificationManager.success('Success', 'Success');
            navigate("/profile")
        } catch (err) {
            setLoading(false);
            NotificationManager.error('Login fail', 'Fail');
            console.log(err)
        }
    }

    return (
        <div style={{ margin: 20, marginTop: 100, backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
            <div>
                <h3 style={{ textAlign: 'center' }}>Signin with</h3>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontWeight: "bold" }}>Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    onChange={e => { setData({ ...data, email: e.target.value.trim() }) }}
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
                        disabled={!(data && data.email && data.password && data.password.length >= 6)}
                        style={{
                            width: "100%", marginBottom: 10,
                            backgroundImage: "linear-gradient(to right, pink , red)",
                            borderWidth: 0
                        }}>
                        SIGN IN
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


            <Link className="btn btn-primary"
                to="/register"
                style={{
                    width: "100%", borderColor: "pink",
                    backgroundColor: "#fff",
                    color: "pink"
                }}>
                REGISTERS
                </Link>
        </div>
    )
}

export default Login;