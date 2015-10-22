# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0008_casestudy_is_visible'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 20, 18, 8, 30, 836398)),
        ),
    ]
