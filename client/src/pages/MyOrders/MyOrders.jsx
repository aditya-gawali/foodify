import React, { useEffect, useState } from 'react'
// import './MyOrders.css'
import axios from 'axios';
import { useStore } from '../../stores/useStore';
import { ChevronDown, ChevronUp, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const MyOrders = () => {
    const { url, token, userId } = useStore();
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get(url + "/api/order/userorders/" + userId, { headers: { token } })
        setData(response.data.data);
    }

    useEffect(() => {
        if (token && userId) {
            fetchOrders();
        }
    }, [token, userId])
    const [expandedOrders, setExpandedOrders] = useState(new Set());

    const toggleExpanded = (orderId) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };


    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'In Transit':
                return <Truck className="w-5 h-5 text-blue-500" />;
            case 'Processing':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'Cancelled':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'In Transit':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Food Order History</h1>
                        <p className="text-gray-600 mt-2">Track your delicious food orders and reorder your favorites</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Restaurant
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Delivery Time
                                        </th> */}
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((order) => (
                                        <React.Fragment key={order._id}>
                                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">#{order._id}</div>
                                                        <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()} </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{order.restaurant}</div>
                                                    <div className="text-sm text-gray-500">{order.items.length} items</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {getStatusIcon(order.status)}
                                                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-900">₹{order.amount}</div>
                                                </td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{order.deliveryTime}</div>
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => toggleExpanded(order._id)}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                                    >
                                                        {expandedOrders.has(order._id) ? (
                                                            <>
                                                                <ChevronUp className="w-4 h-4 mr-1" />
                                                                Hide Items
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown className="w-4 h-4 mr-1" />
                                                                View Items
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedOrders.has(order._id) && (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                                                        <div className="space-y-3">
                                                            <h4 className="font-medium text-gray-900 mb-3">Order Items:</h4>
                                                            {order.items.map((dish, index) => (
                                                                <div key={index} className="flex items-center justify-between py-2 px-4 bg-white rounded-lg border">
                                                                    <div className="flex items-center space-x-3">
                                                                        <img
                                                                            src={dish.image}
                                                                            alt={dish.name}
                                                                            className="w-12 h-12 rounded-lg object-cover"
                                                                        />
                                                                        <div>
                                                                            <div className="font-medium text-gray-900">{dish.name}</div>
                                                                            <div className="text-sm text-gray-500">Quantity: {dish.quantity}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-medium text-gray-900">₹{dish.price}</div>
                                                                        <div className="text-sm text-gray-500">
                                                                            ₹{(dish.price * dish.quantity).toFixed(2)} total
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {/* <div className="flex justify-end space-x-3 mt-4">
                                                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                                    View Receipt
                                                                </button>
                                                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                                                    Reorder
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='my-orders'>
                <h2>My Orders</h2>
                <div className="container">
                    {
                        data.map((order, index) => {
                            return (
                                <div key={index} className='my-orders-order'>
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>{order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}</p>
                                    <p>Rs. {order.amount}.00</p>
                                    <p>Items: {order.items.length}</p>
                                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                    <button onClick={fetchOrders}>Track Order</button>
                                </div>
                            )
                        })
                    }
                </div>

            </div> */}
        </>
    )
}

export default MyOrders
