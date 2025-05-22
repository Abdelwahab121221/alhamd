import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Auth from "@/app/components/Auth";
import Nav from "@/app/components/Nav";

export default function SheikhPanel() {
    const [data, setData] = useState();
    useEffect(() => {
        const checkLoginGetData = async () => {
            let res = await Auth("api/type/", "POST");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data.data.type !== "teacher") {
                window.location.href = "/";
                return;
            }
            setData(data);
        };
        checkLoginGetData();
    });
    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>لوحة المشايخ - معهد الحمد</title>
                <meta
                    name='description'
                    content='لوحة إدارة طلاب حفظ القرآن الكريم'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {/* Top Navigation */}
            <Nav data={data} />
            {/* Main Content */}
            <div className='flex flex-1 bg-emerald-50'>
                {/* Sidebar */}
                <aside className='bg-white w-64 p-4 shadow-lg'>
                    <nav className='space-y-4'>
                        <Link
                            href='/sheikh'
                            className='flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg'
                        >
                            <svg
                                className='w-6 h-6 text-emerald-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                />
                            </svg>
                            <span>الرئيسية</span>
                        </Link>

                        <Link
                            href='/sheikh/students'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg'
                        >
                            <svg
                                className='w-6 h-6 text-emerald-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                />
                            </svg>
                            <span>إدارة الطلاب</span>
                        </Link>

                        <Link
                            href='/sheikh/schedule'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg'
                        >
                            <svg
                                className='w-6 h-6 text-emerald-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                />
                            </svg>
                            <span>الجداول</span>
                        </Link>

                        <Link
                            href='/sheikh/reports'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg'
                        >
                            <svg
                                className='w-6 h-6 text-emerald-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                />
                            </svg>
                            <span>التقارير</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className='flex-1 p-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Students List */}
                        <div className='bg-white p-6 rounded-xl shadow-lg'>
                            <div className='flex justify-between items-center mb-6'>
                                <h3 className='text-xl font-bold text-emerald-800'>
                                    قائمة الطلاب
                                </h3>
                                <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700'>
                                    إضافة طالب جديد
                                </button>
                            </div>

                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='bg-emerald-50'>
                                            <th className='p-3 text-right'>
                                                الاسم
                                            </th>
                                            <th className='p-3 text-right'>
                                                المستوى
                                            </th>
                                            <th className='p-3 text-right'>
                                                التقدم
                                            </th>
                                            <th className='p-3 text-right'>
                                                آخر نشاط
                                            </th>
                                            <th className='p-3 text-right'>
                                                الإجراءات
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Student 1 */}
                                        <tr className='border-t hover:bg-gray-50'>
                                            <td className='p-3'>علي أحمد</td>
                                            <td className='p-3'>الجزء ٢١</td>
                                            <td className='p-3'>
                                                <div className='w-full bg-gray-200 rounded-full h-2'>
                                                    <div className='bg-emerald-600 h-2 rounded-full w-3/4'></div>
                                                </div>
                                            </td>
                                            <td className='p-3'>منذ ساعتين</td>
                                            <td className='p-3'>
                                                <button className='text-emerald-600 hover:text-emerald-800 mx-2'>
                                                    تعديل
                                                </button>
                                                <button className='text-red-600 hover:text-red-800 mx-2'>
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Student 2 */}
                                        <tr className='border-t hover:bg-gray-50'>
                                            <td className='p-3'>
                                                فاطمة عبدالله
                                            </td>
                                            <td className='p-3'>الجزء ١٥</td>
                                            <td className='p-3'>
                                                <div className='w-full bg-gray-200 rounded-full h-2'>
                                                    <div className='bg-emerald-600 h-2 rounded-full w-1/2'></div>
                                                </div>
                                            </td>
                                            <td className='p-3'>منذ 5 أيام</td>
                                            <td className='p-3'>
                                                <button className='text-emerald-600 hover:text-emerald-800 mx-2'>
                                                    تعديل
                                                </button>
                                                <button className='text-red-600 hover:text-red-800 mx-2'>
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Statistics & Quick Actions */}
                        <div className='space-y-6'>
                            {/* Statistics Cards */}
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='bg-white p-6 rounded-xl shadow-lg'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-gray-600'>
                                                إجمالي الطلاب
                                            </p>
                                            <p className='text-3xl font-bold text-emerald-800'>
                                                ٤٨
                                            </p>
                                        </div>
                                        <div className='bg-emerald-100 p-3 rounded-lg'>
                                            <svg
                                                className='w-8 h-8 text-emerald-600'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white p-6 rounded-xl shadow-lg'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-gray-600'>
                                                الحضور اليومي
                                            </p>
                                            <p className='text-3xl font-bold text-emerald-800'>
                                                ٨٥٪
                                            </p>
                                        </div>
                                        <div className='bg-emerald-100 p-3 rounded-lg'>
                                            <svg
                                                className='w-8 h-8 text-emerald-600'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Evaluations */}
                            <div className='bg-white p-6 rounded-xl shadow-lg'>
                                <h3 className='text-xl font-bold text-emerald-800 mb-4'>
                                    آخر التقييمات
                                </h3>
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg'>
                                        <div>
                                            <p className='font-medium'>
                                                علي أحمد
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                تقييم سورة مريم
                                            </p>
                                        </div>
                                        <span className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full'>
                                            ٩٠٪
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg'>
                                        <div>
                                            <p className='font-medium'>
                                                محمد حسن
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                مراجعة الجزء ٣٠
                                            </p>
                                        </div>
                                        <span className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full'>
                                            ٧٨٪
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Schedule */}
                            <div className='bg-white p-6 rounded-xl shadow-lg'>
                                <h3 className='text-xl font-bold text-emerald-800 mb-4'>
                                    الجلسات القادمة
                                </h3>
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg'>
                                        <div>
                                            <p className='font-medium'>
                                                مجموعة الحفظ المتقدم
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                غدًا ٩:٠٠ ص
                                            </p>
                                        </div>
                                        <button className='text-emerald-600 hover:text-emerald-800'>
                                            التفاصيل
                                        </button>
                                    </div>
                                    <div className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg'>
                                        <div>
                                            <p className='font-medium'>
                                                جلسة فردية - فاطمة
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                بعد غد ٣:٠٠ م
                                            </p>
                                        </div>
                                        <button className='text-emerald-600 hover:text-emerald-800'>
                                            التفاصيل
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className='bg-emerald-800 text-white py-4 mt-8'>
                <div className='container mx-auto text-center text-sm'>
                    <p>© 2023 معهد الحمد - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    );
}
