
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
function ReservationForm(){
    const [date , setDate] = useState<Date>(new Date());

    const addReservation = () => {
        // 날짜 함수를 형식을 문자열로 변환 
        const formattedDate = date.toISOString().split('T')[0];

        const newReservation = {
            id: Date.now(),
            productName: "강릉 커피 투어",
            departureData: formattedDate,
            status: "예약 종료 "
        };
        const saveReserations = localStorage.getItem("reseration");
        const reseration= saveReserations? JSON.parse(saveReserations) : [];

        reseration.push(newReservation);
        localStorage.setItem("reseration" , JSON.stringify(reseration));
        alert(`${formattedDate}예약이 완료 되어 습니다` );

    }
    return (
        <div style={{ padding: '20px'}}>
            <h1>예약 하기 </h1>
            <p>출발 날짜를 선택을 해주세요</p>
            <div style={{marginBottom:'20px'}}>
                <Calendar onChange={(value)=> setDate(value as Date)} value={date}/>
            </div>
            <div>
                <p>선택 날짜: <strong>{date.toISOString().split('T')[0]}</strong></p>
                <button 
                onClick={addReservation}
                style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>예약 하기</button>
            </div>


        </div>
    )

}
export default ReservationForm;