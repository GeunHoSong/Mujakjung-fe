import { useState , useEffect} from "react";
import "./Agent.css";
interface ChatRoom {
    roomId: number;
    status: string;
    agentEmail: string | null;
}


function Agent(){
    // 상담사 대기 목록 저장
    const [rooms, setRooms] = useState<ChatRoom[]>([]);

    useEffect(()=> {
        const fetchWaitingRooms = async ()=> {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch("http://localhost:8080/api/agent/rooms/waiting",{
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })
                if(!response.ok){
                    throw new Error("상담 대기 목록 조회 실패");
                }
                const data : ChatRoom[] = await response.json();

                setRooms(data);
            }catch(error){
                console.error("상담 목록 조회 오류", error);
            }
        }
        fetchWaitingRooms();
    }, []);
    const handleAcceptRoom = async(roomId: number ) => {
        try{
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:8080/api/agent/rooms/${roomId}/accept`,  {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if(!response.ok){
            throw new Error("상담 수락을 실패 했습니다");
        }
        setRooms((prevRooms)=> prevRooms.filter((room)=> room.roomId !== roomId));
        alert("상담이 수락이 되었습니다");
        }catch (error){
            console.error("상담 수락 오류", error);
            alert("상담 수락에 실패 했습니다");
        }

    }
    return (
        <div className="agent-container">
            <h2>무작정 1:1 상담사 관리</h2>
            <h3>상담대기 목록</h3>

            {rooms.length === 0 ? (
                <p>대기 중인 상담이 없습니다.</p>
            ) : (
                rooms.map((room) => (
                    <div className="agent-room" key={room.roomId}>
                        <p>상담 번호: {room.roomId}</p>
                        <p>상태: {room.status}</p>
                        <button onClick={() => {console.log("상담 수락 버튼 클릭:", room.roomId);handleAcceptRoom(room.roomId);}}>상담 수락</button>
                    </div>
                ))
            )}
        </div>
    )

}
export default Agent;