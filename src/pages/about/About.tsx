import { Link } from "react-router-dom";
import "./About.css";
function About(){
    return (
        <main className="about-container">
            {/*무작정 서비스 소개*/}
            <section className="about-hero">
                <h1>무작정 | MUJAKJUNG</h1>
                <h2>지친 일상에서, 나만의 여행으로</h2>

                <p>
                    무작정은 일상에 지친 사람들이
                    자신의 감정과 취향에 맞는 여행을 
                    발견할 수 있도록 돕는 
                    AI 기반 여행 추천 서비스 입니다 
                </p>
            </section>
            <section className="about-section">
                <h2>왜 무작정을 만들 었을까?</h2>
                <p>
                    반복되는 일상 속에서 누구나 
                    휴식이 필요한 순간이 있습니다
                </p>
                <p>
                    무작정은 여행 계획은 부담을 줄이고,
                    지친 사람들의 자신에게 맞는 여행을 
                    발견할 수 있도록 돕기 위해 시작되었습니다
                </p>
            </section>
            <section className="about-section">
                <h2>무작정 주요 서비스</h2>
                <div className="about-features">
                    <article className="about-feature">
                        <h3>감정 기반 여행 추천</h3>
                        <p>현재 기분에 맞는 여행지를 추천을 합니다</p>
                    </article>
                    <article className="about-feature">
                        <h3>맞춤형 여행 추천</h3>
                        <p>예산과 이동 수단 고려 하여 추천 합니다</p>
                    </article>
                    <article className="about-feature">
                        <h3>여행 일정 추천</h3>
                        <p>AI 여행 일정 코스와 일정을 추천 합니다 </p>
                    </article>
                </div>
            </section>
            <section className="about-start">
                <h2>이제 나만의 여행을 시작해 보세요</h2>
                <p>
                    무작정과 함께 나에게 맞는 여행을 발견해 보세요.
                </p>
                <Link to="/" className="about-button">여행 추천 시작 하기</Link>
            </section>
        </main>
    )
}

export default About;