install:
	pip install -r requirements.txt
	cd frontend && npm install


start-backend:
	python3 manage.py runserver

start-frontend:
	cd frontend && npm run start

start:
	make start-backend & make start-frontend
