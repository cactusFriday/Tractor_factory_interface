from django.urls import path
from django.urls.conf import include
from coreAPI import views


urlpatterns = [
    path('conveyor-state/', views.conveyor_state_list),
    path('accident/create', views.accident_create),
    path('accident/detail/<>', views.accident_detail)
    # path('get/conveyor-state/', ),
]