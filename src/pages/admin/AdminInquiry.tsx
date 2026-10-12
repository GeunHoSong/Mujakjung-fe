import React from "react";
interface Inquiry {
    id: number;
    title: string;
    content: string;
    writer: string;
    regDate: string;
    status : string;
    answer? : string;
}

function AdminInquiry(){

    return (
        <div>
            <p>고객 센터 문의 화면 입니다</p>
        </div>
    )
}

export default AdminInquiry;