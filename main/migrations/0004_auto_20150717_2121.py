# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_contactrecipients'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ContactRecipients',
            new_name='ContactRecipient',
        ),
    ]
