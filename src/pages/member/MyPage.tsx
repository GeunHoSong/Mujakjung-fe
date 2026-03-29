import React,{useState , useEffect, Profiler} from "react";
import axios from "axios";
// 함수형 컴포 넌트 선언 
function Mypage(){
    // 사용자의 전체 프로필 정보를 답을 변수 (state)
    const [userProflie, setUserProfile] = useState({
        nickname: '', // 닉네임 
        bio : '' , // 자기 소개서 (한 줄 평)
        profileTmg: '', // 프로필 이미지 경로 또는 url
        email: '', // 이메일 
    })
    // 페이지 로딩시 백엔드 (8080) 에서 데이터 가져오기 
    useEffect(()=>{
        //백엔드 컨트롤러의 @GetMapping("/api/member/mypage") 호출
        axios.get('http://localhost:8080/api/member/mypage')
        .then(res => {
            setUserProfile(res.data);// 서버에서 준 정보로 변수 채우기
        })
        .catch(err => console.error("데이터 로딩 실패!", err))
    },[]);
    // 입력 값 이 바뀔때 호출 되는 함수 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value}= e.target;
        setUserProfile({
            ...userProflie, [name]: value
        });
    };
    // 화면에 그려주는 부분 (return이 없으면 컴포넌트 에러 발생)
    return (
        <div style={{padding:'20px'}}>
            <h1>마이페이지</h1>
            <div style={{marginBottom:'10px'}}>
                <label>닉네임:</label>
                <input name="nickname" value={userProflie.nickname} 
                onChange={handleChange}/>
            </div>
            <div style={{marginBottom:'10px'}}>
                <label>자기소개:</label>
                <input name="bio" value={userProflie.bio} onChange={handleChange}/>
            </div>
        </div>
    )
}
export default Mypage;