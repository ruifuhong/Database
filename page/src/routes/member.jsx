import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Member = () => {
    const [member, setMember] = useState("");
    const navigate = useNavigate();
    const getMember = async (category) => {
        console.log('member.jsx');
        try {
            console.log('member.jsx_try');
            let data = await axios.get(`${baseUrl}/customer`, {
                params: category ? { category } : {},
                headers: { Authorization: localStorage.getItem("auth") },
            });

            console.log(data.data);
            setMember(data.data[0]);
            console.log(data.data);
        } catch (err) {
            alert(err?.response?.data?.error || "ERROR");
        }
    };

    useEffect(() => {
        getMember();
    }, []);

    useEffect(() => {
        const lastUpdatedSpan = document.getElementById("last-updated");
      
        const updateLastUpdatedTime = () => {
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
          const formattedTime = currentDate.toLocaleTimeString("zh-TW", { hour: "numeric", minute: "numeric", second: "numeric" });
      
          lastUpdatedSpan.textContent = `上次取出資料: ${formattedDate} ${formattedTime}`;
        };
      
        const handleUploadButtonClick = () => {
          const currentTime = new Date().toLocaleString();
          lastUpdatedSpan.textContent = "上次取出資料: " + currentTime;
        };
        updateLastUpdatedTime();
      }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Hi, {member.Username}</h2>
                    <span id="last-updated">上次取出資料: </span>
                </div>
    
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="account-input">Account:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="account-input" value={member.Username} disabled />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="password-input">Password:</label>
                            <div className="input-group">
                                <input type="password" className="form-control" id="password-input" value="" disabled />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="firstname-input">First Name:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="firstname-input" value={member.First_name} disabled required />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="lastname-input">Last Name:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="lastname-input" value={member.Last_name} disabled required />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address-input">Address:</label>
                            <div className="input-group">
                                <input type="text" id="address-input" className="form-control" value={member.Address} disabled required />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="join-date-input">Join Date:</label>
                            <div className="input-group">
                                <input type="date" id="join-date-input" className="form-control" value={member.Joined_since ? new Date(member.Joined_since).toISOString().split('T')[0] : ''}
 disabled required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Member;
