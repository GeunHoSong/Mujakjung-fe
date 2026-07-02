import axios from "axios";
import { useState , useEffect} from "react";



function MyPageTravel(){
    const [travelList, setTravelList] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=> {
        const fetchTravelData = async ()=> {
            try{
                const response = await axios.get("/api/travel/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                setTravelList(response.data);
            }catch(error){
                console.error("여행 일정 로드 실패" , error);
            }finally {
                setLoading(false);
            }
        }
        fetchTravelData();
    },[])
    if(loading) return <div>여행 일지 불러 오는 중</div>
    return (
        <div>
            <h2>나의 여행 일지</h2>
            {travelList.length === 0 ? (
                <p>아직 작성한 여행 일지가 없어요.</p>
            ) : (
                <ul>
                    {travelList.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyPageTravel;