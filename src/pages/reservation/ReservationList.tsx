import { useState, useEffect } from "react";
interface CartItem{
    id: number;
    name: string;
    price: number;
}

function CartList(){
    const [item, setItem ]= useState<CartItem[]>([]) 
    useEffect(()=>{
        // localstorage에서 데이터 불러 오는 중 
        const saveCart = localStorage.getItem("cart");
        if(saveCart) {
            setItem(JSON.parse(saveCart));
        }
    }, [])
    return (
        <div>
            <p>리스트 불러 오는 중 .....</p>
        </div>
    )


}

export default CartList;