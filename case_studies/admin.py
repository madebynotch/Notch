from django.contrib import admin
from models import CaseStudy, CaseStudyImage


class CaseStudyImageInline(admin.TabularInline):
    model = CaseStudyImage


class CaseStudyAdmin(admin.ModelAdmin):
    inlines = [
        CaseStudyImageInline,
    ]
    list_display = [
        'id',
        'title',
        'subtitle',
        'date_added',
    ]


admin.site.register(CaseStudy, CaseStudyAdmin)
