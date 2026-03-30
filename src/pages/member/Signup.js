import React, {useState} from "react";
import DaumPostcode from "react-daum-postcode";


const Sipnup= ()=> {
    // 기존 회원 가입 정보 (아이디, 비번)
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState ('');
    // 주소 관련 상태 (아까 만들 거 )
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    // 주소 선택 완료 핸들러 
    const handleComplete = (data) =>{
        setZipcode(data.zonecode);
        setAddress(data.address);
        setIsPostcodeOpen(data.isPostcodeOpen);
    };
    return (
        <div className="signup-container">
            h2``
        </div>
    )
}
export default Sipnup;