from django.db import models

# Create your models here.

class ContactItem(models.Model):
	name = models.CharField(max_length=50)
	email = models.EmailField()
	content = models.TextField()
	date_added = models.DateTimeField(auto_now=True)
	date_sent = models.DateTimeField()
	done = models.BooleanField(default=False)

	def __unicode__(self):
		return self.name +" : "+email+" : "+self.date_sent


class Tag(models.Model):
	name = models.CharField(max_length=50)

	def __unicode__(self):
		return self.name