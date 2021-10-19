from django.urls import path
from .views import *


urlpatterns = [
    path('test/create/', TestSerializerView.as_view()),
]