import React from "react";
import ProductList from "../../features/products/ProductList";

export default function ManagerHome(){
    return (
        <div >
            <h1 className="text-2xl font-semibold mb-4">Manager</h1>
            <ProductList/>
        </div>
    );
}