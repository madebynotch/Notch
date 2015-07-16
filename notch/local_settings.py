import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'notch',
        'USER': 'notch',
        'PASSWORD': 'cT3mhM5O0dK2ldYW',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, '../static/')


