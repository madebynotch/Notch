from django.conf.urls import url
from inspire import views

urlpatterns = [
    url(r'^$', views.InspireView.as_view(), name='inspire'),
]
