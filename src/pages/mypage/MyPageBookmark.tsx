import React, {useState, useEffect} from "react";
import api from "../../axiosConfig";

interface BookmarkItem {
    id: number;
    placeName: string;
    category: string;
    address: string;
}

function MyPageBookmark(){
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 백엔드(Spring Boot)에서 찜한 목록을 가져오는 API 호출
        api.get('/api/bookmarks')
            .then(res => {
                setBookmarks(res.data);
            })
            .catch(err => {
                console.error("찜한 목록을 불러오지 못했습니다:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if(isLoading) return <div>찜한 여행 목록 불러오는 중...</div>;

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h2>내가 찜한 여행 & 맛집</h2>
            <hr style={{border: "0", borderTop:"1px solid #eee", marginBottom: "20px"}} />
            {bookmarks.length === 0 ? (
                <p>아직 찜한 장소가 없어요. 마음에 드는 여행지를 찜해봐요!</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {bookmarks.map((item)=> (
                        <li key={item.id} style={{ padding: "15px", border: "1px solid #cbd5e1", borderRadius: "8px", marginBottom: "10px" }}>
                            <h3 style={{margin:"0 0 5px 0"}}>{item.placeName}</h3>
                            <p style={{ margin: "2px 0", color: "#64748b" }}>카테고리: {item.category}</p>
                            <p style={{ margin: "2px 0", color: "#64748b" }}>주소: {item.address}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyPageBookmark;