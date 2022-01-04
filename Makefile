ps:
	docker ps -a --format 'table {{.Status}}\t{{.Ports}}\t{{.Names}}'

dev:
	docker-compose -f dc-base.yml -f dc-dev.yml build
	docker-compose -f dc-base.yml -f dc-dev.yml up -d

rs-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml restart

clear-images:
	docker image rm platform_api platform_db platform_nginx platform_board

clear-output:
	rm -rf packages/api/dist
	rm -rf packages/assets/dist
	rm -rf packages/board/dist
	rm -rf packages/www/dist

clear-node:
	rm -rf node_modules
	rm -rf packages/api/node_modules
	rm -rf packages/assets/node_modules
	rm -rf packages/board/node_modules
	rm -rf packages/www/node_modules

clear-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml down
	make clear-images
	make clear-output
