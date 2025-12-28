// 網站流程控制
document.addEventListener('DOMContentLoaded', function() {
    // 取得所有畫面元素
    const loadingScreen = document.getElementById('loading-screen');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const envelope = document.getElementById('envelope');

    // ===== 真實圖片預載入 =====
    const imagesToPreload = [
        'src/couple-illustration.png',
        'src/10yAgo.jpg',
        'src/10yNow.jpg',
        'src/Date.jpg',
        'src/Hero.jpg',
        'src/Married.jpg',
        'src/Meet.jpg',
        'src/Proposal.jpg',
        'src/R2016.jpg',
        'src/R2017.jpg',
        'src/R2018.jpg',
        'src/R2019.jpg',
        'src/R2020.jpg',
        'src/R2021.jpg',
        'src/R2022.jpg',
        'src/R2023.jpg',
        'src/R2024.jpg',
        'src/R2025.jpg',
        'src/Rnow.jpg'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;
    const startTime = Date.now();
    const minLoadingTime = 2000; // Loading 畫面至少顯示 2 秒

    function updateProgress() {
        const progress = Math.floor((loadedCount / totalImages) * 100);
        progressBar.style.width = progress + '%';
        progressPercent.textContent = progress + '%';

        if (loadedCount === totalImages) {
            // 計算已經過的時間
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

            // 確保 Loading 畫面至少顯示 2 秒
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    envelopeScreen.classList.remove('hidden');
                }, 500);
            }, remainingTime);
        }
    }

    // 預載入所有圖片
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            updateProgress();
        };
        img.onerror = () => {
            loadedCount++;
            updateProgress();
        };
        img.src = src;
    });

    // ===== 信封點擊事件 =====
    envelope.addEventListener('click', function() {
        envelope.classList.add('opening');
        
        // 等待信封動畫完成後顯示主內容
        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            setTimeout(() => {
                envelopeScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                
                // 啟動滾動觸發動畫
                initScrollAnimations();
            }, 500);
        }, 1500);
    });

    // ===== 輪播功能 (改為水平滾動) =====
    // 輪播現在使用原生水平滾動，無需 JavaScript 控制

    // ===== 平滑滾動到下一個區塊 =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const comparisonSection = document.querySelector('.comparison-section');
            comparisonSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ===== 跳轉到婚禮資訊 =====
    const skipToInfoBtn = document.getElementById('skipToInfo');
    if (skipToInfoBtn) {
        skipToInfoBtn.addEventListener('click', function() {
            const venuesSection = document.querySelector('.venues-section');
            venuesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ===== 滾動觸發動畫 =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 為各個區塊添加觀察
        const sections = document.querySelectorAll('.comparison-section, .gallery-section, .story-section, .venues-section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // 對比照片動畫
        const comparisonItems = document.querySelectorAll('.comparison-item');
        comparisonItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            
            const itemObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }
                });
            }, observerOptions);
            
            itemObserver.observe(item);
        });

        // 時間軸項目動畫
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.3}s, transform 0.8s ease ${index * 0.3}s`;
            
            const timelineObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, observerOptions);
            
            timelineObserver.observe(item);
        });

        // 場地卡片動畫
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            
            const cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            cardObserver.observe(card);
        });
    }

    // ===== 視差滾動效果 =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // 防止在載入和信封畫面時滾動
    document.body.style.overflow = 'hidden';

    // ===== Image Comparison Slider =====
    const imageComparison = document.getElementById('imageComparison');
    const comparisonHandle = document.getElementById('comparisonHandle');
    const afterImage = imageComparison?.querySelector('.image-comparison-after');

    if (imageComparison && comparisonHandle && afterImage) {
        let isDragging = false;

        function updateSlider(x) {
            const rect = imageComparison.getBoundingClientRect();
            const offsetX = x - rect.left;
            const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            comparisonHandle.style.left = percentage + '%';
            afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        }

        function startDragging(e) {
            isDragging = true;
            imageComparison.style.cursor = 'ew-resize';
        }

        function stopDragging() {
            isDragging = false;
            imageComparison.style.cursor = 'ew-resize';
        }

        function handleMove(e) {
            if (!isDragging) return;

            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            updateSlider(x);
        }

        // 滑鼠事件
        comparisonHandle.addEventListener('mousedown', startDragging);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', handleMove);

        // 觸控事件
        comparisonHandle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startDragging(e);
        });

        document.addEventListener('touchend', stopDragging);
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                handleMove(e);
            }
        });

        // 點擊圖片直接跳轉
        imageComparison.addEventListener('click', (e) => {
            if (e.target !== comparisonHandle && !comparisonHandle.contains(e.target)) {
                updateSlider(e.clientX);
            }
        });
    }
});

// ===== 預載入圖片 =====
function preloadImages(imageUrls) {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) return Promise.resolve();

    return new Promise((resolve) => {
        imageUrls.forEach(src => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    resolve();
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    resolve();
                }
            };
            img.src = src;
        });
    });
}

// 如果有實際照片，可以在這裡預載入
// preloadImages([
//     'path/to/image1.jpg',
//     'path/to/image2.jpg',
// ]);
