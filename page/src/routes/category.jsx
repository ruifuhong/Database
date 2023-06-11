import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Categories = () => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const getProduct = async (category) => {
        try {
            let data = await axios.get(`${baseUrl}/product`, {
                params: category ? { category } : {},
                headers: { Authorization: localStorage.getItem("auth") },
            });
            setProduct(data.data);
        } catch (err) {
            alert(err?.response?.data?.error || "ERROR");
        }
    };

    const addProduct = async () => {
        await axios.post(`${baseUrl}/car`, {});
    };
    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <div className="frame_1">
                <div className="block_1">
                    <div className="Username">Username</div>
                    <div className="Username">加入時間</div>
                </div>

                <div className="block_2">
                    <a className="shop_record" href="#!">
                        購買記錄
                    </a>
                    <a className="wish_list" href="" onClick={() => navigate("/order")}>
                        願望清單
                    </a>
                </div>
            </div>
            <center>
                <hr width="900px" />
            </center>
            <div className="frame_2">
                <div className="cloth_all" onClick={() => getProduct()}>
                    全部
                </div>
                <div className="cloth_men" onClick={() => getProduct("men")}>
                    男裝
                </div>
                <div className="cloth_women" onClick={() => getProduct("women")}>
                    女裝
                </div>
                <div className="cloth_children" onClick={() => getProduct("kids")}>
                    童裝
                </div>
            </div>

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {product.slice(0, 8).map((item, index) => (
                            <div className="col mb-5" key={index}>
                                <div className="card h-100">
                                    <a
                                        className="badge bg-dark text-white  position-absolute_1 btn "
                                        href="#"
                                        style={{ top: "0.5rem", left: "0.5rem" }}>
                                        Add
                                    </a>
                                    <img className="card-img-top" src={item.Image} alt="..." />

                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{item.Product_name}</h5>
                                            <h6 className="fw-bolder">商品id{item.Product_id}</h6>
                                            <h6 className="fw-bolder">尺寸</h6>
                                            <h6 className="fw-bolder">顏色</h6>
                                            <h6 className="fw-bolder">價錢： {item.Price} 元</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <Link className="btn btn-outline-dark mt-auto" to={`/show_product/${item.Product_id}`}>
                                                查看詳細資訊
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p>
                </div>
            </footer>
        </>
    );
};
export default Categories;
