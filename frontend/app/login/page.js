"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Auth from "@/app/components/Auth";

export default function Login() {
    // State for form fields
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    // State for errors
    const [errors, setErrors] = useState({});
    // State for server error
    const [serverError, setServerError] = useState("");
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setServerError("");
    };
    // Validation logic
    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
        if (!form.password) newErrors.password = "كلمة المرور مطلوبة";
        else if (form.password.length < 6)
            newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        return newErrors;
    };
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length === 0) {
            try {
                let res = await Auth(`api/login/`, "POST", form);
                if (res.status === 401) {
                    setErrors({
                        email: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
                    });
                    return;
                }
                let data = await res.json();
                document.cookie = `access=${data.access};`;
                document.cookie = `refresh=${data.refresh};`;
                res = await Auth("api/type/", "POST");
                data = await res.json();
                if (data.data.type === "assistant") {
                    window.location.href = "/dashboard/assistant";
                } else {
                    window.location.href = "/dashboard/teacher";
                }
            } catch (err) {
                setServerError("حدث خطأ في الاتصال بالخادم. حاول لاحقًا.");
            }
        }
    };

    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>تسجيل الدخول - معهد الحمد</title>
                <meta
                    name='description'
                    content='سجل الدخول إلى حسابك في معهد الحمد'
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
                        <Link
                            href='/registration'
                            className='hover:text-emerald-200'
                        >
                            تسجيل جديد
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Login Form */}
            <main className='flex-grow bg-emerald-50 py-12'>
                <div className='container mx-auto max-w-md'>
                    <div className='bg-white rounded-lg shadow-xl p-8'>
                        <h2 className='text-3xl font-bold text-emerald-800 text-center mb-8'>
                            تسجيل الدخول
                        </h2>

                        <form
                            className='space-y-6'
                            onSubmit={handleSubmit}
                            noValidate
                            autoComplete='off'
                        >
                            <div>
                                <label className='block text-gray-700 mb-2'>
                                    اسم المستخدم أو البريد الإلكتروني
                                </label>
                                <input
                                    type='text'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    placeholder='example@domain.com'
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
                                    autoComplete='new-password'
                                />
                                {errors.password && (
                                    <p className='text-red-600 text-sm mt-1'>
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors'
                            >
                                تسجيل الدخول
                            </button>

                            <div className='relative mt-6'>
                                <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-300'></div>
                                </div>
                                <div className='relative flex justify-center text-sm'>
                                    <span className='px-2 bg-white text-gray-500'>
                                        أو
                                    </span>
                                </div>
                            </div>
                        </form>

                        <p className='text-center mt-6 text-gray-600'>
                            ليس لديك حساب؟
                            <Link
                                href='/register'
                                className='text-emerald-600 hover:underline'
                            >
                                أنشئ حساب جديد
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
