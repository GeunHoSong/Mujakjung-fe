import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css'; 

function ResrvationLocalStorage() {
    const [reservations, setReservations] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("reservation");
        if (saved) {
            setReservations(JSON.parse(saved));
        }
    }, []);

    const handleDelete = (id: number) => {
        const updated = reservations.filter((item) => item.id !== id);
        setReservations(updated);
        localStorage.setItem("reservation", JSON.stringify(updated));
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>나의 예약 시스템</h1>
            {reservations.length === 0 ? (
                <p>예약된 내용이 없습니다.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reservations.map((item) => (
                        <li key={item.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: '5px 0' }}><strong>상품명:</strong> {item.productName}</p>
                            <p style={{ margin: '5px 0' }}><strong>출발 날짜:</strong> {item.departureData || item.departureDate}</p>
                            <p style={{ margin: '5px 0' }}><strong>상태:</strong> {item.status}</p>
                            <button 
                                onClick={() => handleDelete(item.id)} 
                                style={{ 
                                    marginTop: '10px',
                                    padding: '6px 12px', 
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
    );
}

export default ResrvationLocalStorage;