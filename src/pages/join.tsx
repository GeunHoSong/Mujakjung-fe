// 리액트 에서 상태 state 을 사용 하기 위해 userstate  import 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join(){
    // 입력값 관리 (state)
    // 이메일 입력값 
    const [email, setEmail] = useState("");
    // 비밀 번호 입력 값 
    const [password, setPassword] = useState ("");
    // 2차 비밀 번호 입력 값 
    const [confirmPassword, setConfirmPassword] = useState("");
    // 이름 입력 값 
    const [name, setName] = useState("");
    // 전화 번호 
    const [phone, setPhoen] = useState("");
    // 성별 
    const [gender, setGender] = useState("")
    // 우편 번호 입력 값  
    const [zipcode, setZipcode] = useState("");
    // 주소 입력 값 
    const [address, setAddress] = useState("");
    // 상세 주소 입력 창 
    const [detailAddress , setDetailAddress] = useState("");
    // 페이지 이동 함수 
    const navigate = useNavigate();

    // 약관 동의 
    const [agree, setAgree]=useState(false);

    // 회원 가입 필수 
    const join = async ()=>{
        // 약관 동의 
        if(!agree){
            alert("약관의 동의 해야 회원가입이 가능 합니다")
            return;
        }
        if(password !== confirmPassword){
            alert("비밀 번호 가 맞지 않습니다")
            return;

        }
        const response = await fetch("http://localhost:8080/api/member/join",{
            // http 요청 방식 (post: 데이터 생성)
            method: "POST",
            // 서버에 json 데이터라고 알려주는 해더 
            headers: {
                "Content-Type": "application/json",

            },
            // 입력값 json 형식으로 변환하여 서버로 잔송 
            body:JSON.stringify({
                email,
                password,
                name,
                phone,
                gender,
                zipcode,
                address,
                detailAddress,
            }),

        });
        // 서버 응답이 실패인 경우 
        if(!response.ok){
            alert("회원 가입 실패 ")
            return;
        }
        // 성공시 알 림
         alert("회원 가입 성공");
         // 회원 가입 성공후 로그인 페이지로 이동 
         navigate("/login");
    };
    return (
        <div>
            <h2>회원 가입 </h2>
          
            {/**이메일  */}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" /><br/><br/>
            {/**비밀 번호 */}
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="비밀 번호"/><br/><br/>
            {/**2차비밀 번호 */}
            <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="비밀 번호"/><br/><br/>
              {/**이름 입력 값  */}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" /> <br/><br/>
            {/**이름 입력 값  */}
            <input value={phone} onChange={(e)=> setPhoen(e.target.value)} placeholder="전화 번호를 입력을 하세요" /><br/><br/>
            {/**성별 */}
            <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                <option value="">전체</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
            </select><br/><br/>
            {/**우편 번호 */}
            <input value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="우편 번호" /><br/><br/>
            {/**기본 주소  */}
            <input value={address} onChange={(e)=> setAddress(e.target.value)} placeholder="기본 주소 " /><br/><br/>
            {/**상세 주소*/}
            <input value={detailAddress} onChange={(e=>setDetailAddress(e.target.value))} placeholder="상세 주소" /><br/><br/>
            {/**약관 동의*/}
            <label>
                <input type="checkbox" checked={agree} onChange={(e)=> setAgree(e.target.checked)}/>
            </label>
            {/**회원 가입 버튼*/}
            <button onClick={join}>회원 가입 </button>

        </div>
        
    )

}
// 다른 파일 에서 사용 할 수 있도로 export
export default Join;