# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0011_auto_20151013_1807'),
    ]

    operations = [
        migrations.AddField(
            model_name='inspireitem',
            name='tag',
            field=models.ForeignKey(to='inspire.BlogTag', null=True),
        ),
    ]
