from django.conf.urls import url
from case_studies import views

urlpatterns = [
	url(r'^(?P<pk>\d+)/$', views.case_study, name='case_study'),
]
