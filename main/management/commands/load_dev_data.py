import os
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Loads data for development environment'

    def handle(self, *args, **options):
        print 'Loading data from main/management/command/fixtures/dev_data.json'
        print os.path.dirname(os.path.realpath(__file__)) + 'fixtures/dev_data.json'
        call_command('loaddata', os.path.dirname(os.path.realpath(__file__)) + '/fixtures/dev_data.json')
        print 'Finished loading data'
