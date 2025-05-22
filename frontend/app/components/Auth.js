async function Auth(url, method, data = null) {
    // Always use HTTPS in production
    // let backendUrl = window.location.origin.replace("3000", "8000").replace("http://", "https://");
    let backendUrl = window.location.origin.replace("3000", "8000");
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
    if (data && typeof data === "object") {
        for (const key in data) {
            if (typeof data[key] === "string") {
                data[key] = data[key].replace(/[<>]/g, "");
            }
        }
    }
    if (token && method !== "GET") {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        let res = await fetch(`${backendUrl}/${url}`, {
            method: method,
            mode: "cors",
            headers: headers,
            body: JSON.stringify(data),
        });
        if (res.status === 401) {
            const refreshToken = document.cookie
                .split("; ")
                .find((item) => item.startsWith("refresh"))
                ?.split("=")[1];
            if (refreshToken) {
                const refreshResponse = await fetch(
                    `${backendUrl}/api/token/refresh`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ refresh: refreshToken }),
                    }
                );
                if (refreshResponse.status === 200) {
                    const refreshData = await refreshResponse.json();
                    document.cookie = `access=${refreshData.access}; path=/; secure; samesite=strict`;
                    if (refreshData.refresh) {
                        document.cookie = `refresh=${refreshData.refresh}; path=/; secure; samesite=strict`;
                    } else {
                        document.cookie = `refresh=${refreshToken}; path=/; secure; samesite=strict`;
                    }
                    return await fetch(`${backendUrl}/${url}`, {
                        method: method,
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshData.access}`,
                        },
                        body: JSON.stringify(data),
                    });
                } else {
                    // Clear cookies if refresh fails
                    document.cookie =
                        "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                    document.cookie =
                        "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                    return refreshResponse;
                }
            } else {
                // Clear cookies if no refresh token
                document.cookie =
                    "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                document.cookie =
                    "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                return res;
            }
        } else {
            return res;
        }
    } else if (token && method === "GET") {
        let res = await fetch(`${backendUrl}/${url}`, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status === 401) {
            const refreshToken = document.cookie
                .split("; ")
                .find((item) => item.startsWith("refresh"))
                ?.split("=")[1];
            if (refreshToken) {
                const refreshResponse = await fetch(
                    `${backendUrl}/api/token/refresh`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ refresh: refreshToken }),
                    }
                );
                if (refreshResponse.status === 200) {
                    const refreshData = await refreshResponse.json();
                    document.cookie = `access=${refreshData.access}; path=/; secure; samesite=strict`;
                    if (refreshData.refresh) {
                        document.cookie = `refresh=${refreshData.refresh}; path=/; secure; samesite=strict`;
                    } else {
                        document.cookie = `refresh=${refreshToken}; path=/; secure; samesite=strict`;
                    }
                    return await fetch(`${backendUrl}/${url}`, {
                        method: method,
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshData.access}`,
                        },
                    });
                } else {
                    document.cookie =
                        "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                    document.cookie =
                        "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                    return refreshResponse;
                }
            } else {
                document.cookie =
                    "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                document.cookie =
                    "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
                return res;
            }
        } else {
            return res;
        }
    } else if (!token && method === "GET") {
        return await fetch(`${backendUrl}/${url}`, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return await fetch(`${backendUrl}/${url}`, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
}

export default Auth;
