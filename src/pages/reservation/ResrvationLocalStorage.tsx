import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // 달력 기본 스타일 

function ResrvationLocalStorage() {
    const [date, setDate] = useState<Date>(new Date());
    const [reservations, setReservations] = useState<any[]>([]);

    // 1. 컴포넌트가 처음 렌더링될 때 localStorage에서 예약 불러오기
    useEffect(() => {
        const saved = localStorage.getItem("reservation");
        if (saved) {
            setReservations(JSON.parse(saved));
        }
    }, []);

    // 2. 예약 하기 함수
    const addReservation = () => {
        const formattedDate = date.toISOString().split('T')[0];

        const newReservation = {
            id: Date.now(),
            productName: "강릉 커피 투어",
            departureData: formattedDate,
            status: "예약 완료"
        };

        const updatedList = [...reservations, newReservation];
        setReservations(updatedList);
        localStorage.setItem("reservation", JSON.stringify(updatedList));
        
        alert(`${formattedDate} 예약이 완료되었습니다!`);
    };

    // 3. 예약 취소 하기 
    const handleDelete = (id: number) => {
        const updated = reservations.filter((item) => item.id !== id);
        setReservations(updated);
        localStorage.setItem("reservation", JSON.stringify(updated));
    };

    return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>나의 예약 시스템</h1>
            
            {/* 상단: 달력 및 예약 입력 영역 */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', flexWrap: 'wrap', borderBottom: '1px solid #ddd', paddingBottom: '30px' }}>
                <div>
                    <p><strong>출발 날짜를 선택해주세요</strong></p>
                    <Calendar onChange={(value) => setDate(value as Date)} value={date} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p>선택한 날짜: <br/><strong>{date.toISOString().split('T')[0]}</strong></p>
                    <p>상품명: <strong>강릉 커피 투어</strong></p>
                    <button 
                        onClick={addReservation}
                        style={{ 
                            marginTop: '15px', 
                            padding: '10px 20px', 
                            backgroundColor: '#4CAF50', 
                            color: 'white', 
                            border: 'none', 
                            cursor: 'pointer', 
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                    >
                        예약 하기
                    </button>
                </div>
            </div>

            {/* 하단: 예약 내역 목록 영역 */}
            <div>
                <h2>예약 내역 목록</h2>
                {reservations.length === 0 ? (
                    <p style={{ color: '#777' }}>예약된 내용이 없습니다.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {reservations.map((item) => (
                            <li key={item.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ margin: '3px 0' }}><strong>상품명:</strong> {item.productName}</p>
                                    <p style={{ margin: '3px 0' }}><strong>출발 날짜:</strong> {item.departureData}</p>
                                    <p style={{ margin: '3px 0' }}><strong>상태:</strong> <span style={{ color: 'blue' }}>{item.status}</span></p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item.id)} 
                                    style={{ 
                                        padding: '8px 12px', 
                                        backgroundColor: '#ff4d4d', 
                                        color: 'white', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        borderRadius: '4px' 
                                    }}
                                >
                                    예약 취소 하기
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ResrvationLocalStorage;