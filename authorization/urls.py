from django.urls import path
from authorization import views


urlpatterns = [
    path('', views.index),
    path('monitoring/', views.monitoring),
    path('board/', views.board),
    path('not_allowed/', views.not_allowed),
    path('login/', views.login),

]