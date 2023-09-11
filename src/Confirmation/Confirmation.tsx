import React from "react";
import {useLocation} from "react-router-dom";

export function Confirmation() {
    const {state} = useLocation();

    return (
        <>
            <h2>Order Confirmed</h2>

            <div>Pizza size: {state.size}</div>
            <div>Dough: {state.dough}</div>
            <div>Toppings: </div>
            {state.toppings.map(topping => <div>{topping}</div>)}
        </>
    )
}
