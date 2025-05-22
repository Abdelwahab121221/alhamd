import React, { useEffect } from 'react'
import Auth from './Auth'
function Nav({data}) {
    const handleLogout = async () => {
        // Always clear cookies on logout for security
        document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
        document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
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
        const checkLogin = async () => {
            let res = await Auth("api/type/", "POST");
            if (res.status === 401) {
                // Clear cookies if unauthorized
                document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                window.location.href = "/";
                return;
            }
            let data = await res.json();
            if (data.data.type !== "assistant") {
                window.location.href = "/dashboard/teacher";
                return;
            }
        };
        checkLogin();
    }, [])
  return (
    <nav className='bg-emerald-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {data && (
          <h1 className='text-2xl font-bold'>
            مرحبا ! {data.username}
          </h1>
        )}
        <div className='flex items-center space-x-6'>
          <button
            onClick={handleLogout}
            className='w-full transition-colors cursor-pointer hover:bg-green-400 text-right px-4 py-2 rounded-3xl text-red-600'
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav;