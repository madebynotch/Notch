# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0010_auto_20150720_1808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='date_added',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
