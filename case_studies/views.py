from django.shortcuts import render
from case_studies.models import CaseStudy, CaseStudyImage

# Create your views here.

def case_study(request, pk):
    case_study = CaseStudy.objects.get(pk=pk)
    images = case_study.images.filter(is_sub_header=False)
    sub_images = case_study.images.filter(is_sub_header=True)
    
    context = {'case_study': case_study, 'images': images, 'sub_images': sub_images,}

    return render(request, 'case_study.html', context)
