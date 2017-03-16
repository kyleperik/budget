from setuptools import setup

setup(
    name='budget',
    version='1.0',
    long_description=__doc__,
    packages=['budget'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask',
        'flask-sqlalchemy',
        'pymysql',
    ]
)
