from django.contrib import admin
from django.conf import settings
from django.conf.urls import include, url, static

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('main.urls')),
    url(r'^inspire/', include('inspire.urls')),
    url(r'^case_study/', include('case_studies.urls')),
]

if settings.DEBUG:
    urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
