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
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your Name', 'class': 'contact-input'}),
            'email': forms.TextInput(attrs={'placeholder': 'Email Address', 'class': 'contact-input'}),
            'content': forms.Textarea(attrs={'placeholder': 'Describe your project here. Keep it short and sweet, we can talk specifics later...', 'class': 'contact-input'}),
        }
