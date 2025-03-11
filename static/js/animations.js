document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 初始化 Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
        },
    });

    // Banner 輪播圖片
    const bannerImages = [
        {
            src: '/static/images/banner/banner1.jpg',
            alt: 'Banner 1'
        },
        {
            src: '/static/images/banner/banner2.jpg',
            alt: 'Banner 2'
        },
        {
            src: '/static/images/banner/banner3.jpg',
            alt: 'Banner 3'
        }
    ];

    // 精彩回顧輪播圖片
    const galleryImages = [
        {
            src: '/static/images/gallery/photo1.jpg',
            alt: '活動照片1'
        },
        {
            src: '/static/images/gallery/photo2.jpg',
            alt: '活動照片2'
        },
        {
            src: '/static/images/gallery/photo3.jpg',
            alt: '活動照片3'
        }
    ];

    // 初始化 Banner 輪播
    function initBannerSlider() {
        const swiperWrapper = document.querySelector('.hero-slider .swiper-wrapper');
        swiperWrapper.innerHTML = '';
        
        bannerImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            swiperWrapper.appendChild(slide);
        });

        const heroSlider = new Swiper('.hero-slider', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }

    // 初始化精彩回顧輪播
    function initGallerySlider() {
        const swiperWrapper = document.querySelector('.gallery .swiper-wrapper');
        swiperWrapper.innerHTML = '';
        
        galleryImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            swiperWrapper.appendChild(slide);
        });

        const gallerySwiper = new Swiper('.gallerySwiper', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
            loop: true,
            loopFillGroupWithBlank: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // 手機版
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20
                },
                // 平板版
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 25
                },
                // 電腦版
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // 在頁面加載完成後初始化所有輪播
    initBannerSlider();
    initGallerySlider();

    // 视差滚动效果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.hero-grid').style.transform = 
            `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.5}px)`;
    });

    // Glitch效果
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch-effect');
            setTimeout(() => {
                glitchText.classList.remove('glitch-effect');
            }, 200);
        }, 3000);
    }

    const wrapper = document.querySelector('.gallery-wrapper');
    const images = document.querySelectorAll('.gallery-image');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');

    let currentPosition = 0;
    const imageWidth = 470; // 圖片寬度 + gap
    const totalImages = images.length;

    function slide(direction) {
        if (direction === 'next') {
            currentPosition--;
            if (Math.abs(currentPosition) >= totalImages) {
                currentPosition = 0;
            }
        } else {
            currentPosition++;
            if (currentPosition > 0) {
                currentPosition = -(totalImages - 1);
            }
        }
        wrapper.style.transform = `translateX(${currentPosition * imageWidth}px)`;
    }

    // 按鈕事件
    nextButton.addEventListener('click', () => slide('next'));
    prevButton.addEventListener('click', () => slide('prev'));

    // 自動輪播
    let autoplay = setInterval(() => slide('next'), 4000);

    // 滑鼠懸停暫停
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
    wrapper.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => slide('next'), 4000);
    });

    // 漢堡選單控制
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 點擊導航項目時關閉選單
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // 點擊頁面其他地方時關閉選單
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// 添加图片到轮播
function addGalleryImages() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        
        // 添加更多图片
    ];

    images.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="/static/images/${image}" alt="Gallery Image">`;
        swiperWrapper.appendChild(slide);
    });
} 