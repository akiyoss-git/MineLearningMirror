from django.db import models
from datetime import datetime, date, time
from django.utils import timezone
from courses.models import Course
from authentication.models import CustomUser

class Lesson(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=120, default='')
    preview = models.TextField(default='')
    content = models.TextField(default='')
    poster = models.URLField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="lessons",
        related_query_name="lesson",
    )

    updated_at=models.DateTimeField(null=True)
    creator=models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='lessons'
    )


    def __str__(self):
        title = self.title
        return title
 
