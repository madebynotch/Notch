# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0005_auto_20150715_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='date_completed',
            field=models.DateField(null=True, blank=True),
        ),
    ]
