from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
from case_studies.models import CaseStudy
from main.forms import ContactForm


class HomeView(ListView):
    context_object_name = 'case_list'
    model = CaseStudy
    template_name = 'index.html'
    queryset = CaseStudy.objects.all().filter(is_visible=True)[:4]


class AboutView(TemplateView):
    template_name = 'about.html'


class ContactView(FormView):
    template_name = 'contact.html'
    form_class = ContactForm
    success_url = '/contact/success'

    def form_valid(self, form):
        form.save()
        # TODO Send contact form email
        return super(ContactView, self).form_valid(form)


class ContactSuccessView(TemplateView):
    template_name = 'contact_success.html'
