import React , {useState, useEffect} from "react";
import axios from "axios";
import { useFormStatus } from "react-dom";

// 회원 정보 데이터의 타입을 미리 정의 해두면 typescript을 쓸때 오류 방지 가능성 있음 
interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    regDate: string;
}

function AdminMainMember(){
    // 상태 관리 : 회원 리스트 
    const [members, setMembers]= useState<Member[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    // 백엔드 api 연동 영역 주설 처리 예측 
    useEffect(()=>{
        const token = localStorage.getItem("token");
      axios.get("http://localhost:8080/api/admin/members", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
   // 회면 확인 시 임시 데이터 (내일 api 연결 하면 이부분 지울 꺼야 )

   setLoading(false);
    }, []);
    //이벤트  핸들러 회원 삭제 
    const handlerDelete = async(id: number) =>{
      if(!window.confirm("정말 삭제 하시 겠습니까")) return;
      try{
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/members/${id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        // 삭제후  목록 새로 고침 
        setMembers(members.filter(m=>m.id !== id));
        alert("삭제 되었습니다");
      }catch (err){
        console.error("삭제 실패", err);
        alert("삭제에 실패 했습니다");
      }
    };
    if(loading) return <div>로딩중</div>;
    return (
      <div>
        <h2>회원 관리 목록</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한 </th>
              <th>가입일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member)=> (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.regDate}</td>
                <td><button onClick={()=> handlerDelete(member.id)}>삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )


}
export default AdminMainMember;
