from django.contrib import admin
from models import InspireItem

# Register your models here.
class InspireItemAdmin(admin.ModelAdmin):
	pass

admin.site.register(InspireItem, InspireItemAdmin)