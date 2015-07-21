from django.contrib import admin
from models import CaseStudy, CaseStudyImage, SubHeaderImage


class CaseStudyImageInline(admin.TabularInline):
    model = CaseStudyImage


class CaseStudySubHeaderImageInline(admin.TabularInline):
    model = SubHeaderImage


class CaseStudyAdmin(admin.ModelAdmin):
    inlines = [
        CaseStudyImageInline,
        CaseStudySubHeaderImageInline,
    ]
    list_display = [
        'id',
        'title',
        'subtitle',
        'date_added',
    ]


admin.site.register(CaseStudy, CaseStudyAdmin)
