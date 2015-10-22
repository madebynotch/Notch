# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0006_auto_20150715_2156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='date_added',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='casestudy',
            name='date_completed',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
