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
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Hi, {member.Username}</h2>
                    <span id="last-updated">上次取出資料: </span>
    
                    <div className="d-flex">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <button className="btn btn-primary record-button" type="button">購買紀錄</button>
                            </div>
                            <div className="col-md-6 mb-3">
                                <button className="btn btn-primary wishlist-button" type="button">願望清單</button>
                            </div>
                        </div>
                    </div>
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
                                <input type="password" className="form-control" id="password-input" value="********" disabled />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="firstname-input">First Name:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="firstname-input" value={member.First_name} disabled required />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary edit-button" type="button">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="lastname-input">Last Name:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="lastname-input" value={member.Last_name} disabled required />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary edit-button" type="button">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address-input">Address:</label>
                            <div className="input-group">
                                <input type="text" id="address-input" className="form-control" value={member.Address} disabled required />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary edit-button" type="button">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
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
    
                <div>
                    <div className="text-center mb-3">
                        <button className="btn btn-primary" id="upload-button" type="button">上傳資料庫</button>
                        <button className="btn btn-primary" type="button">修改密碼</button>
                    </div>
                </div>
    
                <div className="jumbotron">
                    <h1>我不知道寫什麼</h1>
                    <p>Wu4Shan 是一個你值得信賴的網站</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">了解更多</a>
                </div>
    
                <script>
                    {
  // 获取所有需要编辑的输入框和编辑按钮
  const inputs = document.querySelectorAll('input[disabled][required]');
  const editButtons = document.querySelectorAll('.edit-button');

  // 为每个编辑按钮添加点击事件监听器
  editButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // 找到当前编辑按钮对应的输入框
      const input = button.parentElement.previousElementSibling;
      
      // 将输入框的 disabled 属性设置为 false，required 属性设置为 true
      input.disabled = false;
      input.required = true;
      
      // 给输入框添加焦点
      input.focus();
    });
  });

  // 为每个输入框添加失去焦点事件监听器
  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      // 将输入框的 disabled 属性设置为 true，required 属性设置为 false
      input.disabled = true;
      input.required = false;
    });
  });

  document.getElementById("upload-button").addEventListener("click", function() {
    var currentTime = new Date().toLocaleString();
    document.getElementById("last-updated").textContent = "上次取出資料: " + currentTime;
  });

  const lastUpdatedSpan = document.getElementById('last-updated');

  // Function to update the last updated time
  function updateLastUpdatedTime() {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date and time as desired (adjust to your needs)
    const formattedDate = currentDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = currentDate.toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', second: 'numeric' });

    // Set the content of the <span> element to display the current date and time
    lastUpdatedSpan.textContent = `上次取出資料: ${formattedDate} ${formattedTime}`;
  }

  // Call the function to update the last updated time initially
  updateLastUpdatedTime();

}
                </script>
            </div>
        </>
    );



}
export default Member;