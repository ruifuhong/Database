import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = async () => {
        try {
            const result = await axios.post(`${baseUrl}/signin`, { username, password });
            localStorage.setItem("auth", result.data.token);
            navigate("/category");
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };
    const goToSignup = () => {
        navigate("/signup");
    };
    return (
        <main className="flex-grow-1 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white fw-bold">登入</div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">使用者名稱(預設user123)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">密碼(預設123)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="remember" />
                                    <label className="form-check-label" htmlFor="remember">
                                        記住我
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={login}>
                                    登入
                                </button>
                            </div>
                            <div className="card-footer text-center">
                                <a href="" onClick={() => navigate("/signup")}>
                                    Regist
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
