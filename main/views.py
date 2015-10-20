from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
from case_studies.models import CaseStudy
from main.forms import ContactForm
from django.http import JsonResponse


class HomeView(ListView):
    context_object_name = 'case_list'
    model = CaseStudy
    template_name = 'index.html'
    queryset = CaseStudy.objects.all().order_by('-date_added').filter(is_visible=True)[:4]


class AboutView(TemplateView):
    template_name = 'about.html'


class ContactView(FormView):
    template_name = 'contact.html'
    form_class = ContactForm
    success_url = '/contact'

    def form_invalid(self, form):
        response = super(AjaxableResponseMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        # We make sure to call the parent's form_valid() method because
        # it might do some processing (in the case of CreateView, it will
        # call form.save() for example).
        instance = form.save()
        instance.send_email()
        response = super(ContactView, self).form_valid(form)
        if self.request.is_ajax():
            data = {
                'pk': instance.pk,
            }
            return JsonResponse(data)
        else:
            return response


class ContactSuccessView(TemplateView):
    template_name = 'contact_success.html'
