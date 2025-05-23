"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "@/app/components/Nav";
import Auth from "@/app/components/Auth";
import SideBar from "@/app/components/Side";

export default function StudentsPage() {
    const [data, setData] = useState();
    const [teacher, setTeacher] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [khatmaStats, setKhatmaStats] = useState({
        total_khatma: 0,
        students_with_khatma: 0,
        top_students: [],
    });
    const studentsPerPage = 10;
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
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const paginatedStudents = students.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );
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
        const getKhatmaStats = async () => {
            let res = await Auth("api/khatma-stats/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            setKhatmaStats(data);
        };
        const getStudents = async () => {
            let res = await Auth("api/students/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data) {
                setStudents(data);
            }
        };
        getKhatmaStats();
        getStudents();
        checkLoginGetData();
        getTeacherData();
    }, []);

    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>إدارة الطلاب - معهد الحمد</title>
                <meta
                    name='description'
                    content='إدارة طلاب حفظ القرآن الكريم'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Nav data={data} />
            {/* Main Content */}
            <div className='flex flex-1 flex-col lg:flex-row bg-emerald-50'>
                {/* Sidebar */}
                <SideBar active={2} />
                {/* Main Content */}
                <main className='flex-1 p-4 sm:p-6 lg:p-8'>
                    {/* Header */}
                    <div className='mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <h1 className='text-2xl font-bold text-emerald-800'>
                            إدارة الطلاب
                        </h1>
                        <div className='w-full sm:w-auto flex flex-col-reverse sm:flex-row gap-4'>
                            <input
                                onChange={handleSearch}
                                value={searchQuery}
                                type='text'
                                placeholder='ابحث عن طالب...'
                                className='px-4 py-2 border rounded-lg w-full sm:w-64'
                            />
                            <button
                                onClick={addStudent}
                                className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 whitespace-nowrap'
                            >
                                + إضافة طالب جديد
                            </button>
                            {error && (
                                <div className='text-red-600 text-center mb-2'>
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Students Table */}
                    <div className='bg-white rounded-xl shadow-lg overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead className='bg-emerald-50'>
                                <tr>
                                    <th className='p-4 text-right min-w-[150px]'>
                                        الاسم
                                    </th>
                                    <th className='p-4 min-w-[100px]'>
                                        المستوى
                                    </th>
                                    <th className='p-4 min-w-[150px]'>
                                        التقدم
                                    </th>
                                    <th className='p-4 min-w-[100px]'>
                                        الحالة
                                    </th>
                                    <th className='p-4 min-w-[120px]'>
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Student Row */}
                                {paginatedStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className='border-t hover:bg-gray-50'
                                    >
                                        <td className='p-4'>
                                            <div className='flex items-center'>
                                                <div className='w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center ml-3'>
                                                    <span className='text-emerald-800'>
                                                        {student.name[0]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className='font-medium'>
                                                        {student.name}
                                                    </p>
                                                    <p className='text-xs text-gray-500'>
                                                        العمر: {student.age} سنة
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-4'>
                                            <span className='bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs'>
                                                {student.level || "غير محدد"}
                                            </span>
                                        </td>
                                        <td className='p-4'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-24 bg-gray-200 rounded-full h-2'>
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
                                                <span className='text-xs text-gray-600'>
                                                    {Math.round(
                                                        (student.gozia / 30) *
                                                            100
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                        </td>
                                        <td className='p-4'>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    student.status === "نشط"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {student.status || "غير محدد"}
                                            </span>
                                        </td>
                                        <td className='p-4'>
                                            <div className='flex gap-2'>
                                                <button className='text-emerald-600 hover:text-emerald-800'>
                                                    <svg
                                                        className='w-4 h-4'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                                        />
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                                        />
                                                    </svg>
                                                </button>
                                                <button className='text-emerald-600 hover:text-emerald-800'>
                                                    <svg
                                                        className='w-4 h-4'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                                        />
                                                    </svg>
                                                </button>
                                                <button className='text-red-600 hover:text-red-800'>
                                                    <svg
                                                        className='w-4 h-4'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className='flex flex-col sm:flex-row justify-between items-center p-4 border-t gap-4'>
                            <span className='text-gray-600 text-xs sm:text-sm'>
                                عرض {(currentPage - 1) * studentsPerPage + 1}-
                                {Math.min(
                                    currentPage * studentsPerPage,
                                    students.length
                                )}{" "}
                                من {students.length} طالب
                            </span>
                            <div className='flex gap-2'>
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            students.length / studentsPerPage
                                        ),
                                    },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handlePageChange(index + 1)
                                            }
                                            className={`px-2 py-1 rounded-lg text-xs sm:text-sm ${
                                                currentPage === index + 1
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                        {" "}
                        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-lg'>
                            <h3 className='text-lg sm:text-xl font-bold text-emerald-800 mb-4'>
                                أفضل الأداء
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
                                                        {student.khatma_count}{" "}
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
                </main>
            </div>
        </div>
    );
}
