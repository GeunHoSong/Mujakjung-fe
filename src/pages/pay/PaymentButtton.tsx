import React from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";

function PaymentButton (){
    const handlePayment = async ()=>  {
        try{
            const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
            const tossPayments = await loadTossPayments(clientKey);

            await tossPayments.requestPayment('카드',{
                amount: 15000,
                orderId: 'ORDER_' + new Date().getTime(),
                orderName: '무작정 여행 패키지',
                customerName: '홍길동',
                successUrl: window.location.origin + '/payment/success',
                failUrl : window.location.origin  + '/payment.fail'

            });
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handlePayment}>결제 하기 </button>
        </div>
    )
}

export default PaymentButton