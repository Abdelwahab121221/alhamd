"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Auth from "@/app/components/Auth";
import SideBar from "@/app/components/Side";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const AssistantProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const handlePasswordChange = async () => {
        const currentPassword =
            document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;

        if (!currentPassword || !newPassword) {
            alert("يرجى ملء جميع الحقول");
            return;
        }

        let res = await Auth("api/change-password/", "POST", {
            current_password: currentPassword,
            new_password: newPassword,
        });

        if (res.status === 200) {
            alert("تم تغيير كلمة المرور بنجاح");
            window.location.href = "/profile";
        } else {
            alert("فشل تغيير كلمة المرور");
        }
    };
    const handleLogout = async () => {
        document.cookie =
            "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
        document.cookie =
            "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
        let res = await Auth("api/logout/", "POST", {
            refresh: document.cookie
                .split("; ")
                .find((row) => row.startsWith("refresh="))
                ?.split("=")[1],
        });
        if (res.status === 401 || res.status === 205) {
            window.location.href = "/";
            return;
        }
        window.location.href = "/";
    };
    useEffect(() => {
        const checkLoginGetData = async () => {
            let res = await Auth("api/profile/", "GET");
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data.type !== "assistant") {
                window.location.href = "/";
                return;
            }
            console.log(data);
            const profileData = {
                username: data.username,
                email: data.email,
                type: data.type,
                gender: data.gender,
                date_joined: data.date_joined,
            };

            if (data.type === "teacher") {
                profileData.students_count = data.students_count;
            } else if (data.type === "assistant") {
                profileData.teacher = data.teacher;
            }
            console.log(profileData);
            setProfileData(profileData);
        };
        checkLoginGetData();
    }, []);

    return (
        <div className='min-h-screen flex flex-col' dir='rtl'>
            <Head>
                <title>الملف الشخصي - معهد الحمد</title>
                <meta name='description' content='ملف المشرف الشخصي' />
            </Head>

            {/* Reuse Assistant Panel Navigation */}
            <nav className='bg-emerald-800 text-white p-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>لوحة المشرفين</h1>
                    <div className='flex items-center space-x-6'>
                        <button
                            onClick={handleLogout}
                            className='transition-colors cursor-pointer hover:bg-green-400 text-right px-4 py-2 rounded-3xl text-red-600'
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </nav>

            <div className='flex flex-1 bg-emerald-50'>
                {/* Reuse Assistant Panel Sidebar */}
                <SideBar active={0} />

                {/* Profile Content */}
                <main className='flex-1 p-6 lg:p-8'>
                    <div className='max-w-4xl mx-auto'>
                        {/* Profile Header */}
                        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
                            <div className='flex flex-col lg:flex-row items-center gap-6'>
                                <div className='w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center'>
                                    <span className='text-4xl text-emerald-800'>
                                        {profileData?.username[0]}
                                    </span>
                                </div>
                                <div className='text-center lg:text-right'>
                                    <h1 className='text-2xl font-bold text-emerald-800'>
                                        {profileData?.username}
                                    </h1>
                                    <p className='text-gray-600'>
                                        مشرف حفظ قرآن
                                    </p>
                                    <p className='text-sm text-emerald-600 mt-2'>
                                        انضم في:{" "}
                                        {format(
                                            new Date(
                                                profileData?.date_joined ||
                                                    new Date()
                                            ),
                                            "dd MMMM yyyy",
                                            {
                                                locale: ar,
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Sections */}
                        <div className='grid md:grid-cols-2 gap-6'>
                            {/* Personal Information */}
                            <div className='bg-white rounded-xl shadow-lg p-6'>
                                <h2 className='text-xl font-bold text-emerald-800 mb-4'>
                                    المعلومات الشخصية
                                </h2>
                                <div className='space-y-3'>
                                    <div>
                                        <label className='text-gray-600'>
                                            الجنس
                                        </label>
                                        <p className='font-medium'>
                                            {profileData?.gender === "male"
                                                ? "ذكر"
                                                : "انثى"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className='bg-white rounded-xl shadow-lg p-6'>
                                <h2 className='text-xl font-bold text-emerald-800 mb-4'>
                                    معلومات الاتصال
                                </h2>
                                <div className='space-y-3'>
                                    <div>
                                        <label className='text-gray-600'>
                                            البريد الإلكتروني
                                        </label>
                                        <p className='font-medium'>
                                            {profileData?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Settings */}
                            <div className='bg-white rounded-xl shadow-lg p-6 md:col-span-2'>
                                <h2 className='text-xl font-bold text-emerald-800 mb-4'>
                                    إعدادات الحساب
                                </h2>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-gray-700 mb-2'>
                                            كلمة المرور الحالية
                                        </label>
                                        <input
                                            type='password'
                                            className='w-full px-4 py-2 border rounded-lg'
                                            placeholder='••••••••'
                                            id='current-password'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 mb-2'>
                                            كلمة المرور الجديدة
                                        </label>
                                        <input
                                            type='password'
                                            className='w-full px-4 py-2 border rounded-lg'
                                            placeholder='••••••••'
                                            id='new-password'
                                        />
                                    </div>
                                    <button
                                        onClick={handlePasswordChange}
                                        className='bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700'
                                    >
                                        حفظ التغييرات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AssistantProfile;
