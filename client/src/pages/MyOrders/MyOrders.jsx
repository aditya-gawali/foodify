import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useStore } from '../../stores/useStore';
const MyOrders = () => {
    const { url, token, userId } = useStore();
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        console.log(userId)
        const response = await axios.get(url + "/api/order/userorders/" + userId, { headers: { token } })
        setData(response.data.data);
        console.log(response)
    }

    useEffect(() => {
        if (token && userId) {
            fetchOrders();
        }
    }, [token, userId])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order,index)=>{
                        return (
                            <div key={index} className='my-orders-order'>
<img src={assets.parcel_icon} alt="" />
<p>{order.items.map((item,index)=>{
    if (index===order.items.length-1) {
        return item.name+" x "+item.quantity
    }
    else{
        return item.name+" x "+item.quantity+", "
    }
})}</p>
<p>${order.amount}.00</p>
<p>Items: {order.items.length}</p>
<p><span>&#x25cf;</span><b>{order.status}</b></p>
<button onClick={fetchOrders}>Track Order</button>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders
