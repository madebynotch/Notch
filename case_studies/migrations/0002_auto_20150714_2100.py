# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudyimage',
            name='image',
            field=models.ImageField(upload_to=b'/notch/uploads/case_studies/'),
        ),
    ]
