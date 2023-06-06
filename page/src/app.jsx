import Order from "./routes/order";
import Categories from "./routes/category";
import Login from "./routes/login";
import SingUp from "./routes/signup";
import Member from "./routes/member";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="" onClick={() => navigate("/category")}>
                        Start Wu4Shan
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit" onClick={() => navigate("/member")}>
                                user_page
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                            <button className="btn btn-outline-dark" type="submit" onClick={() => navigate("/order")}>
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/signup" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Order />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/member" element={<Member />} />
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
