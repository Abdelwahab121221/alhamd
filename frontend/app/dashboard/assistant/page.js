"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Auth from "@/app/components/Auth";
import SideBar from "@/app/components/Side";

export default function AssistantPanel() {
    const [data, setData] = useState();
    const [teacher, setTeacher] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [soras, setSoras] = useState([]);
    const [khatmaStats, setKhatmaStats] = useState({
        total_khatma: 0,
        students_with_khatma: 0,
        top_students: [],
    });
    const addStudent = async () => {
        const name = prompt("ادخل اسم الطالب:");
        if (!name) {
            alert("يرجى إدخال اسم الطالب.");
            return;
        }
        const sora = prompt("ادخل اسم السورة:");
        if (!sora) {
            alert("يرجى إدخال اسم السورة.");
            return;
        }
        const ageInput = prompt("ادخل عمر الطالب:");
        const age = parseInt(ageInput, 10);
        if (isNaN(age) || age < 3 || age > 100) {
            alert("يرجى إدخال عمر صحيح بين 3 و 100.");
            return;
        }
        const goziaInput = prompt("ادخل عدد الأجزاء المحفوظة (1-30):");
        const gozia = parseInt(goziaInput, 10);
        if (isNaN(gozia) || gozia < 1 || gozia > 30) {
            alert("يرجى إدخال عدد الأجزاء بشكل صحيح (بين 1 و 30).");
            return;
        }
        let res = await Auth("api/students/", "POST", {
            name: name,
            sora: sora,
            gozia: gozia,
            age: age,
            teacher: teacher.id,
        });
        if (res.status === 201) {
            let updated = await Auth("api/search/", "POST", {
                query: searchQuery,
            });
            let updatedData = await updated.json();
            setStudents(updatedData);
            alert("تمت إضافة الطالب بنجاح.");
        } else if (res.status === 401) {
            window.location.href = "/";
        } else {
            const data = await res.json();
            let errorMsg = "حدث خطأ أثناء إضافة الطالب.";
            alert(errorMsg);
            setError(
                Object.keys(data)
                    .map((key) => {
                        return `${key}: ${data[key].join(", ")}`;
                    })
                    .join("\n")
            );
        }
    };
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            let res = await Auth("api/search/", "POST", {
                query: query,
            });
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data) {
                setStudents(data);
            }
        }
    };
    useEffect(() => {
        const checkLoginGetData = async () => {
            let res = await Auth("api/type/", "POST");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data.data.type !== "assistant") {
                window.location.href = "/";
                return;
            }
            setData(data);
        };
        const getTeacherData = async () => {
            let res = await Auth("api/teacher/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            setTeacher(data);
        };
        const getSoras = async () => {
            let res = await Auth("api/soras/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            setSoras(data);
        };
        const getKhatmaStats = async () => {
            let res = await Auth("api/khatma-stats/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            setKhatmaStats(data);
        };

        getSoras();
        checkLoginGetData();
        getTeacherData();
        getKhatmaStats();
    }, []);
    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>لوحة المشرفين - معهد الحمد</title>
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
                <SideBar active={1} />
                {/* Main Content */}
                <main className='flex-1 p-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Students List */}
                        <div className='bg-white p-6 rounded-xl shadow-lg'>
                            <div className='flex flex-col items-center mb-6'>
                                <h3 className='text-xl font-bold text-emerald-800'>
                                    قائمة الطلاب
                                </h3>
                                <input
                                    type='text'
                                    placeholder='بحث عن طالب...'
                                    className='px-4 py-2 border rounded-lg w-64 mt-4'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                                <button
                                    onClick={addStudent}
                                    className='bg-emerald-600 mt-4 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-emerald-700'
                                >
                                    + إضافة طالب
                                </button>
                            </div>
                            {error && (
                                <div className='text-red-600 text-center mb-2'>
                                    {error}
                                </div>
                            )}
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='bg-emerald-50'>
                                            <th className='p-2 text-right'>
                                                الاسم
                                            </th>
                                            <th className='p-2'>التقدم</th>
                                            <th className='p-2'>السورة</th>
                                            <th className='p-2'>الحالة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students &&
                                            students.map((student) => {
                                                return (
                                                    <tr
                                                        key={student.id}
                                                        className='border-b'
                                                    >
                                                        <td className='p-3'>
                                                            {student.name}
                                                        </td>
                                                        <td className='p-3'>
                                                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                                                <div
                                                                    className='bg-emerald-600 h-2 rounded-full'
                                                                    style={{
                                                                        width: `${Math.round(
                                                                            (student.gozia /
                                                                                30) *
                                                                                100
                                                                        )}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span className='text-sm text-gray-600'>
                                                                {Math.round(
                                                                    (student.gozia /
                                                                        30) *
                                                                        100
                                                                )}
                                                                % مكتمل
                                                            </span>
                                                        </td>
                                                        <td className='p-3'>
                                                            {student.sora ||
                                                                "—"}
                                                        </td>
                                                        <td className='p-3'>
                                                            <button className='text-emerald-600 hover:text-emerald-800 mx-1'>
                                                                <svg
                                                                    className='w-5 h-5'
                                                                    fill='none'
                                                                    stroke='currentColor'
                                                                    viewBox='0 0 24 24'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                                                    />
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button className='text-emerald-600 hover:text-emerald-800 mx-1'>
                                                                <svg
                                                                    className='w-5 h-5'
                                                                    fill='none'
                                                                    stroke='currentColor'
                                                                    viewBox='0 0 24 24'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Progress Tracking */}
                        <div className='bg-white p-6 rounded-xl shadow-lg'>
                            <h3 className='text-xl font-bold text-emerald-800 mb-6'>
                                تتبع التقدم
                            </h3>
                            <div className='space-y-4'>
                                {soras.map((soraData) => (
                                    <div
                                        key={soraData.sora}
                                        className='flex items-center justify-between p-3 bg-emerald-50 rounded-lg'
                                    >
                                        <span>{soraData.sora}</span>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-sm text-gray-600'>
                                                {soraData.student_count} طالب
                                                أكملوها
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Quick Stats */}
                        <div className='bg-white p-6 rounded-xl shadow-lg'>
                            <h3 className='text-xl font-bold text-emerald-800 mb-6'>
                                إحصائيات سريعة
                            </h3>
                            <div className='grid grid-cols-1 gap-4'>
                                <div className='bg-emerald-50 p-4 rounded-lg text-center'>
                                    <div className='text-3xl font-bold text-emerald-800'>
                                        {khatmaStats.total_khatma}
                                    </div>
                                    <div className='text-gray-600'>
                                        إجمالي الختمات
                                    </div>
                                </div>
                                <div className='bg-emerald-50 p-4 rounded-lg text-center'>
                                    <div className='text-3xl font-bold text-emerald-800'>
                                        {khatmaStats.students_with_khatma}
                                    </div>
                                    <div className='text-gray-600'>
                                        الطلاب الذين أكملوا ختمة
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <div className='bg-white p-6 rounded-lg shadow-lg'>
                                <h3 className='text-xl font-bold text-emerald-800 mb-6'>
                                    الطلاب المتفوقين
                                </h3>
                                <div className='space-y-4'>
                                    {khatmaStats.top_students
                                        .slice(0, 4)
                                        .map((student) => (
                                            <div
                                                key={student.id}
                                                className='flex items-center justify-between p-4 bg-emerald-50 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                                            >
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center'>
                                                        <span className='text-emerald-800 font-bold text-lg'>
                                                            {student.name[0]}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className='font-medium text-emerald-800'>
                                                            {student.name}
                                                        </p>
                                                        <p className='text-sm text-gray-600'>
                                                            {
                                                                student.khatma_count
                                                            }{" "}
                                                            ختمة
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='text-emerald-600 font-bold text-lg'>
                                                    🏆
                                                </div>
                                            </div>
                                        ))}
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
