from django.contrib import admin
from .models import CustomUser
from django.contrib.postgres import fields
from django_json_widget.widgets import JSONEditorWidget

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    formfield_overrides = {
        fields.JSONField: {'widget': JSONEditorWidget},
    }


admin.site.register(CustomUser, CustomUserAdmin)
