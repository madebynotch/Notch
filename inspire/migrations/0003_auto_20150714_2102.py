# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0002_auto_20150714_2100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='image',
            field=models.ImageField(upload_to=b'/uploads/inspire/'),
        ),
    ]
