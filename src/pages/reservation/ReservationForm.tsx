import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
function ReservationForm(){
    const [data , setData] = useState<Data>(new Data());

    const addReservation = () => {
        // 날짜 함수를 형식을 문자열로 변환 
        const formData = data.toISOString().split
    }








    return (
        <div>

        </div>
    )

}
export default ReservationForm;