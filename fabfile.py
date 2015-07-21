# -*- coding: utf-8 -*-
# Run with: fab -f nameoffile.py update
from __future__ import with_statement
import getpass
from fabric.api import *
from fabric.colors import red, green

env.hosts = ['50.116.4.76']
env.user = getpass.getuser()
env.port = 922


def update_dev():
    # Pull the latest updates from the repo.
    with cd('/opt/webapps/notch/project/'):
        print (green("Connected to %s..." % env.host))
        print (green("Pulling in updates (develop branch) from the Notch repo..."))
        run('git pull -u origin develop')
        run('pyenv activate notch')
        run('pip install -r requirements.txt')
        run('python manage.py migrate')
        run('npm install')
        run('node_modules/bower/bin/bower install')
        run('node node_modules/gulp/bin/gulp.js sass')
        run('python manage.py collectstatic --noinput')
        run('touch /tmp/notch.sock')
