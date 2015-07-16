from django.contrib import admin
from models import ContactItem, Tag

# Register your models here.
class ContactItemAdmin(admin.ModelAdmin):
	pass

class TagAdmin(admin.ModelAdmin):
	pass

admin.site.register(ContactItem, ContactItemAdmin)
admin.site.register(Tag, TagAdmin)