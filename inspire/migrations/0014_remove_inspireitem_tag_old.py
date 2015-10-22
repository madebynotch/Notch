# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0013_auto_20151013_1808'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inspireitem',
            name='tag_old',
        ),
    ]
