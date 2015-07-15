from django.db import models

# Create your models here.

class CaseStudy(models.Model):
    tags = models.ManyToManyField('main.Tag', related_name='case_study_tags')
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    task_content = models.TextField()
    approach_content = models.TextField()
    project_link = models.URLField(blank=True)
    extension_text = models.TextField(blank=True)
    sub_header = models.CharField(max_length=25, blank=True)
    sub_header_content = models.TextField(blank=True)
    date_completed = models.DateField(blank=True, null=True)
    date_added = models.DateField(auto_now=True)

    def __unicode__(self):
        return self.title

    def get_next(self):
        ordered_case_studies = []
        for cs in CaseStudy.objects.all().order_by('-date_added'):
            ordered_case_studies.append(cs)

        current = ordered_case_studies.index(self)

        if current == 0:
            next_pk = ordered_case_studies[1].pk
        else:
            try:
                next_pk = ordered_case_studies[current+1].pk
            except:
                next_pk = None

        return next_pk

    def get_prev(self):
        ordered_case_studies = []
        for cs in CaseStudy.objects.all().order_by('-date_added'):
            ordered_case_studies.append(cs)

        current = ordered_case_studies.index(self)

        if current == 0:
            prev_pk = None
        else:
            try:
                prev_pk = ordered_case_studies[current-1].pk
            except:
                prev_pk = None

        return prev_pk

class CaseStudyImage(models.Model):
    case_study = models.ForeignKey(CaseStudy, related_name='images')
    image = models.ImageField(upload_to='case_studies')
    # description = models.TextField()
    is_sub_header = models.BooleanField()
    is_showcase = models.BooleanField()

    def __unicode__(self):
        return self.case_study.title+" : "+self.image.url
