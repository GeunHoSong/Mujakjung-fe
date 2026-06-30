import axios from "axios";
import { useState, useEffect} from "react";

function CartOrder(){
    const [orderItems , setOrderItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);

    useEffect(()=>{
        // 장바구니 데이터 가지고 오기 
        const savedCart = localStorage.getItem("cart");
        if(savedCart){
            const items = JSON.parse(savedCart);
            setOrderItems(items);
            // 총 금액 계산 
            const total = items.reduce((sum: number ,item: any )=> sum + item.price, 0);
            setTotalPrice(total);
        }
    }, [])
    // 결제 버튼 클릭시  백엔드 서버로 전송 
    const handlePayment = async ()=> {
        try {
            const response = await axios.post("http://localhost:8080/api/order", {
                items: orderItems,
                totalPrice: totalPrice,
                customerName: "홍길동 " // 실제 구현 시 로그인한 사용자 정보로 대체
            });
            alert("결제 완료! 주문 번호 :" + response.data.order_id );
        }catch (error){
            console.error("결제 실패 ", error);
            alert("결제 처리 중 에러가 발생 했습니다")
        }
    }    
  return (
    <div style={{ padding: "20px" }}>
      <h1>주문서 작성</h1>
      <div>
        {orderItems.map((item: any, index) => (
          <p key={index}>{item.name} : {item.price.toLocaleString()}원</p>
        ))}
      </div>
      <hr />
      <h3>총 결제 금액: {totalPrice.toLocaleString()}원</h3>
      <button onClick={handlePayment}>최종 결제하기</button>
    </div>
  );
}

export default CartOrder;