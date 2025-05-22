import Head from 'next/head';
import Link from 'next/link';

export default function StudentsPage() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Head>
        <title>إدارة الطلاب - معهد الحمد</title>
        <meta name="description" content="إدارة طلاب حفظ القرآن الكريم" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <div className="flex flex-1 bg-emerald-50">
        {/* Sidebar */}
        <aside className="bg-white lg:w-64 p-4 shadow-lg">
          <nav className="space-y-4">
            <Link
              href="/dashboard/assistant"
              className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="hidden lg:inline">لوحة التحكم</span>
            </Link>

            <Link
              href="/dashboard/assistant/students"
              className="hover:bg-green-100 flex items-center space-x-2 p-2 transition-all rounded-lg"
            >
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="hidden lg:inline">إدارة الطلاب</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h1 className="text-2xl font-bold text-emerald-800">إدارة الطلاب</h1>
            <div className="w-full lg:w-auto flex flex-col-reverse lg:flex-row gap-4">
              <input
                type="text"
                placeholder="ابحث عن طالب..."
                className="px-4 py-2 border rounded-lg w-full lg:w-64"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 whitespace-nowrap">
                + إضافة طالب جديد
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="p-4 text-right min-w-[200px]">الاسم</th>
                  <th className="p-4 min-w-[120px]">المستوى</th>
                  <th className="p-4 min-w-[180px]">التقدم</th>
                  <th className="p-4 min-w-[120px]">الحالة</th>
                  <th className="p-4 min-w-[150px]">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {/* Student Row */}
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center ml-3">
                        <span className="text-emerald-800">م</span>
                      </div>
                      <div>
                        <p className="font-medium">محمد أحمد</p>
                        <p className="text-sm text-gray-500">العمر: 12 سنة</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      متقدم
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      نشط
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Add more student rows */}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col lg:flex-row justify-between items-center p-4 border-t gap-4">
              <span className="text-gray-600">عرض 1-10 من 85 طالب</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">3</button>
                <span className="px-3 py-1">...</span>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">9</button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">توزيع المستويات</h3>
              <div className="h-48 flex items-center justify-center text-gray-400">
                (مخطط دائري هنا)
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">أفضل الأداء</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-800">ن</span>
                    </div>
                    <span>نورة محمد</span>
                  </div>
                  <span className="text-emerald-600">92%</span>
                </div>
                {/* Add more top performers */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}