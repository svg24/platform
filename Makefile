dev:
	docker-compose -f compose-base.yml -f compose-dev.yml build
	docker-compose -f compose-base.yml -f compose-dev.yml up -d

prod:
	docker-compose -f compose-base.yml -f compose-prod.yml build
	docker-compose -f compose-base.yml -f compose-prod.yml up -d

rs:
	docker-compose -f compose-base.yml -f compose-prod.yml restart

clear:
	docker-compose -f compose-base.yml -f compose-dev.yml down
	docker image rm svg24_api svg24_db svg24_nginx svg24_www
