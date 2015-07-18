from django.contrib import admin
from main.models import ContactRecipient
from models import ContactItem, Tag


class ContactRecipientAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'email',
        'active'
    ]


class ContactItemAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'email',
        'date_added',
        'date_sent',
        'done'
    ]


class TagAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name'
    ]


admin.site.register(ContactRecipient, ContactRecipientAdmin)
admin.site.register(ContactItem, ContactItemAdmin)
admin.site.register(Tag, TagAdmin)
