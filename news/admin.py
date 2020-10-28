from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import New


class NewAdminForm(forms.ModelForm):
    #description = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = New
        fields = '__all__'


class NewAdmin(admin.ModelAdmin):
    form = NewAdminForm


admin.site.register(New, NewAdmin)
