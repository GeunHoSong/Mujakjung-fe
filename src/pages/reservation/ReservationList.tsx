import { useState } from "react";

function ReservationList({reservation ,onDelete}){

    return (
        <div>
            <h2>나의 예약 시스템</h2>
            {reservation.length === 0 ? (
                <p style={{color: '#777', marginTop: '15px'}}>예약된 내용이 없습니다</p>
            ):(
                <ul style={{listStyle: 'none', padding: 0 , marginTop: '15px' }}>
                    {reservation.map((item)=>(
                        <li key={item.id} style={{marginBottom: '15px', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', display: 'flex'
                            , justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0,0.25)'}}>\
                            <div>
                                <p style={{margin: '3px 0'}}><strong>상품명</strong>{item.productName}</p>
                                <p style={{margin: '3px 0'}}><strong>출발 날짜</strong>{item.departureData}</p>
                                <p style={{margin: '3px 0'}}><strong>상태</strong>{item.status}</p>



                                </div>
                            </li>

                   ))}

                </ul>
            )}
        </div>
    )
}

export default ReservationList;