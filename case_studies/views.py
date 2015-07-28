from django.http.response import Http404
from django.views.generic.detail import DetailView
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

    def get_context_data(self, **kwargs):
        context = super(CaseStudyView, self).get_context_data(**kwargs)
        url = str(self.request.META['wsgi.url_scheme'])+'://'+str(self.request.META['HTTP_HOST'])+str(self.request.META['PATH_INFO'])
        context['url'] = url
        return context
