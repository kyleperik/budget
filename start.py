from budget.app import app, db
import sys

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'initdb':
            print('initializing database...')
            app.app_context().push()
            db.create_all()
            print('done!')
        else:
            print('do `python start.py initdb` to create database')
    else:
        app.run(host='0.0.0.0')
