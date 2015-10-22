from django.core.paginator import Paginator
from django.http.response import JsonResponse
from django.template.loader import get_template
from django.views.generic.list import ListView
from inspire.models import InspireItem


class InspireView(ListView):
    context_object_name = 'inspire_list'
    model = InspireItem
    template_name = 'inspire.html'
    items_per_page = 14
    queryset = InspireItem.objects.all()[:items_per_page]

    def dispatch(self, request, *args, **kwargs):
        return super(InspireView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(InspireView, self).get_context_data(**kwargs)

        context['paginator'] = Paginator(
            self.model.objects.all(),
            self.items_per_page
        )

        return context

    def post(self, request, *args, **kwargs):
        page = request.POST.get('page', 1)

        paginator = Paginator(
            self.model.objects.all(),
            self.items_per_page
        )

        page = paginator.page(page)

        data = dict(
            page=page.number,
            pages=paginator.num_pages,
            items=get_template(
                'inspire_items.html'
            ).render(
                dict(inspire_list=page.object_list)
            )
        )
        return JsonResponse(data=data)
