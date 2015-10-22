# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaseStudy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50)),
                ('subtitle', models.CharField(max_length=50)),
                ('task_content', models.TextField()),
                ('approach_content', models.TextField()),
                ('project_link', models.URLField(blank=True)),
                ('sub_header', models.CharField(max_length=25, blank=True)),
                ('sub_header_content', models.TextField(blank=True)),
                ('date_completed', models.DateField(blank=True)),
                ('date_added', models.DateField(auto_now=True)),
                ('tags', models.ManyToManyField(related_name='case_study_tags', to='main.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='CaseStudyImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'/uploads/case_studies/')),
                ('description', models.TextField()),
                ('is_final_product', models.BooleanField()),
                ('is_showcase', models.BooleanField()),
                ('case_study', models.ForeignKey(related_name='images', to='case_studies.CaseStudy')),
            ],
        ),
    ]
