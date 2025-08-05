import React, { useContext, useState, useEffect } from 'react';
import './HomePage.css';
import menuItems from '../data/menuItems';
import { cartContext } from '../context/CartContext.jsx';
import axios from 'axios';

const HomePage = () => {
    const { cartItems, addCart, clearCart } = useContext(cartContext);

    //Buy to Cart
    const [message, setMessage] = useState("");
    const buyOrder = async () => {
        try{
            await axios.post('https://cafe-project-f0mc.onrender.com/api/v1/orders', {
                items: cartItems,
                placedAt: new Date().toISOString()
            },
            {
                withCredentials: true
            }
        );
            setMessage("Order placed!");
            clearCart();
        }
        catch(error){
            setMessage("Failed to place order!");
        }
    }

    //Order History
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async() => {
            try{
                const res = await axios.get('https://cafe-project-f0mc.onrender.com/api/v1/orders');
                if(Array.isArray(res.data)){
                    setOrders(res.data);
                }
                else {
                    setOrders([]);
                }
            }
            catch(error){
                console.error("failed to load order history: ", error);
            }
        };
        fetchOrders();
    }, []);


    return (
        <div>
            <header className='navbar'>
                <h1>Coffee Bar</h1>
            </header>

            {/* Cart */}
            <section className='cart-section'>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>You have not chosen any items.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>{item.name} - ${item.price}</li>
                            ))}
                        </ul>
                        <button onClick={buyOrder}>Place Order</button>
                        {message && <p>{message}</p>}
                    </div>
                )}
            </section>

            {/* Menu */}
            <main className='menu'>
                {menuItems.map(item => (
                    <div className='card' key={item.id}>
                        <h2>{item.name}</h2>
                        <img src={item.image} alt={item.name} />
                        <p>${item.price}</p>
                        <ul className='ingredientList'>
                            {item.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                        <button onClick={() => addCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </main>

            {/* Order History */}
            <section className='order-history'>
                <h2>Order History</h2>
                {Array.isArray(orders) && orders.length === 0 ? (
                    <p>No past orders yet.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index}>
                            <p><strong>Placed At:</strong> {new Date(order.placedAt).toLocaleString()}</p>
                            <ul>
                                {order.items.map((item, i) => (
                                    <li key={i}>{item.name} - ${item.price}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

export default HomePage;
