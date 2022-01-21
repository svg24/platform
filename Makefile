DC = docker-compose
DC_BASE = -f dc-base.yml
DC_DEV = $(DC_BASE) -f dc-dev.yml
DC_PREVIEW = $(DC_BASE) -f dc-preview.yml
DC_PROD = $(DC_PREVIEW) -f dc-prod.yml

ps:
	docker ps --format 'table {{.Status}}\t{{.Names}}' -a

dev:
	$(DC) $(DC_DEV) build
	$(DC) $(DC_DEV) up -d

preview:
	$(DC) $(DC_PREVIEW) build
	$(DC) $(DC_PREVIEW) up -d

prod:
	$(DC) $(DC_PROD) build
	$(DC) $(DC_PROD) up -d

rs-dev:
	$(DC) $(DC_DEV) restart

rs-nginx:
	$(DC) $(DC_BASE) restart nginx

clear-images:
	docker image rm \
		platform_api \
		platform_assets \
		platform_board \
		platform_db \
		platform_nginx \
		platform_root \
		platform_www

clear-output:
	rm -rf packages/api/dist
	rm -rf packages/assets/dist
	rm -rf packages/board/dist
	rm -rf packages/collection/dist
	rm -rf packages/www/dist

clear-node:
	rm -rf node_modules
	rm -rf packages/api/node_modules
	rm -rf packages/assets/node_modules
	rm -rf packages/board/node_modules
	rm -rf packages/collection/node_modules
	rm -rf packages/www/node_modules

clear-dev:
	$(DC) $(DC_DEV) down

clear-preview:
	$(DC) $(DC_PREVIEW) down

staging-certbot:
	bash scripts/certbot.sh staging

force-certbot:
	bash scripts/certbot.sh force

renew-certbot:
	bash scripts/certbot.sh renew
