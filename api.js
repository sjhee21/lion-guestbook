
const BASE_URL = "http://백엔드가_알려줄_서버_ip_또는_도메인/post"; 

// 게시글 전체 조회
async function fetchGetPosts() {
    try {
        const response = await fetch(`${BASE_URL}/`);
        if (!response.ok) throw new Error("네트워크 응답에 문제가 있습니다.");
        return await response.json(); 
    } catch (error) {
        console.error("게시글 조회 실패:", error);
        alert("서버에서 게시글을 불러오지 못했습니다.");
        return [];
    }
}

//게시글 생성
async function fetchCreatePost(postData) {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData) // { title, author, content, password }
        });
        return response.ok; 
    } catch (error) {
        console.error("게시글 생성 실패:", error);
        return false;
    }
}

// 게시글 삭제 
async function fetchDeletePost(postId, password) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: password }) 
        });
        return response.ok; 
    } catch (error) {
        console.error("게시글 삭제 실패:", error);
        return false;
    }
}