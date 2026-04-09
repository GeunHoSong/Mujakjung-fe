import React,{useState , useEffect} from "react";
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
    // 추가 저장 기능 
    const handleSave = () => {
        axios.post('http://localhost:808/api/member/mypage/update', userProflie).then(()=> alert("정보가 성공 적으로 수정이 되었습니다!") ).catch(err => alert("저장 실패"));
    }
    // 화면에 그려주는 부분 (return이 없으면 컴포넌트 에러 발생)
    return (
        <div style={{padding:'20px', maxWidth: '400px', margin: '0 auto'}}>
            <h1 style={{borderBottom: '2px solid #333', paddingBottom:'10px'}}>마이페이지</h1>

             {/* 1. 프로필 이미지 섹션 */}
             <div style={{textAlign: 'center', margin:'20px 0'}}>
                <img src="{userProfile.profile}" alt="profile" style={{width: '120px' , height: '120px', borderRadius: '50%', objectFit: 'cover' , border: '1px solid  #ddd'}} />

             </div>
            <div style={{marginBottom:'10px'}}>
                <label>닉네임:</label>
                <input name="nickname" value={userProflie.nickname} 
                onChange={handleChange}/>
            </div>
            <div style={{marginBottom:'10px'}}>
                <label>자기소개:</label>
                <input name="bio" value={userProflie.bio} onChange={handleChange}/>
            </div>
            <button onClick={handleSave} style={{width: '100px', padding:'12px' , background: '#4A90E2', color: 'white', border: 'none',cursor: 'pointer', fontWeight:'bold'}}>
                정보 수정 하기 
            </button>
            <hr  style={{margin: '30px 0', border: '0.5px solid #eee' }}/>
            <div style={{display: 'geid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                <button style={meunButtonStyle}>장바 구니</button>
                <button style={meunButtonStyle}>주무내역</button>
                <button style={meunButtonStyle}>찜한 상품</button>
                <button style={meunButtonStyle}>설정</button>
            </div>
        </div>
    )
}
const meunButtonStyle ={
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRedius: '8px',
    cursor: 'poninter',
    fontSize: '14px'
}
export default Mypage;