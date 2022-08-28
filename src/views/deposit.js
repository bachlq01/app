import React from "react";

const Deposit = () => {
    return (
        <div style={{ margin: 20, marginTop: 50, backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
            <div>
                <h3 style={{ textAlign: 'center' }}>Nạp</h3>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontWeight: "bold" }}>Ngân hàng</label>
                <input className="form-control" disabled id="exampleInputEmail1" placeholder="VD: TPBank"
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputName" style={{ fontWeight: "bold" }}>Số tài khoản</label>
                <input className="form-control" disabled id="exampleInputName" placeholder="VD: 123456789"

                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputsponsorId" style={{ fontWeight: "bold" }}>Chủ tài khoản</label>
                <input className="form-control" disabled id="exampleInputsponsorId" placeholder="VD: NGUYEN VAN A"
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" style={{ fontWeight: "bold" }}>Số tiền</label>
                <input className="form-control" disabled id="exampleInputPassword1" placeholder="VD: 50000"
                />
            </div>
        </div>
    )
}

export default Deposit;