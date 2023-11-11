from django.urls import path, include

from demo import views

urlpatterns = [
    path("demo/", views.demo, name="demo")
]
