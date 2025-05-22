"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Auth from "@/app/components/Auth";
export default function Registration() {
    // State for form fields
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "male",
        type: "teacher",
        teacher: "",
    });
    const [teachers, setTeachers] = useState([]);
    // State for errors
    const [errors, setErrors] = useState({});
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined, server: undefined }));
    };
    // Validation logic
    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب";
        if (!form.lastName.trim()) newErrors.lastName = "اسم العائلة مطلوب";
        if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
            newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
        if (!form.password) newErrors.password = "كلمة المرور مطلوبة";
        else if (form.password.length < 6)
            newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        if (!form.gender) newErrors.gender = "الجنس مطلوب";
        if (!form.type) newErrors.type = "نوع الحساب مطلوب";
        if (form.type === "assistant" && !form.teacher)
            newErrors.teacher = "الشيخ مطلوب";
        return newErrors;
    };
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                let payload = {
                    username: `${form.firstName} ${form.lastName}`,
                    email: form.email,
                    password: form.password,
                    gender: form.gender,
                    type: form.type,
                };
                if (form.type === "assistant") {
                    payload.teacher = form.teacher;
                }
                let res = await Auth(`api/register/`, "POST", payload);
                let data = await res.json();
                if (res.status === 201) {
                    // Set cookies securely (httpOnly should be set by backend)
                    document.cookie = `access=${data.access}; path=/; secure; samesite=strict`;
                    document.cookie = `refresh=${data.refresh}; path=/; secure; samesite=strict`;
                    window.location.href = `/dashboard/${form.type}`;
                } else if (res.status === 400) {
                    setErrors({
                        server:
                            data.error ||
                            "حدث خطأ في التسجيل. تحقق من البيانات.",
                    });
                } else {
                    setErrors({
                        server: "حدث خطأ غير متوقع. حاول لاحقًا.",
                    });
                }
            } catch (err) {
                setErrors({ server: "فشل الاتصال بالخادم. حاول لاحقًا." });
            }
        }
    };
    useEffect(() => {
        const fetchTeachers = async () => {
            let res = await Auth("api/teachers/", "GET");
            let data = await res.json();
            setTeachers(data.teachers);
        };
        fetchTeachers();
    }, []);
    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>تسجيل جديد - معهد الحمد</title>
                <meta
                    name='description'
                    content='سجل في برامج حفظ القرآن الكريم بمعهد الحمد'
                />
                <link rel='icon' href='/icon.png' />
            </Head>

            {/* Navigation Bar */}
            <nav className='bg-emerald-800 text-white p-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>معهد الحمد</h1>
                    <div className='space-x-6'>
                        <Link href='/' className='hover:text-emerald-200'>
                            الرئيسية
                        </Link>
                        <Link href='/login' className='hover:text-emerald-200'>
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Registration Form */}
            <main className='flex-grow bg-emerald-50 py-12'>
                <div className='container mx-auto max-w-2xl'>
                    <div className='bg-white rounded-lg shadow-xl p-8'>
                        <h2 className='text-3xl font-bold text-emerald-800 text-center mb-8'>
                            نموذج التسجيل الجديد
                        </h2>

                        <form
                            className='space-y-6'
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-gray-700 mb-2'>
                                        الاسم الأول
                                    </label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                            errors.firstName
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    {errors.firstName && (
                                        <p className='text-red-600 text-sm mt-1'>
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-gray-700 mb-2'>
                                        اسم الاخير
                                    </label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                            errors.lastName
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    {errors.lastName && (
                                        <p className='text-red-600 text-sm mt-1'>
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className='block text-gray-700 mb-2'>
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.email && (
                                    <p className='text-red-600 text-sm mt-1'>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className='block text-gray-700 mb-2'>
                                    كلمة المرور
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.password && (
                                    <p className='text-red-600 text-sm mt-1'>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className='gap-6'>
                                <div>
                                    <label className='block text-gray-700 mb-2'>
                                        الجنس
                                    </label>
                                    <select
                                        name='gender'
                                        value={form.gender}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg ${
                                            errors.gender
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        <option value='male'>ذكر</option>
                                        <option value='female'>أنثى</option>
                                    </select>
                                    {errors.gender && (
                                        <p className='text-red-600 text-sm mt-1'>
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>
                                <div className='gap-6'>
                                    <div>
                                        <label className='block text-gray-700 mb-2'>
                                            نوع الحساب
                                        </label>
                                        <select
                                            name='type'
                                            value={form.type}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg ${
                                                errors.type
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value='teacher'>
                                                مدرس
                                            </option>
                                            <option value='assistant'>
                                                مساعد
                                            </option>
                                        </select>
                                        {errors.type && (
                                            <p className='text-red-600 text-sm mt-1'>
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {form.type === "assistant" && (
                                <div className='gap-6'>
                                    <div>
                                        <label className='block text-gray-700 mb-2'>
                                            الشيخ
                                        </label>
                                        <select
                                            name='teacher'
                                            value={form.teacher}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg ${
                                                errors.teacher
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value=''>اختر شيخ</option>
                                            {teachers &&
                                                teachers.map((teacher) => {
                                                    return (
                                                        <option
                                                            key={teacher.id}
                                                            value={teacher.id}
                                                        >
                                                            {teacher.username}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        {errors.teacher && (
                                            <p className='text-red-600 text-sm mt-1'>
                                                {errors.teacher}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <button
                                type='submit'
                                className='w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors'
                            >
                                تسجيل الحساب
                            </button>
                        </form>
                        {errors.server && (
                            <p className=' text-red-600 text-lg mr-[50%] translate-x-[30%] mt-4'>
                                {errors.server}
                            </p>
                        )}
                        <p className='text-center mt-6 text-gray-600'>
                            لديك حساب بالفعل؟
                            <Link
                                href='/login'
                                className='text-emerald-600 hover:underline'
                            >
                                سجل الدخول هنا
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className='bg-emerald-800 text-white py-6 mt-12'>
                <div className='container mx-auto text-center'>
                    <p>© 2023 معهد الحمد - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    );
}
