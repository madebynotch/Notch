# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations

def migrate_blog_tags(apps, schema_editor):
    BlogTag = apps.get_model("inspire", "BlogTag")
    InspireItem = apps.get_model("inspire", "InspireItem")

    for inspire_item in InspireItem.objects.all():
        if inspire_item.tag_old:
            matching_blog_tag, created = BlogTag.objects.get_or_create(
                name=inspire_item.tag_old
            )
            inspire_item.tag = matching_blog_tag
            inspire_item.save()

class Migration(migrations.Migration):

    dependencies = [
        ('inspire', '0012_inspireitem_tag'),
    ]

    operations = [
        migrations.RunPython(migrate_blog_tags)
    ]
