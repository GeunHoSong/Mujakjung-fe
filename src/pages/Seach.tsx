// react-router-dom 에서 url query 값을 가져오는 쪽 
import { useSearchParams } from "react-router-dom";

function Seach (){
// url의 query parameter 가져 오기
// 예: /search?keyword=${재주}&type=domstic
const [params] = useSearchParams();

// 검색어 가져오기 
// url /keyword 값 추출 
const keyword = params.get("keyword");
// 여행 타입 가지고 오기 
const type = params.get("type");
return (
    <div>
        {/** 패이지 재목 */}
        <h1>추천 여행 결과</h1>
        {/** 검색 조건 확인 */}
        <p>검색어: {keyword}</p>
        <p>여행 타입: {type}</p>
    </div>
);
}
export default Seach;