# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0006_auto_20150721_1757'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspireitem',
            name='tag',
            field=models.CharField(max_length=2, choices=[(b'DR', b'Dribble'), (b'IN', b'Instagram'), (b'LA', b'Launch')]),
        ),
    ]
