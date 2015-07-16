from django import forms
from main.models import ContactItem


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactItem
        fields = [
            'name',
            'email',
            'content'
        ]