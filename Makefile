dev:
	docker-compose -f dc-base.yml -f dc-dev.yml build
	docker-compose -f dc-base.yml -f dc-dev.yml up -d

prev:
	docker-compose -f dc-base.yml -f dc-prev.yml build
	docker-compose -f dc-base.yml -f dc-prev.yml up -d

prod:
	docker-compose -f dc-base.yml -f dc-prev.yml -f dc-prod.yml build
	docker-compose -f dc-base.yml -f dc-prev.yml -f dc-prod.yml up -d

one-off:
	docker-compose \
		-f dc-base.yml -f dc-prev.yml -f dc-prod.yml -f dc-one-off.yml build
	docker-compose \
		-f dc-base.yml -f dc-prev.yml -f dc-prod.yml -f dc-one-off.yml up -d

clear:
	docker image rm svg24_api svg24_db svg24_nginx svg24_www

clear-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml down
	make clear

clear-prev:
	docker-compose -f dc-base.yml -f dc-prod.yml -f dc-prev.yml down
	make clear
