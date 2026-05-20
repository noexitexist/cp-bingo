const gongGrid = document.getElementById('gong-grid');
const suGrid = document.getElementById('su-grid');
const downloadBtn = document.getElementById('download-btn');

// 1. 공/수 3x4 바둑판 칸 만들기
function createGrid(gridElement) {
    for (let i = 0; i < 12; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.onchange = (e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    // 클릭한 칸에 선택한 사진을 배경으로 쏙 넣기 (CSS가 알아서 1:1 한가운데 크롭해 줌)
                    cell.style.backgroundImage = `url(${event.target.result})`;
                    cell.classList.add('has-img');
                };
                reader.readAsDataURL(file);
            };
            fileInput.click();
        });
        gridElement.appendChild(cell);
    }
}

createGrid(gongGrid);
createGrid(suGrid);

// 2. 템플릿 파일 없이, 화면을 그대로 사진으로 찍어서 저장하기
downloadBtn.addEventListener('click', () => {
    const captureArea = document.getElementById('capture-area');

    // 화면 캡처 라이브러리 실행
    html2canvas(captureArea, {
        useCORS: true,          // 이미지 보안 우회
        allowTaint: true,
        backgroundColor: '#f5f5f5', // 결과물 배경색 지정
        scale: 2                // 저장할 때 선명하게 2배 정밀도로 캡처
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'gong_su_maker.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        alert('이미지 저장 중 오류가 발생했습니다. 시크릿 탭에서 다시 시도해 주세요!');
        console.error(err);
    });
});
