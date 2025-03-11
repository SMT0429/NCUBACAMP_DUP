document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded'); // 檢查腳本是否載入
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    console.log('Slides:', slides.length); // 檢查是否找到幻燈片
    console.log('Prev button:', prevBtn); // 檢查是否找到按鈕
    console.log('Next button:', nextBtn);
    
    let currentSlide = 0;
    
    function updateSlides() {
        console.log('Updating slides to index:', currentSlide); // 檢查切換功能
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        console.log('Next button clicked'); // 檢查按鈕點擊
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }
    
    function prevSlide() {
        console.log('Prev button clicked'); // 檢查按鈕點擊
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }
    
    // 創建導航點
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            console.log('Dot clicked:', index); // 檢查導航點點擊
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }
    
    // 事件監聽器
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 自動播放
    let interval = setInterval(nextSlide, 5000);
    
    // 滑鼠懸停時暫停
    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
    
    // 鍵盤控制
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}); 