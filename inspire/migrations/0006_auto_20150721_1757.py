# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0005_auto_20150715_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='date_added',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='inspireitem',
            name='image',
            field=models.ImageField(upload_to=b'inspire', blank=True),
        ),
    ]
