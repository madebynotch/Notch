# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InspireItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.URLField()),
                ('image', models.ImageField(upload_to=b'/uploads/inspire/')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('date_added', models.DateField(auto_now=True)),
                ('tag', models.ForeignKey(related_name='inspire_tags', to='main.Tag')),
            ],
        ),
    ]
