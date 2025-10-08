# بوابة الطلاب - Student Portal

موقع إلكتروني تفاعلي لعرض درجات الطلاب والإعلانات والملفات المهمة.

## المميزات

- **درجات الطلاب**: البحث عن درجات الطلاب باستخدام رقم الطالب
- **الإعلانات**: عرض الإعلانات والتنبيهات المهمة
- **ملفات مهمة**: روابط للملفات والمستندات الضرورية
- **ربط مع Google Sheets**: قراءة البيانات مباشرة من Google Sheets

## التقنيات المستخدمة

### Frontend (الواجهة الأمامية)
- React 18
- Tailwind CSS
- shadcn/ui Components
- Lucide Icons
- Vite

### Backend (الخادم الخلفي)
- Flask (Python)
- Google Sheets API
- gspread
- Flask-CORS

## البنية الأساسية

```
student_portal/
├── app.py                    # خادم Flask الرئيسي
├── credentials.json          # مفتاح خدمة Google Sheets
├── requirements.txt          # مكتبات Python المطلوبة
├── Procfile                  # ملف تكوين للنشر
├── student-portal-app/       # تطبيق React
│   ├── src/
│   │   ├── App.jsx          # المكون الرئيسي
│   │   └── ...
│   └── dist/                # ملفات البناء (Production)
└── README.md                # هذا الملف
```

## التثبيت والتشغيل محلياً

### المتطلبات
- Python 3.11+
- Node.js 18+
- npm أو pnpm

### خطوات التثبيت

1. **تثبيت مكتبات Python:**
```bash
pip install -r requirements.txt
```

2. **بناء تطبيق React:**
```bash
cd student-portal-app
npm install
npm run build
cd ..
```

3. **تشغيل الخادم:**
```bash
python3 app.py
```

4. **فتح المتصفح:**
افتح `http://localhost:8080` في المتصفح

## النشر على منصات مجانية

### 1. النشر على Render.com (موصى به)

#### الخطوات:
1. سجل حساب على [Render.com](https://render.com)
2. اربط حسابك بـ GitHub
3. ارفع المشروع إلى GitHub repository
4. في Render، اختر "New Web Service"
5. اختر repository الخاص بك
6. استخدم الإعدادات التالية:
   - **Build Command**: `cd student-portal-app && npm install && npm run build && cd .. && pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment**: Python 3
7. أضف متغير البيئة `PORT` (سيتم تعيينه تلقائياً)
8. انقر على "Create Web Service"

### 2. النشر على Railway.app

#### الخطوات:
1. سجل حساب على [Railway.app](https://railway.app)
2. انقر على "New Project" → "Deploy from GitHub repo"
3. اختر repository الخاص بك
4. Railway سيكتشف تلقائياً أنه مشروع Flask
5. تأكد من أن ملف `Procfile` موجود
6. انقر على "Deploy"

### 3. النشر على PythonAnywhere

#### الخطوات:
1. سجل حساب مجاني على [PythonAnywhere](https://www.pythonanywhere.com)
2. ارفع الملفات عبر "Files" tab
3. في "Web" tab، أنشئ web app جديد
4. اختر Flask وPython 3.11
5. عدّل ملف WSGI configuration ليشير إلى `app.py`
6. أعد تحميل التطبيق

## إعداد Google Sheets API

### الخطوات:
1. انتقل إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. فعّل Google Sheets API
4. أنشئ Service Account
5. حمّل ملف JSON للمفتاح وضعه في `credentials.json`
6. شارك Google Sheet مع البريد الإلكتروني للـ Service Account

## هيكل Google Sheets المطلوب

يجب أن يحتوي ملف Google Sheets على الأعمدة التالية:

| رقم الطالب | اسم الطالب | الحضور | الواجبات | المشاركة | السلوك | التلاوة | الاختبار القصير | الحفظ | اختبار نهاية الفترة |
|------------|------------|--------|---------|----------|--------|--------|----------------|------|-------------------|
| 1234567890 | أحمد محمد  | 5      | 10      | 5        | 5      | 20     | 10             | 20   | 25                |

## الأمان

- **لا تشارك ملف `credentials.json` علناً**
- أضف `credentials.json` إلى `.gitignore`
- استخدم متغيرات البيئة للمعلومات الحساسة في الإنتاج

## الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الشخصي والتعليمي.

## الدعم

للمساعدة والاستفسارات، يرجى فتح issue في GitHub repository.
