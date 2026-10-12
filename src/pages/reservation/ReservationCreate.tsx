import React, {useState} from "react";

function ReservationCreate (){
    const [formDate , setFormDate] = useState({
        productName: "",
        departurDate: "",
        headCount: 1,
        memo: ""
    })
    return (
        <div>
            <p>예약 하기</p>
        </div>
    )
}

export default ReservationCreate;