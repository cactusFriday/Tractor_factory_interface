from django.urls import path

from conveyor import views

urlpatterns = [
    path('', views.conveyor_state_list, name='conveyor-list'),
]