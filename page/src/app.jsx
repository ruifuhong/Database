import Order from "./routes/order";
import Cart from "./routes/cart";
import Categories from "./routes/category";
import Login from "./routes/login";
import SingUp from "./routes/signup";
import Member from "./routes/member";
import Product_show from "./routes/show_product";
import Not_login from "./routes/not_login";
import PurchaseHistory from "./routes/purchase_history";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState as well

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        setIsLoggedIn(!!auth); 
    }, []);






    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="" onClick={() => navigate("/category")}>
                        Start Wu4Shan
                    </a>
                    {!isLoggedIn ? (
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {location.pathname === "/category" || location.pathname === "/order" ? (
                                <>
                                    <button className="btn btn-outline-dark" type="submit" onClick={() => navigate("/login")}>
                                        Log in
                                    </button>
                                </>
                            ) : <></>}
                        </div>
                    ) : (
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {location.pathname === "/category" || location.pathname === "/order" ? (
                                <>
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
                                    <button
                                        className="btn btn-outline-dark"
                                        type="submit"
                                        style={{ marginRight: "1rem" }}
                                        onClick={() => navigate("/member")}>
                                        user_page
                                    </button>
                                    <button className="btn btn-outline-dark" type="submit" onClick={() => navigate("/cart")}>
                                        <i className="bi-cart-fill me-1"></i>
                                        Cart
                                    </button>
                                </>
                            ) : <></>}
                        </div>
                    )}
                </div>
            </nav>
            <Routes>
                <Route path="/signup" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/member" element={<Member />} />
                <Route path="/show_product/*" element={<Product_show />} />
                <Route path="/not_login/*" element={<Not_login />} />
                <Route path="/*" element={<Login />} />
                <Route path="/purchase_history" element={<PurchaseHistory />} />
            </Routes>
            <footer className="bg-light text-center py-3 fixed-bottom">
                <div className="container">
                    <span className="text-muted">版權聲明 &copy; 2023</span>
                </div>
            </footer>
        </>
    );
};

export default App;
