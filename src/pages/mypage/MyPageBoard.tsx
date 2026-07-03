import { useState, useEffect } from "react"; // 'use' 제거 완료

interface BoardItem {
    id: number;
    title: string;
    author: string;
    createdAt: string;
}

function MyPageBoard(){
    const [boardList, setBoardList] = useState<BoardItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        console.log("게시판 불러 오는 중")
        setLoading(false);
    },[])

    if(loading)  return <div>게시판 불러 오는 중</div>
    
    return (
        <div>
            <h2>나의 게시글</h2>
            {boardList.length === 0 ? (
                <p>작성한 게시글 없습니다 </p>
            ):(
                <ul>
                    {boardList.map((item)=>(
                        <li key={item.id}>
                            [{item.createdAt}] {item.title} - {item.author}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MyPageBoard;