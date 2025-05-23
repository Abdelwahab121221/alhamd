import React from "react";
import Link from "next/link";

function SideBar({ active }) {
    const links = [
        {
            href: "/dashboard/assistant",
            label: "لوحة التحكم",
            icon: (
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
            ),
        },
        {
            href: "/dashboard/assistant/students",
            label: "إدارة الطلاب",
            icon: (
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
            ),
        },
        {
            href: "/dashboard/assistant/tables",
            label: "الجداول",
            icon: (
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
                        d='M4 6h16M4 10h16M4 14h16M4 18h16'
                    />
                </svg>
            ),
        },
    ];

    return (
        <aside className='bg-white lg:w-64 p-4 shadow-lg lg:sticky lg:top-0'>
            <nav className='space-y-4'>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`${
                            active === index + 1
                                ? `bg-emerald-50`
                                : `hover:bg-green-100`
                        } flex justify-center lg:justify-start transition-all items-center space-x-2 p-2 rounded-lg`}
                    >
                        {link.icon}
                        <span className='hidden lg:inline'>{link.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default SideBar;
