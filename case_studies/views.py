from django.shortcuts import render
from django.views.generic.detail import DetailView
from case_studies.models import CaseStudy, CaseStudyImage


class CaseStudyView(DetailView):

    model = CaseStudy
    template_name = 'case_study.html'
    context_object_name = 'case_study'
