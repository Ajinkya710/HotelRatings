import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
    // const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([])

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (
        <RestaurantsContext.Provider
            value={{
                restaurants,
                setRestaurants,
                addRestaurants,
                // selectedRestaurant,
                // setSelectedRestaurant,
            }}
        >
            {props.children}
        </RestaurantsContext.Provider>
    )
}