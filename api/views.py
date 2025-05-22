from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from .models import Type, Table , Student , Assistant , QURAN_SORAS
from .serializers import TableSerializer, TypeSerializer, UserSerializer , StudentSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class TypeList(generics.ListCreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAdminUser]


class TypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAdminUser]


class TableList(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if Type.objects.filter(user=user).type == "teacher":
            return Table.objects.filter(user=user)
        return Table.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if Type.objects.filter(user=user).type == "teacher":
            serializer.save(user=user)
        else:
            return Response(
                {"error": "You are not allowed to create a table."},
                status=status.HTTP_403_FORBIDDEN,
            )


class TableDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        user = self.request.user
        if Type.objects.filter(user=user).type == "teacher":
            serializer.save(user=user)
        else:
            return Response(
                {"error": "You are not allowed to update this table."},
                status=status.HTTP_403_FORBIDDEN,
            )

    def perform_destroy(self, instance):
        user = self.request.user
        if Type.objects.filter(user=user).type == "teacher":
            instance.delete()
        else:
            return Response(
                {"error": "You are not allowed to delete this table."},
                status=status.HTTP_403_FORBIDDEN,
            )


# --- Student Views ---
class StudentList(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            return Student.objects.none()
        if user_type.type == "teacher":
            return Student.objects.filter(teacher=user)
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            return Student.objects.filter(teacher=assistant.teacher)
        return Student.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            raise PermissionDenied("Type not found.")
        if user_type.type == "teacher":
            serializer.save(teacher=user)
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            teacher_id = self.request.data.get('teacher', '')
            if int(assistant.teacher.id) == int(teacher_id):
                serializer.save(teacher=assistant.teacher)
            else:
                raise PermissionDenied("That's not your teacher.")
        else:
            raise PermissionDenied("You are not allowed to create a student.")

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            return Student.objects.none()
        if user_type.type == "teacher":
            return Student.objects.filter(teacher=user)
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            return Student.objects.filter(teacher=assistant.teacher)
        return Student.objects.none()

    def get_object(self):
        user = self.request.user
        pk = self.kwargs.get('pk')
        try:
            obj = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise PermissionDenied("Student not found.")
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            raise PermissionDenied("Type not found.")
        if user_type.type == "teacher" and obj.teacher == user:
            return obj
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            if obj.teacher == assistant.teacher:
                return obj
        raise PermissionDenied("You are not allowed to access this student.")

    def perform_update(self, serializer):
        user = self.request.user
        pk = self.kwargs.get('pk')
        try:
            obj = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise PermissionDenied("Student not found.")
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            raise PermissionDenied("Type not found.")
        if user_type.type == "teacher" and obj.teacher == user:
            serializer.save(teacher=user)
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            if obj.teacher == assistant.teacher:
                serializer.save(teacher=assistant.teacher)
            else:
                raise PermissionDenied("You are not allowed to update this student.")
        else:
            raise PermissionDenied("You are not allowed to update this student.")

    def perform_destroy(self, instance):
        user = self.request.user
        pk = self.kwargs.get('pk')
        try:
            obj = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise PermissionDenied("Student not found.")
        try:
            user_type = Type.objects.get(user=user)
        except Type.DoesNotExist:
            raise PermissionDenied("Type not found.")
        if user_type.type == "teacher" and obj.teacher == user:
            instance.delete()
        elif Assistant.objects.filter(name=user.username).exists():
            assistant = Assistant.objects.get(name=user.username)
            if obj.teacher == assistant.teacher:
                instance.delete()
            else:
                raise PermissionDenied("You are not allowed to delete this student.")
        else:
            raise PermissionDenied("You are not allowed to delete this student.")


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    type = request.data.get("type")
    gender = request.data.get("gender")
    teacher = request.data.get("teacher",'')
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "اسم المستخدم موجود بالفعل."}, status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.create_user(username=username, password=password, email=email)
    Type.objects.create(user=user, type=type, gender=gender)
    if teacher:
        Assistant.objects.create(name=user.username, teacher=User.objects.get(id=teacher))
    refresh = RefreshToken.for_user(user)
    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(username=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
            }
        )
    else:
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(
            {"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def teachers(request):
    teachers = User.objects.filter(type__type="teacher")
    serializer = UserSerializer(teachers, many=True)
    return Response({'teachers':serializer.data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def type(request):
    user = request.user
    try:
        type = Type.objects.get(user=user)
        serializer = TypeSerializer(type)
        return Response({"data": serializer.data, "username": user.username})
    except Type.DoesNotExist:
        return Response({"error": "Type not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    type = Type.objects.get(user=user)
    tables = Table.objects.filter(user=user)
    serializer = TableSerializer(tables, many=True)
    return Response(
        {"tabels": serializer.data, "name": user.username, "type": type.type}
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def student_search(request):
    user = request.user
    try:
        user_type = Type.objects.get(user=user)
    except Type.DoesNotExist:
        return Response({'error': 'Type not found'}, status=status.HTTP_404_NOT_FOUND)
    if user_type.type == 'teacher':
        query = request.data.get('query', '')
        data = Student.objects.filter(teacher=user, name__icontains=query)
        serializer = StudentSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif user_type.type == 'assistant':
        try:
            assistant = Assistant.objects.get(name=user.username)
            teacher = assistant.teacher
            query = request.data.get('query', '')
            data = Student.objects.filter(teacher=teacher, name__icontains=query)
            serializer = StudentSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Assistant.DoesNotExist:
            return Response({'error': 'Assistant not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'You are not allowed to search for students.'}, status=status.HTTP_403_FORBIDDEN)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teacher(request):
    user = request.user
    try:
        user_type = Type.objects.get(user=user)
    except Type.DoesNotExist:
        return Response({'error': 'Type not found'}, status=status.HTTP_404_NOT_FOUND)
    if user_type.type == "teacher":
        return Response({'teacher': user.username,'id':user.id}, status=status.HTTP_200_OK)
    elif Assistant.objects.filter(name=user.username).exists():
        assistant = Assistant.objects.get(name=user.username)
        return Response({'teacher': assistant.teacher.username,'id':assistant.teacher.id}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'You are not allowed to get teacher.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def soras_stats(request):
    stats = []
    for sora, _ in QURAN_SORAS:
        count = Student.objects.filter(sora=sora).count()
        if count > 0:
            stats.append({"sora": sora, "student_count": count})
    return Response(stats)
