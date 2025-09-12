import React,{useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchOrders,updateOrderStatus } from "./ordersSlice";

export default function OrdersList(){
    const dispatch = useDispatch();
    const { list,status }=useSelector((s)=>s.orders);   

    useEffect(()=>{
        if(status==='idle') dispatch(fetchOrders());

    },[dispatch,status]);

    if(status==='loading')return <div>Loading Orders...</div>
}