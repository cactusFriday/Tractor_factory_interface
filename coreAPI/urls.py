from django.urls import path
from django.urls.conf import include
from coreAPI import views


urlpatterns = [
    path('', views.api_root),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('conveyor-state/', views.conveyor_state_list, name='conveyor-list'),
    path('accident/', views.AccidentList.as_view(), name='accident-list'),
    path('accident/<int:pk>/', views.AccidentDetail.as_view(), name='accident-detail'),
    path('accident/history/', views.AccidentHistoryList.as_view(), name='accident_history-list'),
    
    
    # path('accident/<int:pk>/', views.accident_edit), #
    # path('accident/last'),      #GET отправляем последнее происшествие
    # path('accident/', views.),  #GET получение num последних accident/?last=10
    # path('accident/detail/<>', views.accident_detail)
    # path('get/conveyor-state/', ),
]


'''
заходим на сайт
отправляем запрос на получение последних 10 происшествий
GET /accident/?last=10

нажимаем на править определенный запрос
заполняем форму и отправляем запрос с телом
POST /accident/<int:pk> {id, post, ....}
достаем по этому айди, создаем запись в истории, перекладываем в историю поля этого происшествия (старый), меняем поля у этого происшествия
возвращаем ЛИБО история+данное происшествие ЛИБО данное происшествие
'''