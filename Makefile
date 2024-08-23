start:
	docker-compose up --build

test:
	cd frontend && npm test
	cd ../backend && pytest
