from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator

class Type(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100,choices=[
        ('teacher', 'Teacher'),
        ('assistant', 'Assistant'),
    ], default='student')
    gender = models.CharField(max_length=10, choices=[
        ('male', 'Male'),
        ('female', 'Female')
    ], default='male')
    def __str__(self):
        return f'{self.user} - {self.type}'

class Table(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    day = models.DateField()
    gozia = models.IntegerField(default=None, validators=[MaxValueValidator(30)])
    def __str__(self):
        return f'{self.user} - {self.name}'

QURAN_SORAS = [
    ('الفاتحة', 'الفاتحة'),
    ('البقرة', 'البقرة'),
    ('آل عمران', 'آل عمران'),
    ('النساء', 'النساء'),
    ('المائدة', 'المائدة'),
    ('الأنعام', 'الأنعام'),
    ('الأعراف', 'الأعراف'),
    ('الأنفال', 'الأنفال'),
    ('التوبة', 'التوبة'),
    ('يونس', 'يونس'),
    ('هود', 'هود'),
    ('يوسف', 'يوسف'),
    ('الرعد', 'الرعد'),
    ('إبراهيم', 'إبراهيم'),
    ('الحجر', 'الحجر'),
    ('النحل', 'النحل'),
    ('الإسراء', 'الإسراء'),
    ('الكهف', 'الكهف'),
    ('مريم', 'مريم'),
    ('طه', 'طه'),
    ('الأنبياء', 'الأنبياء'),
    ('الحج', 'الحج'),
    ('المؤمنون', 'المؤمنون'),
    ('النور', 'النور'),
    ('الفرقان', 'الفرقان'),
    ('الشعراء', 'الشعراء'),
    ('النمل', 'النمل'),
    ('القصص', 'القصص'),
    ('العنكبوت', 'العنكبوت'),
    ('الروم', 'الروم'),
    ('لقمان', 'لقمان'),
    ('السجدة', 'السجدة'),
    ('الأحزاب', 'الأحزاب'),
    ('سبأ', 'سبأ'),
    ('فاطر', 'فاطر'),
    ('يس', 'يس'),
    ('الصافات', 'الصافات'),
    ('ص', 'ص'),
    ('الزمر', 'الزمر'),
    ('غافر', 'غافر'),
    ('فصلت', 'فصلت'),
    ('الشورى', 'الشورى'),
    ('الزخرف', 'الزخرف'),
    ('الدخان', 'الدخان'),
    ('الجاثية', 'الجاثية'),
    ('الأحقاف', 'الأحقاف'),
    ('محمد', 'محمد'),
    ('الفتح', 'الفتح'),
    ('الحجرات', 'الحجرات'),
    ('ق', 'ق'),
    ('الذاريات', 'الذاريات'),
    ('الطور', 'الطور'),
    ('النجم', 'النجم'),
    ('القمر', 'القمر'),
    ('الرحمن', 'الرحمن'),
    ('الواقعة', 'الواقعة'),
    ('الحديد', 'الحديد'),
    ('المجادلة', 'المجادلة'),
    ('الحشر', 'الحشر'),
    ('الممتحنة', 'الممتحنة'),
    ('الصف', 'الصف'),
    ('الجمعة', 'الجمعة'),
    ('المنافقون', 'المنافقون'),
    ('التغابن', 'التغابن'),
    ('الطلاق', 'الطلاق'),
    ('التحريم', 'التحريم'),
    ('الملك', 'الملك'),
    ('القلم', 'القلم'),
    ('الحاقة', 'الحاقة'),
    ('المعارج', 'المعارج'),
    ('نوح', 'نوح'),
    ('الجن', 'الجن'),
    ('المزمل', 'المزمل'),
    ('المدثر', 'المدثر'),
    ('القيامة', 'القيامة'),
    ('الإنسان', 'الإنسان'),
    ('المرسلات', 'المرسلات'),
    ('النبأ', 'النبأ'),
    ('النازعات', 'النازعات'),
    ('عبس', 'عبس'),
    ('التكوير', 'التكوير'),
    ('الإنفطار', 'الإنفطار'),
    ('المطففين', 'المطففين'),
    ('الإنشقاق', 'الإنشقاق'),
    ('البروج', 'البروج'),
    ('الطارق', 'الطارق'),
    ('الأعلى', 'الأعلى'),
    ('الغاشية', 'الغاشية'),
    ('الفجر', 'الفجر'),
    ('البلد', 'البلد'),
    ('الشمس', 'الشمس'),
    ('الليل', 'الليل'),
    ('الضحى', 'الضحى'),
    ('الشرح', 'الشرح'),
    ('التين', 'التين'),
    ('العلق', 'العلق'),
    ('القدر', 'القدر'),
    ('البينة', 'البينة'),
    ('الزلزلة', 'الزلزلة'),
    ('العاديات', 'العاديات'),
    ('القارعة', 'القارعة'),
    ('التكاثر', 'التكاثر'),
    ('العصر', 'العصر'),
    ('الهمزة', 'الهمزة'),
    ('الفيل', 'الفيل'),
    ('قريش', 'قريش'),
    ('الماعون', 'الماعون'),
    ('الكوثر', 'الكوثر'),
    ('الكافرون', 'الكافرون'),
    ('النصر', 'النصر'),
    ('المسد', 'المسد'),
    ('الإخلاص', 'الإخلاص'),
    ('الفلق', 'الفلق'),
    ('الناس', 'الناس'),
]

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    gozia = models.IntegerField(default=None, validators=[MaxValueValidator(30)])
    sora = models.CharField(max_length=100, choices=QURAN_SORAS)
    teacher = models.ForeignKey( User , on_delete=models.CASCADE)
    numbers_of_khatma = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.name}'

class Assistant(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    teacher = models.ForeignKey( User , on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.name}'