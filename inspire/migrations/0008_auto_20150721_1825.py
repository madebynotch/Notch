# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0007_auto_20150721_1823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='tag',
            field=models.CharField(max_length=25, choices=[(b'Dribble', b'Dribble'), (b'Instagram', b'Instagram'), (b'Launch', b'Launch')]),
        ),
    ]
