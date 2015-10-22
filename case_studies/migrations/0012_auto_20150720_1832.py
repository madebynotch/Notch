# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0011_auto_20150720_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
