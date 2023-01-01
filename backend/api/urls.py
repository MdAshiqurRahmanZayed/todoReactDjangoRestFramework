from django.urls import path,include
from .views import apiOverview,ToDoList,ToDoDetail,ToDoCreate,ToDoUpdate,ToDoDelete,allApi
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', allApi, 'api')

urlpatterns = [
     path('',apiOverview,name="api-overview"),
     path('todo-list/', ToDoList, name="todo-list"),
     path('todo-create/', ToDoCreate, name="todo-create"),
     path('todo-detail/<int:pk>',  ToDoDetail, name="todo-detail"),
     path('todo-update/<int:pk>',  ToDoUpdate, name="todo-update"),
     path('todo-delete/<int:pk>',  ToDoDelete, name="todo-delete"),

#     path('',views.apiOverview,name="api"),
    path('all-api/',include(router.urls),name='api-all')
     
]