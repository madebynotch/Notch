# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0007_auto_20150716_2118'),
    ]

    operations = [
        migrations.AddField(
            model_name='casestudy',
            name='is_visible',
            field=models.BooleanField(default=False),
        ),
    ]
