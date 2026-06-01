import axios from "axios";
import React, {useEffect, useState} from "react";


interface TravelData {
    id: number;
    title: string;
    location: string;
    price: string;
}

function AdminList(){
    const  [places, setPlaces] = useState<TravelData[]>([]);


    // 서버에 데이터 불러 오기
    const fetchPlaces =()=> {
        axios.get("http://locahost:8080/api/travels").then((res)=> setPlaces(res.data)).catch((err)=> console.error("데이터 로딩 실패", err));
    }


    useEffect(()=>{
        fetchPlaces()
    }, []);

    const handleDelete = (id: number)=> {
        if(!confirm("정말 삭제 하겠습니까??")) return;

        axios.delete(`http://localhost:8080/api/admin/delete/${id}`).then(()=> {
            alert("삭젝가 되었습니다 ");
            fetchPlaces()// 삭제 후 목록 새로 고침 

        })
        .catch(()=> alert("삭제 실패"));
    };

    return (
        <div style={{padding: "20px"}}>
            <table>
                <tr style={{borderBottom: "12px solid #ddd"}}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>위치</th>
                    <th>가격</th>
                    <th>관리</th>
                </tr>
            </table>
            <tbody>
                {places.map((place)=>(
                    <tr key={place.id} style={{borderBottom: "1px solid #ddd"}}>
                        <td>{place.id}</td>
                        <td>{place.title}</td>
                        <td>{place.location}</td>
                        <td>{place.price}</td>
                        <td>
                            <button onClick={()=> handleDelete(place.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </div>
    )

}

export default AdminList;