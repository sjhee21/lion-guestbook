
const BASE_URL = "http://43.200.240.8/api/guestbooks";

// [GET] 방명록 전체 조회
async function fetchGetPosts() {
    try {
        // 백엔드 요청: GET /api/guestbooks
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) throw new Error("네트워크 응답에 문제가 있습니다.");
        return await response.json(); 
    } catch (error) {
        console.error("방명록 조회 실패:", error);
        alert("서버에서 방명록을 불러오지 못했습니다.");
        return null;
    }
}

// [POST] 방명록 생성
async function fetchCreatePost(postData) {
    try {
        // 백엔드 요청: POST /api/guestbooks/
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData) // 명세서 Body: { title, writer, content, password }
        });
        return response.ok; 
    } catch (error) {
        console.error("방명록 생성 실패:", error);
        return false;
    }
}

// [DELETE] 방명록 삭제
async function fetchDeletePost(guestbookId, password) {
    try {
        
        const response = await fetch(`${BASE_URL}/${guestbookId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: password }) // 명세서 Body: { password }
        });
        return response.ok; 
    } catch (error) {
        console.error("방명록 삭제 실패:", error);
        return false;
    }
}