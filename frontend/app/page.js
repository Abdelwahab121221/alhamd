"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Auth from "@/app/components/Auth";
export default function Home() {
    useEffect(() => {
        let token = null;
        if (document.cookie) {
            const cookies = document.cookie.split("; ");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].split("=");
                if (cookie[0] === "access") {
                    token = cookie[1];
                    break;
                }
            }
        }
        if (token) {
            const get_type = async () => {
                let res = await Auth("api/type/", "POST");
                let data = await res.json();
                if (data.data.type === "assistant") {
                    window.location.href = "/dashboard/assistant";
                } else {
                    window.location.href = "/dashboard/teacher";
                }
            };
            get_type();
        }
    }, []);
    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>معهد الحمد - حفظ القرآن الكريم</title>
                <meta
                    name='description'
                    content='معهد الحمد - مركز تعليم القرآن الكريم والعلوم الشرعية'
                />
                <meta charset='utf-8' />
                <link rel='icon' href='/icon.png' />
            </Head>

            {/* شريط التنقل */}
            <nav className='bg-emerald-800 text-white p-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>معهد الحمد</h1>
                    <div className='space-x-6'>
                        <Link href='/' className='hover:text-emerald-200'>
                            الرئيسية
                        </Link>
                        <Link href='/about' className='hover:text-emerald-200'>
                            عن المعهد
                        </Link>
                        <Link href='/login' className='hover:text-emerald-200'>
                            تسجيل الدخول
                        </Link>
                        <Link
                            href='/contact'
                            className='hover:text-emerald-200'
                        >
                            تواصل
                        </Link>
                    </div>
                </div>
            </nav>

            {/* القسم الرئيسي */}
            <main className='flex-grow'>
                <div className='bg-emerald-50 py-20'>
                    <div className='container mx-auto text-center'>
                        <h2 className='text-4xl font-bold text-emerald-800 mb-6'>
                            مرحبا بكم في معهد الحمد لحفظ القرآن الكريم
                        </h2>
                        <p className='text-lg text-gray-700 mb-8'>
                            حفظ القرآن الكريم عبر برامج مخصصة لفهمه وتدبره
                        </p>
                        <Link
                            href='/registration'
                            className='bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors'
                        >
                            <button className='bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors'>
                                انضم الآن
                            </button>
                        </Link>
                    </div>
                </div>

                {/* قسم البرامج */}
                <section className='container mx-auto py-16'>
                    <h3 className='text-3xl font-bold text-center text-emerald-800 mb-12'>
                        برامجنا التعليمية
                    </h3>
                    <div className='grid md:grid-cols-3 gap-8'>
                        <div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                            <div className='text-emerald-600 mb-4'>
                                <svg
                                    className='w-12 h-12 mx-auto'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                                    />
                                </svg>
                            </div>
                            <h4 className='text-xl font-semibold text-center mb-4'>
                                حفظ القرآن
                            </h4>
                            <p className='text-gray-600 text-center'>
                                برنامج متكامل لحفظ القرآن مع معلمين ذوي خبرة
                                واهتمام فردي
                            </p>
                        </div>

                        <div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                            <div className='text-emerald-600 mb-4'>
                                <svg
                                    className='w-12 h-12 mx-auto'
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
                            </div>
                            <h4 className='text-xl font-semibold text-center mb-4'>
                                فصول يومية
                            </h4>
                            <p className='text-gray-600 text-center'>
                                دروس منتظمة في التجويد لجميع الفئات العمرية
                            </p>
                        </div>

                        <div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                            <div className='text-emerald-600 mb-4'>
                                <svg
                                    className='w-12 h-12 mx-auto'
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
                            <h4 className='text-xl font-semibold text-center mb-4'>
                                مجتمع داعم
                            </h4>
                            <p className='text-gray-600 text-center'>
                                بيئة محفزة للنمو الروحي وبناء الأخوة الإسلامية
                            </p>
                        </div>
                    </div>
                </section>

                {/* قسم الإعلانات */}
                <section className='bg-emerald-100 py-16'>
                    <div className='container mx-auto'>
                        <h3 className='text-3xl font-bold text-emerald-800 mb-8 text-center'>
                            آخر الإعلانات
                        </h3>
                        <div className='space-y-6'>
                            <div className='bg-white p-6 rounded-lg shadow-md'>
                                <h4 className='text-xl font-semibold text-emerald-800'>
                                    فصول مسائية جديدة
                                </h4>
                                <p className='text-gray-600 mt-2'>
                                    تبدأ الأسبوع القادم - سجل الآن!
                                </p>
                                <p className='text-sm text-gray-500 mt-2'>
                                    15 مارس 2023
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* تذييل الصفحة */}
            <footer className='bg-emerald-800 text-white py-6 mt-12'>
                <div className='container mx-auto text-center'>
                    <p>© 2023 معهد الحمد - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    );
}
