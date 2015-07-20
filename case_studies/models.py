from django.db import models
from datetime import datetime


class CaseStudy(models.Model):
    tags = models.ManyToManyField(
        'main.Tag',
        related_name='case_study_tags'
    )
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    task_content = models.TextField()
    approach_content = models.TextField()
    project_link = models.URLField(blank=True)
    extension_text = models.TextField(blank=True)
    sub_header = models.CharField(max_length=25, blank=True)
    sub_header_content = models.TextField(blank=True)
    date_completed = models.DateTimeField(blank=True, null=True)
    date_added = models.DateTimeField(default=datetime.now)
    date_added.editable = True
    is_visible = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title

    def get_main_images(self):
        return self.images.filter(is_sub_header=False)

    def get_sub_images(self):
        return self.images.filter(is_sub_header=True)

    def get_showcase(self):
        try:
            image = self.images.filter(is_showcase=True)[:1][0].image.url
        except IndexError:
            image = None
        return image

    def get_next_pk(self):
        try:
            next_pk = CaseStudy.objects.order_by('pk').filter(pk__gt=self.pk, is_visible=True)[:1][0].pk
        except (KeyError, IndexError):
            return None

        return next_pk

    def get_prev_pk(self):
        try:
            prev_pk = CaseStudy.objects.order_by('-pk').filter(pk__lt=self.pk, is_visible=True)[:1][0].pk
        except (KeyError, IndexError):
            return None

        return prev_pk


class CaseStudyImage(models.Model):
    case_study = models.ForeignKey(CaseStudy, related_name='images')
    image = models.ImageField(upload_to='case_studies')
    # description = models.TextField()
    is_sub_header = models.BooleanField()
    is_showcase = models.BooleanField()

    def __unicode__(self):
        return self.case_study.title+" : "+self.image.url
