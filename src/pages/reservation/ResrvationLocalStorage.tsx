import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function ResrvationLocalStorage() {
    // 선택된 날짜를 관리하는 state (기본값: 오늘 날짜)
    const [date, setDate] = useState<Date>(new Date());
    
    // localStorage에 저장된 예약 내역 목록을 관리하는 state
    const [reservations, setReservations] = useState<any[]>([]);

    // 1. 컴포넌트가 처음 화면에 뜰 때(마운트 시) localStorage에서 기존 예약 목록 불러오기
    useEffect(() => {
        const saved = localStorage.getItem("reservation");
        if (saved) {
            setReservations(JSON.parse(saved)); // 문자열을 배열로 변환해서 state에 담기
        }
    }, []);

    // 2. 예약하기 버튼을 눌렀을 때 실행되는 함수 (선택한 날짜로 예약 추가)
    const handleReservation = () => {
        // 선택한 날짜 객체를 "YYYY-MM-DD" 형식의 문자열로 변환
        const formattedDate = date.toISOString().split('T')[0];
        
        // 새로 추가할 예약 객체 데이터 생성
        const newReservation = {
            id: Date.now(), // 고유 ID 부여 (현재 시간 밀리초 활용)
            productName: "강릉 커피 투어",
            departureData: formattedDate,
            status: "예약 완료"
        };

        // 기존 예약 목록에 새로운 예약을 합쳐서 새로운 배열 생성
        const updated = [...reservations, newReservation];
        
        // State 업데이트 및 localStorage에 문자열 형태로 저장
        setReservations(updated);
        localStorage.setItem("reservation", JSON.stringify(updated));

        alert(`${formattedDate} 예약이 완료되었습니다!`);
    };

    // 3. 특정 예약 내역을 취소(삭제)하는 함수
    const handleDelete = (id: number) => {
        // 클릭한 id와 일치하지 않는 항목들만 남겨서 새로운 배열 필터링
        const updated = reservations.filter((item) => item.id !== id);
        
        // State 업데이트 및 localStorage 갱신
        setReservations(updated);
        localStorage.setItem("reservation", JSON.stringify(updated));
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>나의 예약 시스템</h1>

            {/* 상단 영역: 달력 및 예약하기 인터페이스 */}
            <div style={{ 
                display: 'flex', 
                gap: '40px', 
                marginBottom: '40px', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {/* 달력 컴포넌트 */}
                <div>
                    <p style={{ marginTop: 0 }}><strong>출발 날짜를 선택해주세요</strong></p>
                    <Calendar onChange={(value) => setDate(value as Date)} value={date} />
                </div>

                {/* 선택한 정보 확인 및 예약 버튼 */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '200px' }}>
                    <p style={{ margin: '5px 0' }}>상품명: <strong>강릉 커피 투어</strong></p>
                    <p style={{ margin: '5px 0 15px 0' }}>선택한 날짜: <br/><strong style={{ color: '#007bff' }}>{date.toISOString().split('T')[0]}</strong></p>
                    <button 
                        onClick={handleReservation}
                        style={{ 
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

            {/* 하단 영역: 나의 예약 내역 목록 리스트 */}
            <div>
                <h2>나의 예약 내역 목록</h2>
                {reservations.length === 0 ? (
                    // 예약 내역이 없을 때 보여줄 문구
                    <p style={{ color: '#777', marginTop: '15px' }}>예약된 내용이 없습니다.</p>
                ) : (
                    // 예약 내역이 있을 때 map 함수를 돌려 리스트로 출력
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                        {reservations.map((item) => (
                            <li key={item.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div>
                                    <p style={{ margin: '3px 0' }}><strong>상품명:</strong> {item.productName}</p>
                                    <p style={{ margin: '3px 0' }}><strong>출발 날짜:</strong> {item.departureData}</p>
                                    <p style={{ margin: '3px 0' }}><strong>상태:</strong> <span style={{ color: 'blue' }}>{item.status}</span></p>
                                </div>
                                {/* 예약 취소 버튼 */}
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