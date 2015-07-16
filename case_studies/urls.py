from django.conf.urls import url
from case_studies import views

urlpatterns = [
    url(r'^(?P<pk>\d+)/$', views.CaseStudyView.as_view(), name='case_study'),
]
