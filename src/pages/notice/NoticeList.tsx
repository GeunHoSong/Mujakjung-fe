import React,  {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../axiosConfig";
interface Notice {
    id: number;
    title: string;
    writer:string;
    regDate: string;
}

function NoticeList() {
    const [notice , setNotice] = useState<Notice[]>([]);
    const naviagte = useNavigate();

    useEffect (()=> {
        fetchNotice();
    },  [])

    const fetchNotice = async () => {
        try{
            const res = await apiClient.get(`/api/notice/list`);
            setNotice(res.data);
        }catch ( error ){
            console.error("공지사항 등록 실패", error);
        }
    
    }
    return (
        <div>
            <h2>목록 화면 입니다</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {notice.map((notice)=> (
                        <tr key={notice.id} style={{borderBottom: "1px solid #ddd", cursor: "pointer"}} onClick={()=> naviagte(`/notice/${notice.id}`)}>
                            <td style={{padding: "10px", textAlign: "center"}}>{notice.id}</td>
                            <td style={{padding: "10px", textAlign: "center"}}>{notice.title}</td>
                            <td style={{padding: "10px", textAlign: "center"}}>{notice.regDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={()=> naviagte("/notice/save")}>공지 작성</button>
        </div>
    )
}

export default NoticeList;