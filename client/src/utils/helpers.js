export function formatCurrency(num){
    return typeof num==='number' ? `₹${num.toFixed(2)}`:num;
}