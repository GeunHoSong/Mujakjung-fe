// 리액트 에서 상태 state 을 사용 하기 위해 userstate  import 
import { useState } from "react";

function join(){
    // 입력값 관리 (state)
    // 이름 입력 값 
    const [name, setName] = useState("");
    // 이메일 입력값 
    const [email, setEmail] = useState("");
    // 비밀 번호 입력 값 
    const [password, setPassword] = useState ("");
    // 우편 번호 입력 값  
    const [zipcode, setZipCode] = useState("");
    // 주소 입력 값 
    const [address, setAddress] = useState("");
    // 상세 주소 입력 창 
    const [detailAddress , setDetailAddress] = useState("");

    // 회원 가입 필수 
    const join = async ()=>{
        const reponse = await fetch("http://localhost:8080/api/member/join",{
            // http 요청 방식 (post: 데이터 생성)
        })
    }
}