import { useState } from 'react'
import { GraduationCap, Bell, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [studentId, setStudentId] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Function to fetch student grades
  const fetchStudentGrades = async () => {
    if (!studentId.trim()) {
      setError('الرجاء إدخال رقم الطالب')
      return
    }

    setLoading(true)
    setError('')
    setStudentData(null)

    try {
      const response = await fetch(`/api/student/${studentId}`)
      const data = await response.json()

      if (response.ok) {
        setStudentData(data)
      } else {
        setError(data.error || 'لم يتم العثور على الطالب')
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }

  // Home page with three main icons
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            بوابة الطلاب
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            مرحباً بكم في البوابة الإلكترونية للطلاب وأولياء الأمور
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Grades Card */}
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800"
            onClick={() => setCurrentPage('grades')}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <GraduationCap className="w-16 h-16 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                درجات الطلاب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300">
                استعلام عن درجات الطالب باستخدام رقم الهوية
              </CardDescription>
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800"
            onClick={() => setCurrentPage('announcements')}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-6 bg-green-100 dark:bg-green-900 rounded-full">
                  <Bell className="w-16 h-16 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                الإعلانات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300">
                آخر الأخبار والتنبيهات المهمة
              </CardDescription>
            </CardContent>
          </Card>

          {/* Important Files Card */}
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800"
            onClick={() => setCurrentPage('files')}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <FileText className="w-16 h-16 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                ملفات مهمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300">
                البحوث والمستندات الضرورية
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Grades page
  const GradesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => {
            setCurrentPage('home')
            setStudentId('')
            setStudentData(null)
            setError('')
          }}
          variant="outline"
          className="mb-6"
        >
          ← العودة للرئيسية
        </Button>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800 dark:text-white">
              استعلام عن درجات الطالب
            </CardTitle>
            <CardDescription className="text-center text-lg">
              أدخل رقم الطالب للحصول على الدرجات
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-lg">رقم الطالب</Label>
              <div className="flex gap-2">
                <Input
                  id="studentId"
                  type="text"
                  placeholder="أدخل رقم الطالب"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchStudentGrades()}
                  className="text-lg"
                  dir="ltr"
                />
                <Button 
                  onClick={fetchStudentGrades}
                  disabled={loading}
                  className="px-8"
                >
                  {loading ? 'جاري البحث...' : 'بحث'}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {studentData && (
              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {studentData.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    رقم الطالب: {studentData.id}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(studentData.grades).map(([subject, grade]) => (
                    <div key={subject} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-300 mb-1">{subject}</p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white">{grade}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Announcements page
  const AnnouncementsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setCurrentPage('home')}
          variant="outline"
          className="mb-6"
        >
          ← العودة للرئيسية
        </Button>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800 dark:text-white">
              الإعلانات والتنبيهات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start">
                <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-300 ml-3 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    تنبيه مهم
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    يرجى من جميع الطلاب مراجعة الملفات المهمة الخاصة بالبحث والتأكد من اتباع التعليمات المرفقة.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    تاريخ النشر: 8 أكتوبر 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-300 ml-3 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    إعلان عام
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    تم تحديث درجات الطلاب للفترة الحالية. يمكن لأولياء الأمور الاستعلام عن الدرجات من خلال صفحة درجات الطلاب.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    تاريخ النشر: 5 أكتوبر 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 p-4 rounded">
              <div className="flex items-start">
                <Bell className="w-6 h-6 text-green-600 dark:text-green-300 ml-3 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    معلومة مهمة
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    نذكركم بأهمية المتابعة المستمرة لأداء الطلاب والتواصل مع المعلمين في حال وجود أي استفسارات.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    تاريخ النشر: 1 أكتوبر 2025
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Important Files page
  const FilesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setCurrentPage('home')}
          variant="outline"
          className="mb-6"
        >
          ← العودة للرئيسية
        </Button>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800 dark:text-white">
              الملفات المهمة
            </CardTitle>
            <CardDescription className="text-center text-lg">
              البحوث والمستندات الضرورية للطلاب
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-300 ml-3 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    دليل إعداد البحث
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    دليل شامل يوضح خطوات إعداد البحث العلمي وطريقة التوثيق الصحيحة.
                  </p>
                  <Button variant="outline" size="sm">
                    تحميل الملف
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-300 ml-3 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    نموذج البحث
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    نموذج جاهز يمكن استخدامه كقالب لإعداد البحث المطلوب.
                  </p>
                  <Button variant="outline" size="sm">
                    تحميل الملف
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-300 ml-3 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    معايير التقييم
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    وثيقة توضح معايير تقييم البحث والدرجات المخصصة لكل معيار.
                  </p>
                  <Button variant="outline" size="sm">
                    تحميل الملف
                  </Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-300 ml-3 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    مصادر مفيدة
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    قائمة بالمصادر والمراجع المفيدة التي يمكن الاستعانة بها في البحث.
                  </p>
                  <Button variant="outline" size="sm">
                    تحميل الملف
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'grades' && <GradesPage />}
      {currentPage === 'announcements' && <AnnouncementsPage />}
      {currentPage === 'files' && <FilesPage />}
    </>
  )
}

export default App
