from django.urls import path
from .views import (
    UserList,
    UserDetail,
    TypeList,
    TypeDetail,
    TableList,
    TableDetail,
    register,
    login,
    dashboard,
    type,
    TableDetail,
    TableList,
    logout,
    teachers,
    student_search,
    StudentList,
    StudentDetail,
    teacher
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/", UserList.as_view(), name="user-list"),
    path("users/<int:pk>", UserDetail.as_view(), name="user-detail"),
    path("types/", TypeList.as_view(), name="type-list"),
    path("types/<int:pk>", TypeDetail.as_view(), name="type-detail"),
    path("tables/", TableList.as_view(), name="table-list"),
    path("tables/<int:pk>", TableDetail.as_view(), name="table-detail"),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("dashboard/", dashboard, name="dashboard"),
    path("type/", type, name="type"),
    path("logout/", logout, name="logout"),
    path("teachers/", teachers, name="teachers"),
    path("search/", student_search, name="student_search"),
    path('students/',StudentList.as_view(),name='student-list'),
    path('students/<int:pk>',StudentDetail.as_view(),name='student-list'),
    path('teacher/',teacher,name='teacher')
]
