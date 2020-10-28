from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    name = models.CharField(max_length=32, default='')
    surname = models.CharField(max_length=32, default='')
    second_name = models.CharField(max_length=32, default='')
    """rights = JSONField(default=dict)
    progress = JSONField(default=dict)"""
    email = models.EmailField(max_length=120, unique=True)
    avatar = models.URLField(default='', blank=True)
    status = models.CharField(max_length=16, default='', blank=True)
    bio = models.TextField(
        max_length=2000,
        blank=True,
        default=''
    )

    def __str__(self):
        title = self.username
        return title


@receiver(post_save, sender=CustomUser)
def create_superuser_profile(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        user = CustomUser.objects.get(username=str(instance))
        user.bio='I am the admin and I manage this website'
        user.avatar='http://res.cloudinary.com/rengorum/image/upload/v1525768360/admin.png'
        user.name='Administrator'
        user.status='Administrator'
        user.save()