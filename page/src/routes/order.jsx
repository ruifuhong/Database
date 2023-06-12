import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const OrderItems = ({ index, order }) => {
    const [color, setColors] = useState([]);
    const [size, setSize] = useState([]);

    const getItemInfo = async () => {
        try {
            const [colorInfo, sizeInfo] = await Promise.all([
                axios.get(`${baseUrl}/product/color`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
                axios.get(`${baseUrl}/product/size`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
            ]);
            setColors(colorInfo.data);
            setSize(sizeInfo.data);
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    useEffect(() => {
        getItemInfo();
    }, []);

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{order.Product_name}</td>
            <td>
                <img src={order.Image} />
            </td>
            <td>
                <select>
                    {color.map((item) => (
                        <option selected={item === order.color ? "selected" : undefined}>{item}</option>
                    ))}
                </select>
            </td>
            <td>
                <select>
                    {size.map((item) => (
                        <option selected={item === order.size ? "selected" : undefined}>{item}</option>
                    ))}
                </select>
            </td>
            <td>{order.Quantity}</td>
            <td>{order.Price}</td>
            <td>
                <a href="#">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        width="25"
                        height="30"
                        alt="Delete"
                        title="刪除商品"
                    />
                </a>
            </td>
        </tr>
    );
};

const Order = () => {
    const [order, setOrder] = useState([]);
    const [shopBar, setShopBar] = useState(false);
    const navigate = useNavigate();

    const getOrder = async () => {
        try {
            const data = await axios.get(`${baseUrl}/wish`, {
                headers: { Authorization: localStorage.getItem("auth") },
            });
            setOrder(data.data);
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </header>

            <main>
                <table>
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>商品名稱</th>
                            <th>商品照片</th>
                            <th>顏色</th>
                            <th>尺寸</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>87</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <OrderItems order={item} key={index} index={index} />
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-outline-dark" type="submit">
                    確認結帳
                </button>
            </main>

            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p>
                </div>
            </footer>
        </>
    );
};
export default Order;
