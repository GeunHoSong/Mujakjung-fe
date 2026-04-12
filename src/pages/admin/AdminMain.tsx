import React, { useState } from "react";

// 1. 스타일 정의 (TypeScript 에러 방지를 위해 'as const' 사용)
const styles = {
  container: { 
    padding: '40px', 
    maxWidth: '800px', 
    margin: '0 auto', 
    textAlign: 'left' as const // TS에게 왼쪽 정렬 키워드임을 명시
  },
  header: { color: '#333' },
  formGroup: { 
    display: 'flex', 
    flexDirection: 'column' as const, // 컬럼 방향 레이아웃
    marginTop: '20px' 
  },
  label: { 
    fontWeight: 'bold' as const, 
    marginBottom: '8px', 
    marginTop: '15px' 
  },
  select: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
  textarea: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '150px' },
  button: { 
    marginTop: '25px', 
    padding: '15px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '18px', 
    cursor: 'pointer', 
    fontWeight: 'bold' as const 
  }
};

function AdminMain() {
  // 2. 상태 관리 (State)
  const [category, setCategory] = useState("domestic"); // 국내/해외 구분
  const [title, setTitle] = useState("");              // 여행지 이름
  const [location, setLocation] = useState("");        // 주소 또는 좌표
  const [content, setContent] = useState("");          // 상세 페이지 본문
  const [imageFile, setImageFile] = useState<File | null>(null); // 실제 파일 객체
  const [previewUrl, setPreviewUrl] = useState<string>("");      // 미리보기용 주소

  // 3. 사진 파일 선택 시 실행되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // 브라우저 메모리에 임시 미리보기 URL 생성
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 4. 등록 버튼 클릭 시 실행 (백엔드 전송 준비)
  const handleRegister = () => {
    // 실제 서버 전송 시에는 FormData를 사용해야 사진이 넘어감
    const travelData = {
      category,
      title,
      location,
      content,
      imageName: imageFile ? imageFile.name : "없음",
      regDate: new Date().toLocaleDateString() // 오늘 날짜 기록
    };

    console.log("백엔드로 쏠 데이터 확인:", travelData);
    alert(`${title} 등록이 완료되었습니다! (160번째 커밋 가즈아!)`);

    // 등록 후 입력창 초기화
    setTitle("");
    setLocation("");
    setContent("");
    setImageFile(null);
    setPreviewUrl("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🛠 무작정 프로젝트 - 관리자 모드</h2>
      <p>새로운 여행 코스를 등록하고 상세 페이지를 구성해보세요.</p>
      <hr />

      <div style={styles.formGroup}>
        {/* 여행지 분류 드롭다운 */}
        <label style={styles.label}>여행지 분류</label>
        <select 
          style={styles.select} 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="domestic">국내 여행지 (Domestic)</option>
          <option value="overseas">해외 여행지 (Overseas)</option>
        </select>

        {/* 여행지 이름 입력 */}
        <label style={styles.label}>📝 여행지 이름</label>
        <input 
          type="text" 
          style={styles.input} 
          placeholder="예: 제주도 서귀포 숲길" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 위치 정보 입력 */}
        <label style={styles.label}>🗺️ 위치 (주소 또는 좌표)</label>
        <input 
          type="text" 
          style={styles.input} 
          placeholder="주소를 입력하세요" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* 상세 내용 입력 */}
        <label style={styles.label}>📄 상세 페이지 내용</label>
        <textarea 
          style={styles.textarea} 
          placeholder="상세 페이지에 들어갈 내용을 적어주세요." 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 사진 업로드 구역 */}
        <label style={styles.label}>📸 대표 이미지 업로드</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={styles.input} 
        />
        
        {/* 미리보기가 있을 때만 이미지 표시 */}
        {previewUrl && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img 
              src={previewUrl} 
              alt="미리보기" 
              style={{ width: '100%', maxWidth: '300px', borderRadius: '10px', border: '1px solid #ddd' }} 
            />
          </div>
        )}

        {/* 등록 버튼 */}
        <button style={styles.button} onClick={handleRegister}>
          새 여행지 등록하기
        </button>
      </div>
    </div>
  );
}

export default AdminMain;