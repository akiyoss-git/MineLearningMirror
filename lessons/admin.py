from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Lesson


class LessonAdminForm(forms.ModelForm):
    #content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Lesson
        fields = '__all__'


class LessonAdmin(admin.ModelAdmin):
    form = LessonAdminForm


admin.site.register(Lesson, LessonAdmin)
