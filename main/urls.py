from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(r'about$', views.AboutView.as_view(), name='about'),
    url(r'contact$', views.ContactView.as_view(), name='contact'),
    url(r'contact/success$', views.ContactSuccessView.as_view(), name='contact_success')
]
