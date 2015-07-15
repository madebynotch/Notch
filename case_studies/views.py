from django.shortcuts import render
from case_studies.models import CaseStudy, CaseStudyImage

# Create your views here.

def case_study(request, pk):
    case_study = CaseStudy.objects.get(pk=pk)

    context = {'case_study': case_study,}

    return render(request, 'case_study.html', context)
