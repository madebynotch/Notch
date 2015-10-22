import datetime
from django.core.mail import send_mass_mail
from django.db import models
from django.template.loader import get_template


class ContactRecipient(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    active = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name + " : " + self.email


class ContactItem(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    content = models.TextField()
    date_added = models.DateTimeField(auto_now=True)
    date_sent = models.DateTimeField(blank=True, null=True)
    done = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name + " : " + self.email + " : " + self.date_sent.__str__()

    def send_email(self):
        recipients = ContactRecipient.objects.filter(
            active=True
        ).values_list('email', flat=True)
        template = get_template('email/contact.html')

        if len(recipients) == 0:
            return

        context = dict(
            contact=self
        )
        message = template.render(context)

        try:
            send_mass_mail((
                (
                    'A new contact request from %s' % self.name,
                    message,
                    'contact@madebynotch.com',
                    list(recipients)
                ),
            ))
        except:
            print 'Error sending email'
        else:
            self.date_sent = datetime.datetime.now()
            self.save()


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name
