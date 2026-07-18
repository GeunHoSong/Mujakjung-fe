import React, {useState, useEffect} from "react";
import axios from "axios";

function AdminRemainingSeats(){
    const [seats , setSeats] = useState([]);
    // 데이터 로드(나중에 백엔드 api 연동 )
    useEffect(()=> {
        // axios.get('/api/admin/seats').then(res => setSeats(res.data));
    }, [])

    return (
        <div>
            <h1>잔역석 확인</h1>
            <hr/>
            <table border={1} style={{width:"100%", marginTop:"20px", textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>출발함</th>
                        <th>정원</th>
                        <th>잔여석</th>
                    </tr>
                </thead>
                <tbody>
                    {/**데이터가 있을 때만 map으로 뿌려주면 돼  */}
                    {seats.length ===0 ? (
                        <tr><td colSpan={4}>데이터가 없습니다 </td></tr>
                    ):(
                        seats.map((item: any)=> (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.data}</td>
                                <td>{item.maxPeople}</td>
                                <td>{item.remaining}</td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminRemainingSeats;