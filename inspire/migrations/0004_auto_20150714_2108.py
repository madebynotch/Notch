# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0003_auto_20150714_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='image',
            field=models.ImageField(upload_to=b'/inspire/'),
        ),
    ]
