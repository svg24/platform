ps:
	docker ps -a --format 'table {{.Status}}\t{{.Ports}}\t{{.Names}}'

dev:
	docker-compose -f dc-base.yml -f dc-dev.yml build
	docker-compose -f dc-base.yml -f dc-dev.yml up -d

preview:
	docker-compose -f dc-base.yml -f dc-preview.yml build
	docker-compose -f dc-base.yml -f dc-preview.yml up -d

prod:
	docker-compose -f dc-base.yml -f dc-preview.yml -f dc-prod.yml build
	docker-compose -f dc-base.yml -f dc-preview.yml -f dc-prod.yml up -d

rs-dev:
	docker-compose -f dc-base.yml -f dc-dev.yml restart

rs-nginx:
	docker-compose -f dc-base.yml kill -s SIGHUP nginx

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
	docker-compose -f dc-base.yml -f dc-dev.yml down

clear-preview:
	docker-compose -f dc-base.yml -f dc-preview.yml down

staging-certbot:
	docker-compose \
		-f dc-base.yml \
		-f dc-preview.yml \
		-f dc-prod.yml \
		run certbot certonly \
			--agree-tos \
			--email vanyauhalin@gmail.com \
			--no-eff-email \
			--staging \
			--webroot \
			--webroot-path=/var/www/certbot \
			-d svg24.dev \
			-d api.svg24.dev \
			-d assets.svg24.dev \
			-d board.svg24.dev \
			-d www.svg24.dev
	make rs-nginx

force-certbot:
	docker-compose \
		-f dc-base.yml \
		-f dc-preview.yml \
		-f dc-prod.yml \
		run certbot certonly \
			--agree-tos \
			--email vanyauhalin@gmail.com \
			--force-renewal \
			--no-eff-email \
			--webroot \
			--webroot-path=/var/www/certbot \
			-d svg24.dev \
			-d api.svg24.dev \
			-d assets.svg24.dev \
			-d board.svg24.dev \
			-d www.svg24.dev
	make rs-nginx

renew-certbot:
	docker-compose \
		-f dc-base.yml \
		-f dc-preview.yml \
		-f dc-prod.yml \
		run certbot renew --dry-run
	make rs-nginx
