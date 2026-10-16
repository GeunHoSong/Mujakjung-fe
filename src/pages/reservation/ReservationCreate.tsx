import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

function ReservationCreate (){
    const [formDate, setFormDate] = useState({
        productName: "",
        departurDate: "",
        headCount: 1,
        memo: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 입력값 변경 핸들러 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormDate((prev) => ({
            ...prev, [name]: value
        }));
    };

    // 인원수 증감 버튼 핸들러
    const handleHeadCountChange = (delta: number) => {
        setFormDate((prev) => ({
            ...prev,
            headCount: Math.max(1, prev.headCount + delta)
        }));
    };

    // 예약 제출 핸들러 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            // 백엔드 예약 생성 API 전송 
            await api.post("/api/reservations", formDate);
            alert("예약이 성공적으로 완료 되었습니다 ");
            navigate("/reservations/ReservationList");
        } catch (error) {
            console.error("예약 실패", error);
            alert("예약 처리중 오류가 발생 했습니다");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
           <h2>여행 예약 하기</h2>
           <hr style={{ border: "0", borderTop: "1px solid #eee", marginBottom: "20px" }}/>
           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
                 <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>상품명</label>
                 <input 
                    type="text" 
                    name="productName" 
                    value={formDate.productName} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #eee" }} 
                    placeholder="예약할 상품명을 입력을 하세요" 
                 />
            </div>
            <div>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>출발일</label>
                <input 
                    type="date" 
                    name="departurDate" 
                    value={formDate.departurDate} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #eee" }} 
                />
            </div>
            <div>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>인원수</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button 
                        type="button"
                        onClick={() => handleHeadCountChange(-1)}
                        style={{ padding: "10px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        -
                    </button>
                    <input 
                        type="number" 
                        name="headCount" 
                        min="1" 
                        value={formDate.headCount} 
                        onChange={handleChange} 
                        style={{ padding: "10px", width: "80px", textAlign: "center", borderRadius: "6px", border: "1px solid #eee" }} 
                    />
                    <button 
                        type="button"
                        onClick={() => handleHeadCountChange(1)}
                        style={{ padding: "10px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>요청사항 (메모)</label>
                <textarea 
                    name="memo" 
                    value={formDate.memo} 
                    onChange={handleChange} 
                    rows={4} 
                    style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #eee" }} 
                    placeholder="전달할 요청 사항을 적어 주세요"
                />
            </div>
            <button 
                type="submit" 
                disabled={loading} 
                style={{ 
                    padding: "14px", 
                    backgroundColor: loading ? "#cbd5e1" : "#4F46E5", 
                    color: "#fff", 
                    border: "none",
                    borderRadius: "8px", 
                    fontSize: "16px", 
                    fontWeight: "bold", 
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "예약 처리 중 .... " : "예약 확정 하기"}
            </button>
           </form>
        </div>
    );
}

export default ReservationCreate;