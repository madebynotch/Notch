from django.contrib import admin
from models import CaseStudy, CaseStudyImage

# Register your models here.


class CaseStudyImageInline(admin.TabularInline):
	model = CaseStudyImage

class CaseStudyAdmin(admin.ModelAdmin):
	inlines = [
        CaseStudyImageInline,
    ]
    
admin.site.register(CaseStudy, CaseStudyAdmin)
# admin.site.register(CaseStudyImage, CaseStudyImageAdmin)