from django.db import models


class InspireItem(models.Model):
    DRIBBLE = 'Dribble'
    INSTAGRAM = 'Instagram'
    LAUNCH = 'Launch'
    CATEGORY = (
        (DRIBBLE, 'Dribble'),
        (INSTAGRAM, 'Instagram'),
        (LAUNCH, 'Launch'),
    )
    tag = models.CharField(max_length=25,
                           choices=CATEGORY)
    url = models.URLField()
    image = models.ImageField(upload_to='inspire', blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date_added']

    def __unicode__(self):
        return self.title
