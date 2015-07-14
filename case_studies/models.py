from django.db import models

# Create your models here.

class CaseStudy(models.Model):
	tags = models.ManyToManyField('main.Tag', related_name='case_study_tags')
	title = models.CharField(max_length=50)
	subtitle = models.CharField(max_length=50)
	task_content = models.TextField()
	approach_content = models.TextField()
	project_link = models.URLField(blank=True)
	sub_header = models.CharField(max_length=25, blank=True)
	sub_header_content = models.TextField(blank=True)
	date_completed = models.DateField(blank=True)
	date_added = models.DateField(auto_now=True)

	def __unicode__(self):
		return self.title

class CaseStudyImage(models.Model):
	case_study = models.ForeignKey(CaseStudy, related_name='images')
	image = models.ImageField(upload_to='case_studies')
	description = models.TextField()
	is_final_product = models.BooleanField()
	is_showcase = models.BooleanField()

	def __unicode__(self):
		return self.case_study.title+" : "+str(self.pk)
