from django.db import models
# from PIL import Image
# import sys, time
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class InspireItem(models.Model):
    DRIBBBLE = 'Dribbble'
    INSTAGRAM = 'Instagram'
    LAUNCH = 'Launch'
    CATEGORY = (
        (DRIBBBLE, 'Dribbble'),
        (INSTAGRAM, 'Instagram'),
        (LAUNCH, 'Launch'),
    )
    tag = models.CharField(max_length=25,
                           choices=CATEGORY)
    url = models.URLField()
    image = models.ImageField(upload_to='inspire', blank=True)
    resized_image = ImageSpecField(source='image',
                                   processors=[ResizeToFill(640, 900)],
                                   format='JPEG',
                                   options={'quality': 100},)
    title = models.CharField(max_length=150)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date_added']

    def __unicode__(self):
        return self.title
