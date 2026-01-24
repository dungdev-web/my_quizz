# 🎯 Quiz Game

Ứng dụng trắc nghiệm tương tác được xây dựng với HTML, CSS, Tailwind CSS và JavaScript thuần túy, mang đến trải nghiệm học tập thú vị và nhẹ nhàng.

![Quiz Game Demo](https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Quiz+Game+Screenshot)

## ✨ Tính năng

- 🎮 Chơi quiz với nhiều chủ đề đa dạng
- ⏱️ Đếm ngược thời gian cho mỗi câu hỏi
- 📊 Thống kê kết quả chi tiết
- 🏆 Bảng xếp hạng người chơi (LocalStorage)
- 💯 Tính điểm tự động và hiển thị kết quả
- 📱 Responsive design với Tailwind CSS
- 🎨 Giao diện đẹp mắt với animations
- 💾 Lưu trữ dữ liệu với LocalStorage
- 🔄 Import câu hỏi từ JSON
- ⚡ Không cần backend, chạy trực tiếp trên trình duyệt
- 🌙 Dark/Light mode toggle

## 🚀 Demo

[Xem demo trực tiếp tại đây](https://your-demo-link.com)

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web
- **CSS3** - Custom styling và animations
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Logic xử lý game
- **LocalStorage API** - Lưu trữ dữ liệu
- **JSON** - Lưu trữ câu hỏi

## 📦 Cài đặt

### Yêu cầu

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần cài đặt Node.js hay server

### Các bước cài đặt

1. Clone repository về máy:
```bash
git clone https://github.com/username/quiz-game.git
cd quiz-game
```

2. Mở file `index.html` bằng trình duyệt:
```bash
# Trên macOS
open index.html

# Trên Linux
xdg-open index.html

# Trên Windows
start index.html

# Hoặc click đúp vào file index.html
```

3. Hoặc sử dụng Live Server (VS Code Extension) để chạy:
```bash
# Cài đặt Live Server extension trong VS Code
# Sau đó click chuột phải vào index.html và chọn "Open with Live Server"
```

## 📁 Cấu trúc thư mục

```
quiz-game/
│
├── index.html              # Trang chơi quiz
├── quiz.html               # Trang 
├── css/
│
├── js/
├── assets/
│
└── README.md              # File này
```

## 📝 Cấu trúc file questions.json

```json
{
  "categories": [
    {
      "id": 1,
      "name": "JavaScript",
      "questions": [
        {
          "id": 1,
          "question": "JavaScript là gì?",
          "options": [
            "Ngôn ngữ lập trình",
            "Framework",
            "Library",
            "Database"
          ],
          "correctAnswer": 0,
          "difficulty": "easy",
          "points": 10,
          "timeLimit": 30
        }
      ]
    },
    {
      "id": 2,
      "name": "HTML & CSS",
      "questions": [...]
    }
  ]
}
```

## 💻 Sử dụng

### Người chơi

1. **Trang chủ**: Nhập tên và chọn chủ đề quiz
2. **Chọn độ khó**: Easy, Medium, hoặc Hard
3. **Bắt đầu chơi**: Click "Start Quiz"
4. **Trả lời câu hỏi**: 
   - Chọn đáp án trong thời gian quy định
   - Timer sẽ đếm ngược cho mỗi câu
   - Không thể quay lại câu hỏi đã trả lời
5. **Xem kết quả**: 
   - Điểm số tổng cộng
   - Số câu đúng/sai
   - Đáp án đúng cho từng câu
6. **Bảng xếp hạng**: Xem và so sánh điểm với người chơi khác

### Thêm câu hỏi mới

Chỉnh sửa file `data/questions.json`:

```json
{
  "id": 2,
  "question": "Câu hỏi của bạn?",
  "options": [
    "Đáp án A",
    "Đáp án B", 
    "Đáp án C",
    "Đáp án D"
  ],
  "correctAnswer": 1,
  "difficulty": "medium",
  "points": 20,
  "timeLimit": 45
}
```

## 🎨 Tailwind CSS Classes chính

### Layout
```html
<!-- Container -->
<div class="container mx-auto px-4">

<!-- Card -->
<div class="bg-white rounded-lg shadow-lg p-6">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Buttons
```html
<!-- Primary Button -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">

<!-- Answer Option -->
<button class="w-full text-left p-4 rounded-lg border-2 hover:border-blue-500 transition">
```

### Colors & Themes
```html
<!-- Correct Answer -->
<div class="bg-green-100 border-green-500">

<!-- Wrong Answer -->
<div class="bg-red-100 border-red-500">

<!-- Dark Mode -->
<div class="bg-gray-900 text-white">
```

## ⚙️ Cấu hình

### Thay đổi thời gian
Trong `js/quiz.js`:
```javascript
const DEFAULT_TIME_LIMIT = 30; // seconds
const EASY_TIME = 45;
const MEDIUM_TIME = 30;
const HARD_TIME = 20;
```

### Thay đổi điểm số
Trong `data/questions.json`:
```json
{
  "difficulty": "easy",
  "points": 10  // Thay đổi điểm
}
```

### Bật/tắt âm thanh
Trong `js/app.js`:
```javascript
const SOUND_ENABLED = true; // true/false
```

## 🎯 Game Flow

```
┌─────────────┐
│  Home Page  │
│ (index.html)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Select Quiz  │
│& Difficulty │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Quiz Page  │
│ (quiz.html) │
│             │
│ Questions   │
│ Timer       │
│ Progress    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Results Page │
│(results.html)│
│             │
│ Score       │
│ Answers     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Leaderboard  │
│(leader..html)│
└─────────────┘
```

## 🌟 Tính năng nâng cao (Optional)

- ⚡ Animations với CSS/Tailwind
- 🎵 Âm thanh khi đúng/sai
- 🌙 Dark mode toggle
- 📧 Share kết quả qua social media
- 💾 Export/Import câu hỏi
- 🔔 Notifications
- 🏅 Achievement badges
- 📈 Biểu đồ tiến trình

## 🎨 Customization

### Đổi màu chủ đạo
Trong `tailwind.config.js` (nếu dùng):
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      }
    }
  }
}
```

### Thêm font chữ
Trong `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

## 🚀 Deployment

### GitHub Pages
1. Push code lên GitHub
2. Settings → Pages → Source: main branch
3. Đợi vài phút và truy cập: `https://username.github.io/quiz-game`

### Netlify
1. Kéo thả folder vào Netlify Drop
2. Hoặc connect với GitHub repo
3. Deploy tự động

### Vercel
```bash
npm i -g vercel
vercel
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón!

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/NewFeature`)
3. Commit thay đổi (`git commit -m 'Add NewFeature'`)
4. Push lên branch (`git push origin feature/NewFeature`)
5. Tạo Pull Request

## 🐛 Troubleshooting

**LocalStorage không hoạt động?**
- Kiểm tra browser có bật LocalStorage
- Chạy qua HTTP/HTTPS, không file://

**Tailwind classes không hoạt động?**
- Kiểm tra CDN link trong `<head>`
- Hoặc build Tailwind nếu dùng custom config

**JSON không load được?**
- Dùng Live Server hoặc HTTP server
- Không chạy trực tiếp file:// với Chrome

## 📝 License

Project này được phân phối dưới giấy phép MIT.

## 👤 Tác giả

**Your Name**

- GitHub: [@username](https://github.com/username)
- Email: your.email@example.com
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

## 🙏 Lời cảm ơn

- [Tailwind CSS](https://tailwindcss.com/)
- [Open Trivia Database](https://opentdb.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

## 📸 Screenshots

### Home Page
![Home](https://via.placeholder.com/800x400)

### Quiz Page
![Quiz](https://via.placeholder.com/800x400)

### Results Page
![Results](https://via.placeholder.com/800x400)

### Leaderboard
![Leaderboard](https://via.placeholder.com/800x400)

---

⭐ Nếu bạn thấy project thú vị, đừng quên cho một star nhé! ⭐

🎮 Happy Quizzing! 🎮
