import React, {useState}from "react";


function SupportPage(){
    
     // 1. FAQ 아코디언 상태 (열린 항목의 인덱스 번호 저장)
     const [openFaqIndex, setOpFanIndex] = useState<number | null>(null);

    // 1.1 문의 상담 폼 상태
    const [inqury , setInqury ] = useState({title: "", content:"", email: ""});

    

    return (
        <div>
            <p>고객 센터 입니다 </p>
        </div>
    )

}
export default SupportPage;