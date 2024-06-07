document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('load').style.display = 'none';

    //페이지 로드 시 fade에 on클래스 추가
    document.querySelectorAll('.sec01 .fade, .sec02 .label, .sec02 .title').forEach(function(el) {
        el.classList.add('on');
    });

    const header = document.querySelector('header');
    const goTop = document.querySelector(".goTop");
    const headerHeight = header.offsetHeight;

    let lastScrollY = 0;

    window.onscroll = function(){
        /* header 영역 fixed */
        const windowTop = window.scrollY;
        //스크롤 세로값이 헤더높이보다 크거나 같으면
        //헤더에 클래스 'fixed'를 추가
        if(windowTop >= headerHeight + 100){
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }

        /* 하단 TOP버튼 노출 */
        //스크롤 방향에 따른 이벤트
        if(window.scrollY > lastScrollY){
            // 현재 스크롤 위치가 이전 위치보다 클때 (내려가는 중)
            goTop.classList.remove('show');
        }else {
            // 현재 스크롤 위치가 이전 위치보다 작을때 (올라가는 중)
            goTop.classList.add('show');
            if(windowTop === 0){goTop.classList.remove('show');}
        }
        
        lastScrollY = window.scrollY;



        /* 컨텐츠 fadeIn 효과 */
        const wraps = document.querySelectorAll('section.sec02 .fade, section.sec03 .fade, section.sec04 .fade');

        wraps.forEach(function(wrap) {
            const wrapTop = wrap.offsetTop;
            console.log(wrapTop);
            if (windowTop >= wrapTop - 500) {
                wrap.classList.add('on');
                console.log(windowTop, wrapTop)
            }
        });
    };

    function moveTop(){
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
        });
    }

    goTop.addEventListener("click", moveTop);


    // typeIt
    const instance = new TypeIt("#pauseResume", {
    strings:
        "안녕하세요, 저는 4년차 웹퍼블리셔 박혜민입니다.",
    waitUntilVisible: true,
    }).go();
});