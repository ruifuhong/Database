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



    return (
        <div>
            <p>預設值</p>
            <p>username</p>
            <p>{member.Username}</p>
            <p>password</p>
            <p>{member.Password}</p>
            <p>firstname</p>
            <p>{member.First_name}</p>
            <p>Joined_since</p>
            <p>{member.Joined_since}</p>
            <p>address</p>
            <p>{member.Address}</p>
            <p>預設值</p>
        </div>

    );



}
export default Member;