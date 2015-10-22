# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0014_remove_inspireitem_tag_old'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inspireitem',
            options={'ordering': ['-date_added', '-id']},
        ),
    ]
