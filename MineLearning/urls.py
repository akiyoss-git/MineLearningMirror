from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/', include('authentication.urls')),
    path('api/news/', include('news.urls')),
    path('api/lessons/', include('lessons.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/forum/', include('forums.urls')),
    path('api/thread/', include('threads.urls')),
    path('api/post/', include('posts.urls')),
    path('', include('frontend.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
