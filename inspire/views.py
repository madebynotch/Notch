from django.core.paginator import Paginator
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.list import ListView
from inspire.models import InspireItem


class InspireView(ListView):
    context_object_name = 'inspire_list'
    model = InspireItem
    template_name = 'inspire.html'
    items_per_page = 1

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(InspireView, self).dispatch(request, *args, **kwargs)

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
            items=list(page.object_list.values())
        )
        return JsonResponse(data=data)
