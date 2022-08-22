import React, { useState, createContext, useContext, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Drink } from "../models";

const DrinkContext = createContext();

export const DrinkContextProvider = ({ children }) => {
	const [drinks, setDrinks] = useState([]);

	useEffect(() => {
		const fetchDrinks = async () => {
			const response = await DataStore.query(Drink);
			// await DataStore.clear();
			// await DataStore.start()
			setDrinks(response);
		};
		fetchDrinks();
	}, []);

	const addDrink = async (drink) => {
		//add drink to datastore
		const newDrink = await DataStore.save(new Drink(drink));
		//add drink to state
		setDrinks([...drinks, newDrink]);
	};

	const getDrinkInfo = async (id) => {
		const drink = await DataStore.query(Drink, id);

		return drink;
	};

	return (
		<DrinkContext.Provider value={{ drinks, addDrink, getDrinkInfo }}>
			{children}
		</DrinkContext.Provider>
	);
};

export const useDrinkContext = () => useContext(DrinkContext);
