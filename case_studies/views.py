from django.http.response import Http404
from django.views.generic.detail import DetailView
from django.views.generic.base import TemplateView
from case_studies.models import CaseStudy


class CaseStudyView(DetailView):

    model = CaseStudy
    template_name = 'case_study.html'
    context_object_name = 'case_study'

    def get(self, request, *args, **kwargs):
        curr_object = self.get_object()
        if curr_object.is_visible:
            return super(CaseStudyView, self).get(request, *args, **kwargs)
        else:
            if request.user.is_authenticated():
                return super(CaseStudyView, self).get(request, *args, **kwargs)
            else:
                raise Http404()


# class ShareView(TemplateView):
#     template_name = 'share.html'

    # def get_context_data(self, **kwargs):
    #     context = super(ShareView, self).get_context_data(**kwargs)
    #     #print "https://notch.bixly.com"+str(self.request)[-21:-7]
    #     context['case_study'] = "https://notch.bixly.com"+str(self.request)[-21:-7]
    #     return context
