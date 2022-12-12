from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('register', register, name='register'),
    path('Image', Image.as_view(), name='Image'),
    path('Video', Video.as_view(), name='Video'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)