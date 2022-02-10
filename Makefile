run-with-proxy:
	docker network create nginx-proxy
	docker-compose -f ./devops/localhost/nginx-proxy/docker-compose.yml up -d
	docker-compose -f ./docker-compose.yml up -d --build
	@echo "Please, remember to add 'my.sbx.getritmo.com' to your hosts file!"
	@echo "You can copy the following line to your /etc/hosts:"
	@echo "127.0.0.1 my.sbx.getritmo.com"

stop-with-proxy:
	docker-compose -f ./docker-compose.yml down --remove-orphans --volumes
	docker-compose -f ./devops/localhost/nginx-proxy/docker-compose.yml down --remove-orphans --volumes
	docker network rm nginx-proxy
	@echo "Remember removing/commenting 'my.sbx.getritmo.com' from your hosts file!"

run-legacy:
	docker network create nginx-proxy
	docker-compose -f ./devops/localhost/nginx-proxy/docker-compose.yml up -d
	docker-compose -f ./docker-compose-legacy.yml up -d --build
	@echo "Please, remember to add 'my.sbx.getritmo.com' to your hosts file!"
	@echo "You can copy the following line to your /etc/hosts:"
	@echo "127.0.0.1 my.sbx.getritmo.com"

stop-legacy:
	docker-compose -f ./docker-compose-legacy.yml down --remove-orphans --volumes
	docker-compose -f ./devops/localhost/nginx-proxy/docker-compose.yml down --remove-orphans --volumes
	docker network rm nginx-proxy
	@echo "Remember removing/commenting 'my.sbx.getritmo.com' from your hosts file!"