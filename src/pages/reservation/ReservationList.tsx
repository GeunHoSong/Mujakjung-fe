import React from "react";
interface ReservationItem {
    id: number;
    productName: string;
    departureDate: string;
    status: string;

}

interface ReservationListProps {
    reservation: ReservationItem[];
    onDelete: (id: number) => void;    
}
function ReservationList({ reservation = [], onDelete } : ReservationListProps) {
    return (
        <div>
            <h2>나의 예약 내역 목록</h2>
            {reservation.length === 0 ? (
                <p style={{ color: '#777', marginTop: '15px' }}>예약된 내용이 없습니다.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                    {reservation.map((item) => (
                        <li 
                            key={item.id} 
                            style={{ 
                                marginBottom: '15px', 
                                padding: '15px', 
                                border: '1px solid #ddd', 
                                borderRadius: '8px', 
                                backgroundColor: '#f9f9f9', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
                            }}
                        >
                            <div>
                                <p style={{ margin: '3px 0' }}><strong>상품명:</strong> {item.productName}</p>
                                <p style={{ margin: '3px 0' }}><strong>출발 날짜:</strong> {item.departureDate}</p>
                                <p style={{ margin: '3px 0' }}><strong>상태:</strong> <span style={{ color: 'blue' }}>{item.status}</span></p>
                            </div>
                            
                            <button 
                                onClick={() => onDelete(item.id)} 
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
    );
}

export default ReservationList;