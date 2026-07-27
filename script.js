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
    // 只預載入 Loading/信封畫面本身用得到的小圖，其餘照片交給
    // 頁面上既有的 <img loading="lazy"> 依捲動位置自然載入，
    // 避免一次把整組相簿全部搶在最前面下載。
    const imagesToPreload = [
        'src/couple-illustration.png'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;
    const startTime = Date.now();
    const minLoadingTime = 2000; // Loading 畫面至少顯示 2 秒
    const hardTimeout = 8000; // 保底逾時：無論圖片是否載完，8 秒後強制隱藏 Loading 畫面
    let loadingFinished = false;

    function finishLoading() {
        if (loadingFinished) return;
        loadingFinished = true;

        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            envelopeScreen.classList.remove('hidden');
        }, 500);
    }

    function updateProgress() {
        const progress = Math.floor((loadedCount / totalImages) * 100);
        progressBar.style.width = progress + '%';
        progressPercent.textContent = progress + '%';

        if (loadedCount === totalImages) {
            // 計算已經過的時間
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

            // 確保 Loading 畫面至少顯示 2 秒
            setTimeout(finishLoading, remainingTime);
        }
    }

    // 保底逾時：就算圖片請求卡住（既不 load 也不 error），使用者也不會被鎖在 Loading 畫面
    setTimeout(finishLoading, hardTimeout);

    // 預載入 Loading 畫面用的圖片
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

        // 等待信封動畫完成後顯示主內容（延遲 3.2 秒）
        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            setTimeout(() => {
                envelopeScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                document.body.style.overflowY = 'auto';

                // 啟動滾動觸發動畫
                initScrollAnimations();

                // 1.5 秒後自動顯示 Hero 細節文字（不鎖定滾動）
                setTimeout(() => {
                    const heroDetails = document.querySelector('.hero-details');
                    if (heroDetails) {
                        heroDetails.classList.add('visible');
                    }
                }, 1500);
            }, 500);
        }, 3200);
    });

    // ===== 輪播功能 (水平滾動 + 左右按鈕控制) =====
    const carouselContainer = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carouselContainer && prevBtn && nextBtn) {
        const slideWidth = 450 + 30; // 卡片寬度 + gap
        const minScroll = slideWidth; // 最小滾動位置（2017卡片）
        let isScrolling = false;

        // 初始滾動到第二張卡片（2017），避免顯示 2016
        carouselContainer.scrollLeft = minScroll;

        prevBtn.addEventListener('click', () => {
            const targetScroll = Math.max(minScroll, carouselContainer.scrollLeft - slideWidth);
            carouselContainer.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: slideWidth,
                behavior: 'smooth'
            });
        });

        // 防止向左滾動超過 2017（第二張卡片）- 包括手動拖曳
        let scrollTimeout;
        carouselContainer.addEventListener('scroll', () => {
            if (isScrolling) return;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (carouselContainer.scrollLeft < minScroll) {
                    isScrolling = true;
                    carouselContainer.scrollTo({
                        left: minScroll,
                        behavior: 'smooth'
                    });
                    setTimeout(() => {
                        isScrolling = false;
                    }, 300);
                }
            }, 50);
        });
    }

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

    // ===== 視差滾動效果已移除 - Hero 背景不隨滾動移動 =====

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

// ===== 電子喜帖浮動視窗功能 =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('invitationModal');
    const invitationBtns = document.querySelectorAll('.view-invitation-btn');
    const closeBtn = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    const invitationImage = document.getElementById('invitationImage');
    const venueImages = {
        taipei: 'src/invitation-taipei.jpg',
        kaohsiung: 'src/invitation-kaohsiung.jpg'
    };

    // 打開浮動視窗
    function openModal(venue) {
        invitationImage.src = venueImages[venue] || venueImages.taipei;
        invitationImage.alt = venue === 'kaohsiung' ? '高雄場電子喜帖' : '台北場電子喜帖';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    // 關閉浮動視窗
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflowY = 'auto'; // 恢復滾動
    }

    // 為所有按鈕添加點擊事件
    invitationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const venue = this.getAttribute('data-venue');
            openModal(venue);
        });
    });

    // 關閉按鈕點擊事件
    closeBtn.addEventListener('click', closeModal);

    // 點擊遮罩層關閉
    modalOverlay.addEventListener('click', closeModal);

    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
