ps:
	docker ps -a --format 'table {{.Status}}\t{{.Ports}}\t{{.Names}}'

dev:
	docker-compose -f dc-base.yml -f dc-dev.yml build
	docker-compose -f dc-base.yml -f dc-dev.yml up -d

rs-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml restart

clear:
	docker image rm platform_api platform_db platform_nginx platform_board

clear-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml down
	make clear
