ps:
	docker ps -a --format 'table {{.Status}}\t{{.Ports}}\t{{.Names}}'

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

rs-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml restart

clear:
	docker image rm platform_api platform_db platform_nginx platform_board

clear-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml down
	make clear

clear-prev:
	docker-compose -f dc-base.yml -f dc-prod.yml -f dc-prev.yml down
	make clear
