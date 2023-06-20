import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 *
 * @param { {index: number, order: {
 *          Order_id: string,
 *          Item: string,
 *          Product_id: number,
 *          Color: string,
 *          Size: string,
 *          Category: string,
 *          Quantity: number,
 *          Price: number,  
 *      }, deleteWishCar: (args: number) => Promise<void> }} param0
 * @returns
 */
const OrderItems = ({ index, order, deleteWishCar,bulidorderlist }) => {
    const [colors, setColors] = useState([null]);
    const [sizes, setSizes] = useState([null]);
    const [orderInfo, setOrderInfo] = useState(order);

    const getItemInfo = async () => {
        try {
            const [colorInfo, sizeInfo] = await Promise.all([
                axios.get(`${baseUrl}/cart/color`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
                axios.get(`${baseUrl}/cart/size`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
            ]);
            setColors(["", ...colorInfo.data]);
            setSizes(["", ...sizeInfo.data]);
        } catch (err) {
            window.location.href = "/not_login";
            alert(err.response.data.error || "ERROR");
        }
    };

    const updateWishCar = async (updates) => {
        try {
            await axios.put(
                `${baseUrl}/cart`,
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
            <td>{order.Item}</td>
            <td>
                {order.Product_id}
            </td>
            <td>
                {order.Color}
            </td>
            <td>
                {order.Size}
            </td>
            <td>{order.Quantity}</td>
            <td>{order.Price}</td>
            <td>
                <a style={{ cursor: "pointer" }} onClick={() => deleteWishCar(order.Product_id)}>
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

const Cart = () => {
    const [order, setOrder] = useState([]);
    const [shopBar, setShopBar] = useState(false);
    const [member, setMember] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    const navigate = useNavigate();
  
    const getOrder = async () => {
        try {
            const data = await axios.get(`${baseUrl}/cart`, {
                headers: { Authorization: localStorage.getItem("auth") },
            });

            const orderData = data.data;
            const amount = orderData.reduce((total, item) => total + item.Price, 0);
            setOrder(orderData);
            setTotalAmount(amount);
        } catch (err) {
            if (localStorage.getItem("auth")) {
            alert("購物車內沒有東西");
            } else {
            window.location.href = "/not_login";
            }            
        }
    };
         
    const deleteWishCar = async (Product_id) => {
        await axios.delete(`${baseUrl}/cart`, {
            params: { Product_id },
            headers: { Authorization: localStorage.getItem("auth") },
        });
        alert("商品已刪除");
        await getOrder();
    };
    
    const getMember = async (category) => {
        try {
          let data = await axios.get(`${baseUrl}/customer`, {
            params: category ? { category } : {},
            headers: { Authorization: localStorage.getItem("auth") },
          });
          setMember(data.data[0].Username);
        } catch (err) {
          window.location.href = "/not_login";
          alert(err?.response?.data?.error || "ERROR");
        }
      };
    
    const bulidorderlist = async (order) => {
        const requestBody = order.map((order) => {
            return {
              customer: member,  
              product_id: order.Product_id,
              color: order.Color,
              size: order.Size,
              purchase_date: new Date().toISOString().substring(0, 10),
              category: order.Category,
            };
          });
        
          try {
            await axios.post(`${baseUrl}/product_purchased`, requestBody);
            alert("Product purchased successfully");
            window.location.href = '/category';
          } catch (error) {
            alert(error?.response?.data?.error || "你的購物車內沒有東西");
          }        
      };

    useEffect(() => {
        getOrder();
        getMember();
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
                            <th>商品ID</th>
                            <th>顏色</th>
                            <th>尺寸</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <OrderItems order={item} key={index} index={index} deleteWishCar={deleteWishCar} bulidorderlist={bulidorderlist} />
                        ))}
                    </tbody>
                </table>
      
                <br />
                <p>總金額：{totalAmount}</p>

                <button onClick={() => bulidorderlist(order)}>
                    確認結帳
                </button>
            </main>
        </>
    );
};
export default Cart;
