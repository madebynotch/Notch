# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0004_auto_20150714_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='image',
            field=models.ImageField(upload_to=b'inspire'),
        ),
    ]
