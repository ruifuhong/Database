import Order from "./routes/order";
import Categories from "./routes/category";
import Login from "./routes/login";
import SingUp from "./routes/signup";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(window.location.pathname);
    });
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="" onClick={() => navigate("/category")}>
                        Start Wu4Shan
                    </a>
                    {window.location.pathname === "/category" || window.location.pathname === "/order" ? (
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <button
                                className="btn btn-outline-dark"
                                type="submit"
                                style={{ marginRight: "1rem" }}
                                onClick={() => {
                                    localStorage.removeItem("auth");
                                    navigate("/login");
                                }}>
                                Log out
                            </button>
                            <button className="btn btn-outline-dark" type="submit" onClick={() => navigate("/order")}>
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
            <Routes>
                <Route path="/signup" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Order />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/*" element={<Login />} />
            </Routes>
            <footer className="bg-light text-center py-3">
                <div className="container">
                    <span className="text-muted">版權聲明 &copy; 2023</span>
                </div>
            </footer>
        </>
    );
};

export default App;
