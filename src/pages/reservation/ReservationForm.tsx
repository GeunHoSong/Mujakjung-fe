import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom"; // 페이지 이동용

function ReservationForm(){
    const [date, setDate] = useState<Date>(new Date());
    const navigate = useNavigate();

    const addReservation = () => {
        const formattedDate = date.toISOString().split('T')[0];

        const newReservation = {
            id: Date.now(),
            productName: "강릉 커피 투어",
            departureData: formattedDate,
            status: "예약 완료" // 상태 문구도 '예약 완료'가 자연스럽겠지?
        };

        // 'reseration' 오타를 'reservation'으로 통일!
        const saveReservations = localStorage.getItem("reservation");
        const reservationList = saveReservations ? JSON.parse(saveReservations) : [];

        reservationList.push(newReservation);
        localStorage.setItem("reservation", JSON.stringify(reservationList));
        
        alert(`${formattedDate} 예약이 완료되었습니다!`);
        
        // 예약 완료 후 내역 페이지로 바로 이동!
        navigate("/reservation/ReservationLocalStorage");
    };

    return (
        <div style={{ padding: '20px'}}>
            <h1>예약 하기</h1>
            <p>출발 날짜를 선택해주세요</p>
            <div style={{marginBottom:'20px'}}>
                <Calendar onChange={(value)=> setDate(value as Date)} value={date}/>
            </div>
            <div>
                <p>선택 날짜: <strong>{date.toISOString().split('T')[0]}</strong></p>
                <button 
                    onClick={addReservation}
                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    예약 하기
                </button>
            </div>
        </div>
    );
}

export default ReservationForm;