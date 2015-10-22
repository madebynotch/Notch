# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0012_auto_20150720_1832'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubHeaderImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'case_studies')),
                ('case_study', models.ForeignKey(related_name='sub_header_images', to='case_studies.CaseStudy')),
            ],
        ),
        migrations.RemoveField(
            model_name='casestudyimage',
            name='is_sub_header',
        ),
    ]
