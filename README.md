# 紹民 ❤ 薇珊 婚禮邀請函

## 🎉 網站特色

✨ **十年週年紀念主題** - 強調交往 10 年的美好時光
💕 **浪漫粉色系設計** - 溫馨甜蜜的視覺風格
🎬 **精緻動畫效果** - Loading、信封開啟、滾動觸發
📱 **完美響應式** - 手機、平板、電腦完美適配
🏛️ **雙場地設計** - 台北與高雄兩場婚禮資訊
🖼️ **十年回憶輪播** - 展示每一年的美好回憶
📊 **LINE Bot 整合** - 直接連結到拍拍印表單系統

## 📂 檔案結構

```
wedding-invitation/
├── index.html               # 主要 HTML 結構
├── styles.css              # 浪漫粉色系樣式
├── script.js               # 互動邏輯（含輪播功能）
├── couple-illustration.svg # 新人似顏繪
├── hero-photo.jpg         # Hero 區背景照片
└── README.md              # 說明文件
```

## 🚀 快速開始

### 本地預覽
1. 將所有檔案放在同一個資料夾
2. 直接用瀏覽器開啟 `index.html`

### 部署到 GitHub Pages

```bash
# 1. 初始化 Git
git init

# 2. 加入所有檔案
git add .

# 3. 提交
git commit -m "Wedding invitation website"

# 4. 連結到 GitHub（請先在 GitHub 建立 repository）
git remote add origin https://github.com/你的帳號/wedding-invitation.git

# 5. 推送
git branch -M main
git push -u origin main
```

**啟用 GitHub Pages：**
1. 進入 Repository Settings
2. 找到 "Pages" 選項
3. Source 選擇 "main" branch
4. 點選 "Save"
5. 等待幾分鐘後，網站會發布在：`https://你的帳號.github.io/wedding-invitation/`

## ✏️ 客製化指南

### 1. 更換照片

#### Hero 背景照片
替換 `hero-photo.jpg` 為你們的婚紗照

#### 十年對比照
在 HTML 第 83-94 行和 98-109 行，替換佔位符：
```html
<div class="comparison-image">
    <img src="your-photo-2015.jpg" alt="2015年的我們">
</div>
```

#### 十年回憶輪播
在 HTML 第 121-181 行，替換每一年的佔位符：
```html
<div class="carousel-slide">
    <div class="year-badge">第 1 年</div>
    <img src="year1.jpg" alt="第一年的回憶">
</div>
```

**建議照片尺寸：**
- Hero 照片：1920x1080 px（橫向）
- 對比照：1080x1440 px（直向 3:4）
- 輪播照片：1920x1080 px（橫向 16:9）

### 2. 修改時間軸故事

在 HTML 第 200-237 行，可以修改或增加故事內容：
```html
<div class="timeline-item">
    <div class="timeline-icon">💫</div>
    <div class="timeline-content">
        <h3>標題</h3>
        <p class="timeline-desc">描述文字</p>
        <p class="timeline-year">年份</p>
    </div>
</div>
```

### 3. 更新場地資訊

如果有地址或交通資訊變更，在 HTML 第 246-333 行修改：
```html
<div class="venue-detail">
    <span class="detail-icon">📍</span>
    <span>完整地址</span>
</div>
```

### 4. 加入 Google Maps

將地圖佔位符替換為 Google Maps 嵌入碼：
```html
<iframe 
    src="你的 Google Maps 嵌入網址"
    width="100%" 
    height="300" 
    style="border:0; border-radius: 10px;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

**取得 Google Maps 嵌入碼：**
1. 前往 Google Maps
2. 搜尋地點
3. 點選「分享」→「嵌入地圖」
4. 複製 iframe 程式碼

### 5. 修改配色

如果想調整粉色色調，在 `styles.css` 的第 10-16 行修改：
```css
:root {
    --primary-pink: #ffb3d9;      /* 主要粉色 */
    --secondary-pink: #ff9999;    /* 次要粉色 */
    --light-pink: #ffe4e1;        /* 淡粉色 */
    --deep-pink: #ff6b9d;         /* 深粉色 */
    --gold: #d4a574;              /* 金色點綴 */
}
```

**其他配色建議：**
- 典雅金：`#d4a574`, `#c9a96e`, `#f0e6d2`
- 清新藍：`#4a90e2`, `#7bb3ff`, `#e3f2fd`
- 優雅紫：`#9b59b6`, `#c39bd3`, `#f4ecf7`

