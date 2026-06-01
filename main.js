document.addEventListener("DOMContentLoaded", async function () { 
    const homeInput = document.getElementById("home-input");
    const readInput = document.getElementById("read-input");
    const writeInput = document.getElementById("write-input");

    // HOME 

    if (homeInput) {
        homeInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const value = homeInput.value.trim();

                if (value === "1") {
                    window.location.href = "read.html";
                } else if (value === "2") {
                    window.location.href = "write.html";
                } else {
                    alert("올바른 메뉴 번호(1 또는 2)를 입력해주세요!");
                    homeInput.value = "";
                }
            }
        });
        document.addEventListener("click", () => homeInput.focus());
    }


    // READ

    if (readInput) {
        const guestbookList = document.getElementById("guestbook-list");

        async function loadGuestbook() {
            const result = await fetchGetPosts(); 
            
            
            if (result && result.guestbooks && result.guestbooks.length > 0) {
                guestbookList.innerHTML = ""; 
                
                result.guestbooks.forEach((post) => {
                    const row = document.createElement("tr");
                    
                    // "2026-05-26T20:46:00Z" 형식을 "2026-05-26" 형태로 이쁘게 자르기
                    const formattedDate = post.created_at ? post.created_at.split('T')[0] : '2026-06-01';
                    
                    
                    row.innerHTML = `
                        <td>${String(post.guestbook_id).padStart(3, '0')}</td>
                        <td>${post.title}</td>
                        <td>${post.writer}</td>
                        <td>${post.content}</td>
                        <td>${formattedDate}</td>
                    `;
                    guestbookList.appendChild(row);
                });
            } else {
                // 글이 하나도 없을 때 에러 방지 
                guestbookList.innerHTML = `<tr><td colspan="5" style="color: #FFFF00; font-size: 3rem; text-align: center;">등록된 방명록이 없습니다.</td></tr>`;
            }
        }
        
        loadGuestbook();

        readInput.addEventListener("keydown", async function (event) { 
            if (event.key === "Enter") {
                const value = readInput.value.trim().toUpperCase();

                if (value === "H") {
                    window.location.href = "home.html";
                } else if (value === "W") {
                    window.location.href = "write.html";
                } else if (value === "D") {
                    const deleteNum = prompt("삭제할 방명록 번호(guestbook_id)를 입력하세요:");
                    
                    if (deleteNum) {
                        const password = prompt(`[${deleteNum}]번 게시글의 비밀번호를 입력하세요:`);
                        
                        if (password) {
                            const success = await fetchDeletePost(deleteNum, password);
                            if (success) {
                                alert(`방명록이 삭제되었습니다.`);
                                loadGuestbook();
                            } else {
                                alert("삭제 실패: 비밀번호가 일치하지 않거나 존재하지 않는 게시글입니다.");
                            }
                        }
                    }
                    readInput.value = ""; 
                } else {
                    alert("H(홈), W(방명록 쓰기), D(게시글 삭제) 중 하나를 입력해주세요.");
                    readInput.value = "";
                }
            }
        });
        document.addEventListener("click", () => readInput.focus());
    }

    // WRITE

    if (writeInput) {
        writeInput.addEventListener("keydown", async function (event) { 
            if (event.key === "Enter") {
                const value = writeInput.value.trim().toUpperCase();

                if (value === "GO") {
                    const title = document.getElementById("title").value.trim();
                    const author = document.getElementById("author").value.trim(); // HTML의 id="author" 연동
                    const content = document.getElementById("content").value.trim();
                    const password = document.getElementById("password").value.trim();

                    if (!title || !author || !content || !password) {
                        alert("요구사항 오류: 제목, 작성자, 내용, 비밀번호를 모두 입력해야 전송할 수 있습니다!");
                        writeInput.value = "";
                        return;
                    }

                    // 💡 백엔드가 요구한 Request Body 규칙({"title", "writer", "content", "password"}) 데이터 변환
                    const postData = { 
                        title: title, 
                        writer: author, 
                        content: content, 
                        password: password 
                    };
                    
                    const success = await fetchCreatePost(postData);

                    if (success) {
                        alert("방명록이 작성되었습니다.");
                        window.location.href = "read.html";
                    } else {
                        alert("전송 실패: 서버 오류가 발생했습니다.");
                        writeInput.value = "";
                    }

                } else if (value === "H") {
                    window.location.href = "home.html";
                } else {
                    alert("GO (전송) 또는 H (취소)를 입력해주세요.");
                    writeInput.value = "";
                }
            }
        });

        document.addEventListener("click", function (e) {
            if (e.target.tagName !== "INPUT") {
                writeInput.focus();
            }
        });
    }
});