# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0008_auto_20150721_1825'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inspireitem',
            options={'ordering': ['-date_added']},
        ),
    ]
