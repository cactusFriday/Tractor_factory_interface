# Tractor Factory System Interface

### 1. Installation
#### 1.1 Initialize env
```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
#### 1.2 Set PostgreSQL

Inside settings.py:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
Change to:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db_name',
        'USER': 'dbms',
        'PASSWORD': 'db_password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```
After **create database db_name** and finally run:
```bash
./manage.py migrate
./manage.py makemigrations
```