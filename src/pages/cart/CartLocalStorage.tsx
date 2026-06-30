import { useState } from "react";
// 실제 사용할 때는 props로 상품 정보를 받아와서 저장하는 방식이 좋아
function CartLocalStoage (){
   const addItemCart =() => { 
    // 임의 상품 데이터 (나중에는 클릭한 상품 데이터로 대체해)
    const newItem = {id: Date.now, name: "강릉 커피 투어", price: 25000};

    // 기존 장바구니 데이터 가지고 오기 
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    // 새로운 상품 추가 
    cart.push(newItem);

    // 다시 localstorage에 저장 
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담겼습니다");
   }
    return (
        <div>
            <h1>상품을 장바구니에 담아 주세요</h1>
            <button onChange={addItemCart}>장바구니</button>
        </div>
    )
}
export default CartLocalStoage;