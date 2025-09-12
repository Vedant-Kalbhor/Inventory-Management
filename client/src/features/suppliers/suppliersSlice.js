import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";

export const fetchSuppliers = createAsyncThunk('suppliers/fetch',async () =>{
    const res= await api.get(ENDPOINTS.SUPPLIERS);
    return res.data;    
});

const slice = createSlice({
    name:'suppliers',
    initialState:{list:[],status:'idle',error:null},
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchSuppliers.fulfilled,(s,a)=>{s.list=a.payload ;s.status='succeeded';})
        .addCase(fetchSuppliers.pending , (s)=>{s.status ='loading';})
        .addCase(fetchSuppliers.rejected,(s,a)=>{s.status='failed';s.error=a.error.message;})

    }

});

export default slice.reducer;