### 6. 加入背景音樂

在 `index.html` 的 `</body>` 前加入：
```html
<audio id="bgMusic" loop>
    <source src="your-music.mp3" type="audio/mp3">
</audio>

<button id="music-toggle" class="music-toggle-btn">
    🎵
</button>
```

在 `script.js` 最後加入：
```javascript
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

musicToggle.addEventListener('click', function() {
    if (isPlaying) {
        bgMusic.pause();
        this.textContent = '🎵';
    } else {
        bgMusic.play();
        this.textContent = '🔇';
    }
    isPlaying = !isPlaying;
});
```

## 📱 LINE Bot 設定

網站已整合拍拍印的 LINE Bot 連結：

**台北場：**
- URL: https://line.me/ti/p/%40463wjrgc
- QRCode: https://storage.googleapis.com/linein/2510_nearzcny/qrcode.png

**高雄場：**
- URL: https://line.me/ti/p/%40732tkjth
- QRCode: https://storage.googleapis.com/linein/2510_slejpkye/qrcode.png

賓客點選按鈕或掃描 QRCode 即可加入 LINE Bot 填寫出席表單。

## 🎨 進階客製化

### 修改信封顏色
在 `styles.css` 第 94-129 行可調整信封樣式

### 調整動畫速度
搜尋 `transition` 和 `animation` 屬性，修改秒數

### 新增區塊
複製現有 section 的 HTML 結構，並在 CSS 中加入對應樣式

### 輪播自動播放
在 `script.js` 第 73 行取消註解：
```javascript
let autoPlayInterval = setInterval(nextSlide, 5000);
```

## 🔧 常見問題

**Q: 照片如何壓縮？**
A: 建議使用 TinyPNG (tinypng.com) 或 Squoosh (squoosh.app)

**Q: 如何加入更多輪播照片？**
A: 在 HTML 中複製 `<div class="carousel-slide">` 區塊，JavaScript 會自動處理

**Q: 網站載入很慢？**
A: 確保圖片已壓縮，建議單張不超過 500KB

**Q: 手機顯示跑版？**
A: 清除瀏覽器快取，確保使用最新版 CSS

**Q: 能否加入倒數計時器？**
A: 可以，在 Hero 區加入 JavaScript 倒數邏輯

## 📊 網站流程

```
Loading 畫面（似顏繪 + 進度條）
    ↓
信封開啟互動
    ↓
Hero 區（滿版照片 + 雙日期）
    ↓
十年對比照（2015 vs 2025）
    ↓
十年回憶輪播（10張照片）
    ↓
我們的故事（時間軸）
    ↓
雙場地資訊（台北 + 高雄）
    ↓
Footer
```

## 🌐 瀏覽器相容性

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ iOS Safari 14+
✅ Chrome Mobile

## 📝 待辦事項

後續可以加入的功能：
- [ ] 替換對比照片
- [ ] 上傳十年輪播照片
- [ ] 加入 Google Maps 地圖
- [ ] 設定背景音樂
- [ ] 補充交通資訊細節
- [ ] 測試 LINE Bot 連結
- [ ] 分享到社群媒體

## 💌 聯絡資訊

如有任何問題或需要協助，歡迎隨時詢問！

---

**祝福紹民 & 薇珊**
**十年有成，攜手一生** 💕

*本網站使用純 HTML/CSS/JavaScript 建立，無需後端伺服器*
