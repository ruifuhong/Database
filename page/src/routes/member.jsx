import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Member = () => {
    const [member, getmember] = useState(("");
    const navigate = useNavigate();
    const getmember = async (category) => {
        try {
            let data= await axios.get(`${baseUrl}/customer`, {
                params: category ? { category } : {},
                headers: { Authorization: localStorage.getItem("auth") },
            });
            setProduct(data.data);
        } catch (err) {
            alert(err?.response?.data?.error || "ERROR");
        }
    };



    return(



    )



}