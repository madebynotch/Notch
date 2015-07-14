from django.views.generic.list import ListView


class HomeView(ListView):
    template_name = 'index.html'