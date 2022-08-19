import React, { useState, createContext, useContext, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Order, OrderDrink, Cart } from "../models";

import { useAuthContext } from "./AuthContext";
import { useCartContext } from "./CartContext";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const { dbUser } = useAuthContext();
	const { totalPrice, userCartItems, setUserCartItems } = useCartContext();

	useEffect(() => {
		//check if order exists
		if (dbUser) {
			DataStore.query(Order, (order) => order.userID("eq", dbUser.sub)).then(
				setOrders
			);
		}
	}, [dbUser]);

	const addCartToOrder = async (userCart) => {
		const newOrder = await DataStore.save(
			new Order({
				userID: dbUser.sub,
				total: totalPrice,
				status: "NEW",
			})
		);
		await Promise.all(
			userCartItems.map((cartItem) =>
				DataStore.save(
					new OrderDrink({
						orderID: newOrder.id,
						Drink: cartItem,
						quantity: cartItem.quantity,
					})
				)
			)
		);

		setOrders([...orders, newOrder]);
		//reset cart items state
		setUserCartItems([]);
		//delete cart from datastore
		DataStore.delete(Cart, userCart.id);
	};

	const fetchOrders = async (orderID) => {
		const order = await DataStore.query(Order, (order) =>
			order.userID("eq", orderID)
		);
		const orderItems = await DataStore.query(OrderDrink, (orderItem) =>
			orderItem.orderID("eq", orderID)
		);

		return { ...order, cart: orderItems };
	};

	return (
		<OrderContext.Provider value={{ orders, addCartToOrder, fetchOrders }}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrderContext = () => useContext(OrderContext);
