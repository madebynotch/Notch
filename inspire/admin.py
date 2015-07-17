from django.contrib import admin
from models import InspireItem


class InspireItemAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'tag',
        'url',
        'image',
        'title',
        'date_added'
    ]


admin.site.register(InspireItem, InspireItemAdmin)
