from django.db import models
from datetime import datetime, date, time
from django.utils import timezone
from authentication.models import CustomUser


class Course(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=120, default='')
    preview = models.TextField(default='')
    content = models.TextField(default='')
    poster = models.URLField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    updated_at = models.DateTimeField(null=True)
    creator = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='courses'
    )

    def __str__(self):
        title = self.title
        return title
