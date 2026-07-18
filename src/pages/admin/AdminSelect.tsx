import React, {useState, useEffect} from "react";
import axios from "axios";

function AdminSelect(){
    const [data , setDate] = useState([]);
    
    // 데이터 로드 로직 (나중에 백엔드 api 연결)
    useEffect (()=>{
        // 예시 axios.get('/api/admin/select-data').then(res => setData(res.data));
        console.log("데이터 조회 시작");

    }, []);


    return (
        <div>
           <h2>상세 조회  및 선택</h2>
           <hr/>
           <p>매출 전표 확인</p>
           {/*데이터가 들어 올 표 */}
           <table border={1} style={{width: "100%", marginTop: "20px"}}>
            <thead>
                <tr>
                    <th>선택</th>
                    <th>상품명</th>
                    <th>출발 날짜</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4}>데이터가 없습니다 api 연결 하세요 </td>
                </tr>
            </tbody>

           </table>
        </div>
    )

}
export default AdminSelect;