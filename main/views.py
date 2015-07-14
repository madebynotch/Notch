from django.views.generic.list import ListView
from case_studies.models import CaseStudy


class HomeView(ListView):
    context_object_name = 'case_list'
    model = CaseStudy
    template_name = 'index.html'
