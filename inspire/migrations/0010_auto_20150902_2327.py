# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0009_auto_20150722_1539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='tag',
            field=models.CharField(max_length=25, choices=[(b'Dribbble', b'Dribbble'), (b'Instagram', b'Instagram'), (b'Launch', b'Launch')]),
        ),
    ]
