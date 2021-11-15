from django.urls import path

from conveyor import views
from conveyor.views import ButtonsBlocksRetrieveAPIView

urlpatterns = [
    path('', views.posts_state_list, name='conveyor-list'),
    path('update-list/', views.update_posts_status),
    path('buttons-posts/', ButtonsBlocksRetrieveAPIView.as_view()),
]
