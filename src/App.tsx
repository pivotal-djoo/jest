import React from "react";
import {Order} from "./Order/Order";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Confirmation} from "./Confirmation/Confirmation";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Order />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="*" element={<Order />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
