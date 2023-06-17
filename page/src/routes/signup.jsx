import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingUp = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const regist = async () => {
        try {
            await axios.post(`${baseUrl}/signup`, {
                username,
                firstName,
                lastName,
                address,
                password,
                confirmPassword,
            });
            navigate("/login");
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>註冊</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>帳號*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>真實姓氏(last_name)*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>真實名字(first_name)*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>地址*</label>
                                <input
                                    type="address"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>密碼*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>確認密碼*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                
                                <button className="btn btn-primary" onClick={regist}>
                                    註冊
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingUp;
