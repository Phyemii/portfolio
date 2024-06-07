// 목록 클론
jQuery(".dataWrap > ul > li.contBx").clone().appendTo(".contWrap > ul");

// popWrap 숨기기
jQuery(document).ready(function() {
    jQuery("#popWrap").hide();
});

// 목록 개수 표시
var cnt = jQuery(".contWrap .contBx").length;
jQuery(".total p .cnt").text(cnt);

// 카테고리별 모아보기
jQuery(".cateWrap li").on("click", function() {
    // dataWrap li.contBx에 off 삭제
    jQuery(".dataWrap > ul > li.contBx").removeClass("off");
    // contWrap ul 안에 모든 li 삭제
    jQuery(".contWrap > ul > li").detach();
    // cateWrap > li에 active 삭제
    jQuery(".cateWrap li").removeClass("active");
    // 클릭한 cateWrap li에 active 클래스 추가
    jQuery(this).addClass("active");

    // 클릭한 cateWrap li의 텍스트를 popWrap에 추가
    var cateName = jQuery(this).text();
    jQuery("#popWrap .cateName").text(cateName);

    var cateIndex = jQuery(this).index();
    console.log(cateIndex);
    var cateClass = ".cate" + cateIndex;

    // 만약 .cateWrap li의 인덱스가 0 보다 크다면
    if (cateIndex > 0) {
        // 클래스가 없는 .contBx에 off 클래스 추가
        jQuery(".dataWrap > ul > li.contBx").not(cateClass).addClass("off");
        // 클래스가 .contBx에 off가 없는 li를 .contWrap > ul에 추가
        jQuery(".dataWrap > ul > li.contBx").not(".off").clone().appendTo(".contWrap > ul");
    } else if (cateIndex == 0) {
        jQuery(".dataWrap > ul > li.contBx").removeClass("off");
        jQuery(".dataWrap > ul > li.contBx").clone().appendTo(".contWrap > ul");
    }

    cnt = jQuery(".contWrap .contBx").length;
    jQuery(".total p .cnt").text(cnt);
});

// 전역변수로 초기화
var scrollHeight = 0;

// 숨기기
jQuery("#popWrap .pop_close").on("click", function() {
    jQuery("body").removeClass('layer-open');
    jQuery(".i-wrap").css({
        "position": "relative",
        "top": "0"
    });
    jQuery("body").scrollTop(scrollHeight);
    jQuery("#mask").hide();
    jQuery("#popWrap").hide();
    jQuery("#popWrap .popCont > ul > li").remove();
    jQuery(".swiper-notification").remove();
    jQuery("#popWrap").css("opacity", "0");
});

function listClick(index) {
    // 해당 li의 인덱스값을 알고
    var listIndex = jQuery(index).index();
    console.log(listIndex);
    // contWrap에 있는 li를 복사해서 #popWrap안으로 넣어
    jQuery(".dataWrap > ul > li.contBx").not(".off").clone().appendTo("#popWrap .popCont > ul");
    jQuery("#popWrap .popCont > ul > li").removeAttr("onclick");

    // 스와이퍼 설정
    var popWrap = new Swiper("#popWrap .swiper-container", {
        slidesPerView: "auto",
        speed: 1000,
        navigation: {
            nextEl: "#popWrap .pop_next",
            prevEl: "#popWrap .pop_prev",
        },
        pagination: {
            el: "#popWrap .pop_pg",
            type: "fraction",
        },
        observer: true,
        observeParents: true,
    });

    // 클릭한 인덱스부터 시작
    popWrap.slideTo(listIndex);

    // 열렸을 때 scrollTop 체크
    scrollHeight = jQuery("body").scrollTop();
    jQuery("body").addClass('layer-open');
    jQuery(".i-wrap").css({
        "position": "fixed",
        "top": -scrollHeight
    });

    jQuery("#mask").show();
    jQuery("#popWrap").css("opacity", "1");
    jQuery("#popWrap").show();

    jQuery('#popWrap .slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        arrows: true,
        dots: false,
        autoplay: false,
        vertical: false,
        prevArrow: "<button type='button' class='slick-prev'>Previous</button>",
        nextArrow: "<button type='button' class='slick-next'>Next</button>",
        draggable: false,
    });
}