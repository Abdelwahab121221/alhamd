"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Auth from "@/app/components/Auth";
const TablesPage = () => {
    const [loading, setLoading] = useState(true);
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await Auth("/api/tables/", "GET");
                if (!response.ok) throw new Error("فشل تحميل الجداول");
                const data = await response.json();
                setTables(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, []);

    const formatArabicDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy", { locale: ar });
    };

    if (error) return <div className='text-center py-8'>{error}</div>;

    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>جداول الحفظ - معهد الحمد</title>
                <meta
                    name='description'
                    content='جداول حفظ القرآن الكريم اليومية'
                />
            </Head>

            <main className='flex-1 p-6 lg:p-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <h1 className='text-2xl font-bold text-emerald-800'>
                            جداول الحفظ اليومية
                        </h1>
                        <Link
                            href='/tables/new'
                            className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700'
                        >
                            إنشاء جدول جديد
                        </Link>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {tables.map((table) => (
                            <Link
                                key={table.id}
                                href={`/tables/${table.id}`}
                                className='group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow'
                            >
                                <div className='p-6'>
                                    <div className='aspect-square bg-emerald-50 rounded-lg flex items-center justify-center'>
                                        <div className='text-center'>
                                            <span className='text-4xl font-bold text-emerald-600'>
                                                {table.gozia}
                                            </span>
                                            <p className='text-gray-600 mt-2'>
                                                الجزء اليومي
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-4 text-center'>
                                        <p className='text-lg font-medium text-gray-800'>
                                            {table.name}
                                        </p>
                                        <p className='text-sm text-emerald-600 mt-2'>
                                            {formatArabicDate(table.day)}
                                        </p>
                                    </div>
                                </div>
                                <div className='absolute top-2 left-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm'>
                                    {table.students_count} طالب
                                </div>
                            </Link>
                        ))}
                    </div>

                    {tables.length === 0 && (
                        <div className='text-center py-12 text-gray-600'>
                            لا توجد جداول متاحة حالياً
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TablesPage;
