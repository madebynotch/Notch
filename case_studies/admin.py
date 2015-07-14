from django.contrib import admin
from models import CaseStudy, CaseStudyImage

# Register your models here.
class CaseStudyAdmin(admin.ModelAdmin):
	pass

class CaseStudyImageAdmin(admin.ModelAdmin):
	pass

admin.site.register(CaseStudy, CaseStudyAdmin)
admin.site.register(CaseStudyImage, CaseStudyImageAdmin)