from django.views.generic.list import ListView
from inspire.models import InspireItem


class InspireView(ListView):
    context_object_name = 'case_list'
    model = InspireItem
    template_name = 'inspire.html'
