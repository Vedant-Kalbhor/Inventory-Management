import { useState } from "react";


export default function useBarcodeScanner(){
    const[lastScanned,setLastScanned]=useState(null);

    function startScan(){
        const value = window.prompt('scan- enter SKU or barcode value:');
        if (value) setLastScanned(value);
    }
    return {startScan,lastScanned};
}