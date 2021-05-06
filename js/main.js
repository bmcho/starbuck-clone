const bodyEl = document.querySelector('body');
const serachEl = document.querySelector('.search');
const searchInputEl = serachEl.querySelector('input');
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
const toTopEl = document.querySelector('#to-top');
let isHeidPromotion = false;
// 예제 프로젝트 코드
// 문제점 하나의UI의 동작을 위하여 3개의 EventListener가 쓰임
// 변경 할 수 있는 요소 : 1. 3개의 EventListener를 click으로 통합
//                      2. .search 외의 곳을 click시에는 focus가 해제되어야 하기 때문에 body에 click EventListener를 생성
//                      3. .search는 input과 material-icons의 부모이기때문에 targer의 부모요소가 serachEl인것을 찾는다
// EventListener의 과도한 사용을 막고 코딩
bodyEl.addEventListener('click', function(e){
    const target = e.target.parentElement;
    if(target === serachEl){
        searchInputEl.focus();
        serachEl.classList.add('focused');
        searchInputEl.setAttribute('placeholder', '통합검색');
    } else if(target === promotionToggleBtn) {        
        isHeidPromotion = !isHeidPromotion;
        if(isHeidPromotion) {
               //숨김
            promotionEl.classList.add('hide');
        } else {
                //보임
            promotionEl.classList.remove('hide');
        }
    } else if(target === toTopEl || e.target === toTopEl) {
        gsap.to(window, .7, {
            scrollTo: 0
        });
    }

    if(serachEl.classList.contains('focused')) {
        serachEl.classList.remove('focused'); 
        searchInputEl.setAttribute('placeholder', '');
    }
    
});

// serachEl.addEventListener('click', (e) => {
//     searchInputEl.focus();
// });

// searchInputEl.addEventListener('focus', () => {
//     serachEl.classList.add('focused');
//     searchInputEl.setAttribute('placeholder', '통합검색');
// });

// searchInputEl.addEventListener('blur', () => {
//     serachEl.classList.remove('focused');
//     searchInputEl.setAttribute('placeholder', '');
// });

const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(() =>{
    if(window.scrollY > 500){
        //배지 숨기기
        // badgeEl.style.display = 'none';
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });

        gsap.to(toTopEl, .2, {
            x: -130
        });
    } else {
        //배지 보이기
        // badgeEl.style.display = 'block';
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });

        gsap.to(toTopEl, .2, {
            x: 0
        });
    }
}, 300));

const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach((fadeEl, index) => {
    gsap.to(fadeEl, 1, {
        delay: (index + 1) *.7,
        opacity: 1
    })
});

new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination',
        clickable: true
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});


//이미 해당 상위객체인 Body에 Click 이벤트가 지정이 되어있다.
// const promotionEl = document.querySelector('.promotion');
// const promotionToggleBtn = document.querySelector('.toggle-promotion');
// let isHeidPromotion = false;
// promotionToggleBtn.addEventListener('click', () => {
//     isHeidPromotion = !isHeidPromotion;
//     if(isHeidPromotion) {
//         //숨김
//         promotionEl.classList.add('hide');
//     } else {
//         //보임
//         promotionEl.classList.remove('hide');
//     }
// });

function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selecotr, delay, size) {
    gsap.to(selecotr, random(1.5, 2.5), {
        y: size,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach((spyEl) => {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();