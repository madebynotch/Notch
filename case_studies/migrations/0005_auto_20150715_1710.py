# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0004_auto_20150714_2108'),
    ]

    operations = [
        migrations.RenameField(
            model_name='casestudyimage',
            old_name='is_final_product',
            new_name='is_sub_header',
        ),
        migrations.RemoveField(
            model_name='casestudyimage',
            name='description',
        ),
        migrations.AddField(
            model_name='casestudy',
            name='extension_text',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='casestudyimage',
            name='image',
            field=models.ImageField(upload_to=b'case_studies'),
        ),
    ]
