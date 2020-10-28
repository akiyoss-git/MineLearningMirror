from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Course


class CourseAdminForm(forms.ModelForm):
    #description = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Course
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm


admin.site.register(Course, CourseAdmin)
