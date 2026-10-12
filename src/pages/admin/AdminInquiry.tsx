import axios from "axios";
import React, { use, useEffect, useState } from "react";
interface Inquiry {
    id: number;
    title: string;
    content: string;
    writer: string;
    regDate: string;
    status : string;
    answer? : string;
}

function AdminInquiry(){
    const [inquiries , setInquires] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedInquiry , setSelectedIquiry] = useState<Inquiry | null >(null);
    const [answerText , setAnswerText] = useState<string>("");

    const fetchInquiries = async () =>  {
        try{
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:8080/api/admin/inquires", {
                 headers: {Authorization: `Bearer${token}`}

            });
            setInquires(response.data);
        }catch(error) {
            console.log("문의 목록 조회 실패: ", error);
            // api  연결 전 데스트용 임시 데이터 
            setInquires([
                {id: 1, title: "후쿠오카 문의요", content: "일정이 어떻게 되나요", writer:"jigu1993@naver.com", regDate: "2026-10-12", status: "WAITING"}
            ]);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInquiries();
    })

    const handleAnswerSumit = async (id : number) => {
        if(!answerText.trim){
            alert("답변 내용을 입력을 하세요");
            return ;
        }

        try{
            const token  = localStorage.getItem("accessToken");
            await axios.post(`http://localhost:8080/api/inquires/${id}/answer`,
                {answer: answerText},
                {headers: {Authorization: `Bearer${token}`}}
            );
            alert("답변이 등록되었습니다");
            setSelectedIquiry(null);
            fetchInquiries()
        }catch(err){
            console.log("답변 등록 실패", err);
            alert(" 답변 등록이 실패 했습니다");
        }
    }
    if (loading) return <div>로딩중 ....</div>

    return (
        <div style={{padding: "20px"}}>
            <h2>1:1고객 센터 문의 관리</h2>
            <table border={1} style={{width: "100%", borderCollapse: "collapse", textAlign: "center" , marginTop: "20px" }}>
                <thead>

                    <tr style={{ backgroundColor: "#f4f4f4"}}>
                        <td>ID</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>등록일</td>
                        <td>상태</td>
                        <td>관리</td>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td style={{textAlign: "left", paddingLeft:"10px"}}>{item.title}</td>
                            <td>{item.writer}</td>
                            <td>{item.regDate}</td>
                            <td>
                                <span style={{color: item.status === "WAITING" ? "red" : "green", fontWeight: "bold" }}>
                                    {item.status === "WAITING" ? "답변 대기": "답변완료"}
                                </span>
                            </td>
                            <td>
                                <button onClick={()=> {setSelectedIquiry(item); setAnswerText(item.answer || "" )}}>
                                    상세/답변
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedInquiry && (
                <div style={{marginTop: "30px", padding: "20px", border: "1px solid #ccc", background: "#fafafa"}}>
                    <h3>문의 상세 내용</h3>
                    <p><strong>작성자:</strong> {selectedInquiry.writer}</p>
                    <p><strong>제목:</strong> {selectedInquiry.title}</p>
                    <p><strong>내용:</strong> {selectedInquiry.content}</p>
                    <h4 style={{marginTop: "20px"}}>관리자 답변</h4>
                    <textarea rows={4} style={{width: "100%", padding: "10px"}} value={answerText} onChange={(e)=> setAnswerText(e.target.value)} placeholder="답변을 입력 하세요"/>
                    <div style={{marginTop: "10px" , textAlign: "right"}}>
                        <button onClick={()=> setSelectedIquiry(null)} style={{ marginRight: "10px"}}>닫기</button>
                        <button onClick={()=> handleAnswerSumit(selectedInquiry.id)} style={{background: "#4CAF50", color: "white", border: "none" , padding: "8px 15px", cursor:"pointer"
                         }}>
                            답변 등록
                         </button>

                    </div>


                </div>
            )}
        </div>
    )
}

export default AdminInquiry;