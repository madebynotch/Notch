from django.contrib import admin
from models import InspireItem, BlogTag

class BlogTagAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name'
    ]


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
admin.site.register(BlogTag, BlogTagAdmin)
