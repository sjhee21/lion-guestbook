document.addEventListener("DOMContentLoaded", async function () { 
    const homeInput = document.getElementById("home-input");
    const readInput = document.getElementById("read-input");
    const writeInput = document.getElementById("write-input");


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

    if (readInput) {
        const guestbookList = document.getElementById("guestbook-list");

        async function loadGuestbook() {
            const posts = await fetchGetPosts(); 
            
            if (posts && posts.length > 0) {
                guestbookList.innerHTML = ""; 
                
                posts.forEach((post) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${post.id || post.postId || '000'}</td>
                        <td>${post.title}</td>
                        <td>${post.author}</td>
                        <td>${post.content}</td>
                        <td>${post.created_at || post.date || '2026.05.31'}</td>
                    `;
                    guestbookList.appendChild(row);
                });
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
                    const deleteNum = prompt("삭제할 게시글 번호를 입력하세요:");
                    
                    if (deleteNum) {
                        const password = prompt(`[${deleteNum}]번 게시글의 비밀번호를 입력하세요:`);
                        
                        if (password) {
                            const success = await fetchDeletePost(deleteNum, password);
                            if (success) {
                                alert(`[삭제 성공] 게시글이 정상적으로 삭제되었습니다.`);
                                loadGuestbook();
                            } else {
                                alert("삭제 실패: 비밀번호가 틀렸거나 존재하지 않는 게시글입니다.");
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

    if (writeInput) {
        writeInput.addEventListener("keydown", async function (event) { 
            if (event.key === "Enter") {
                const value = writeInput.value.trim().toUpperCase();

                if (value === "GO") {
                    const title = document.getElementById("title").value.trim();
                    const author = document.getElementById("author").value.trim();
                    const content = document.getElementById("content").value.trim();
                    const password = document.getElementById("password").value.trim();

                    if (!title || !author || !content || !password) {
                        alert("요구사항 오류: 제목, 작성자, 내용, 비밀번호를 모두 입력해야 전송할 수 있습니다!");
                        writeInput.value = "";
                        return;
                    }

                  
                    const postData = { title, author, content, password };
                    const success = await fetchCreatePost(postData);

                    if (success) {
                        alert("방명록 전송에 성공했습니다!");
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