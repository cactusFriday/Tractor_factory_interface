from django.urls import path
from .views import *


urlpatterns = [
    path('', developing_page),
]