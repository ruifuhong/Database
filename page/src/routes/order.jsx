import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 *
 * @param { {index: number, order: {
 *          Product_id: number,
 *          Color: string,
 *          Size: string,
 *          Product_name: string,
 *          Price: number,
 *          Image: string
 *      }, deleteWishCar: (args: number) => Promise<void> }} param0
 * @returns
 */
const OrderItems = ({ index, order, deleteWishCar }) => {
    const [colors, setColors] = useState([null]);
    const [sizes, setSizes] = useState([null]);
    const [orderInfo, setOrderInfo] = useState(order);

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
            setColors(["", ...colorInfo.data]);
            setSizes(["", ...sizeInfo.data]);
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    const updateWishCar = async (updates) => {
        try {
            await axios.put(
                `${baseUrl}/wish`,
                { ...orderInfo, ...updates },
                { headers: { Authorization: localStorage.getItem("auth") } }
            );
            setOrderInfo({ ...orderInfo, ...updates });
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
                <select onChange={(e) => updateWishCar({ Color: e.target.value })} value={orderInfo.Color || ""}>
                    {colors.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
            </td>
            <td>
                <select onChange={(e) => updateWishCar({ Size: e.target.value })} value={orderInfo.Size || ""}>
                    {sizes.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
            </td>
            <td>{order.Price}</td>
            <td>
                <a onClick={() => deleteWishCar(order.Product_id)}>
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
            console.log(data);
            setOrder(data.data);
        } catch (err) {
            console.error(err);
            alert(err?.response?.error || "購物車沒有商品");
        }
    };

    const deleteWishCar = async (Product_id) => {
        await axios.delete(`${baseUrl}/wish`, {
            params: { Product_id },
            headers: { Authorization: localStorage.getItem("auth") },
        });
        alert("Product Deleted");
        await getOrder();
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
                            <th>價格</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <OrderItems order={item} key={index} index={index} deleteWishCar={deleteWishCar} />
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};
export default Order;
