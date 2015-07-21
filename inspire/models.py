from django.db import models


class InspireItem(models.Model):
    tag = models.ForeignKey('main.Tag', related_name='inspire_tags')
    url = models.URLField()
    image = models.ImageField(upload_to='inspire', blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

    def __unicode__(self):
        return self.title
