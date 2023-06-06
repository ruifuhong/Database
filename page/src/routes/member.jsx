import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Member = () => {
    const [member, setMember] = useState("");
    const navigate = useNavigate();
    const getMember  = async (category) => {
        try {
            let data= await axios.get(`${baseUrl}/customer`, {
                params: category ? { category } : {},
                headers: { Authorization: localStorage.getItem("auth") },
            });
            setMember(data.data);
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
            <p>{member.username}</p>
            <p>{member.password}</p>
            <p>{member.firstname}</p>
            <p>{member.Joined_since}</p>
            <p>{member.address}</p>
        </div>

        );
    


}
export default Member;