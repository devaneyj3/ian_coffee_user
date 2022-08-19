import React, { useState, createContext, useContext, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Cart, CartItem } from "../models";

import { useAuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
	const [userCart, setUserCart] = useState(null);
	const [userCartItems, setUserCartItems] = useState([]);
	const { dbUser } = useAuthContext();

	useEffect(() => {
		if (dbUser) {
			createCartIfNoneExist();
		}
	}, [dbUser]);

	useEffect(() => {
		if (userCart) {
			DataStore.query(CartItem, (item) => item.cartID("eq", userCart.id)).then(
				setUserCartItems
			);
		}
	}, [userCart]);

	const totalPrice = userCartItems.reduce(
		(sum, cartItems) => sum + cartItems.quantity * cartItems.Drink.price,
		0
	);

	//create cart if it doesn't exist
	const createCartIfNoneExist = async () => {
		//check if cart exists
		const cartExists = await DataStore.query(Cart, (cart) =>
			cart.userID("eq", dbUser.sub)
		);
		if (cartExists.length < 1) {
			const newCart = new Cart({
				userID: dbUser.sub,
			});
			await DataStore.save(newCart);
			setUserCart(newCart);
		} else {
			setUserCart(cartExists[0]);
		}
	};

	const addToCart = async (cartId, product, quantity) => {
		const cartItem = new CartItem({
			cartID: cartId,
			quantity: quantity,
			Drink: product,
		});
		await DataStore.save(cartItem);
		setUserCartItems([...userCartItems, cartItem]);
	};

	return (
		<CartContext.Provider
			value={{
				userCart,
				userCartItems,
				addToCart,
				totalPrice,
				setUserCartItems,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);
