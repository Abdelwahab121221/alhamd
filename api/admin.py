from django.contrib import admin
from .models import Type, Table , Student , Assistant
# Register your models here.
admin.site.site_header = "Alhamd Admin"
admin.site.site_title = "Alhamd Admin Portal"
admin.site.index_title = "Welcome to Alhamd Admin Portal"
admin.site.register(Type)
admin.site.register(Table)
admin.site.register(Student)
admin.site.register(Assistant)