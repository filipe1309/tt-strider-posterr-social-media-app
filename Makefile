up:
	@docker-compose up -d

down:
	@docker-compose down --remove-orphans

migrate-up:
	@docker exec -it t-posterr-social-media-app_app_1 yarn typeorm:win migration:run -d src/infrastructure/config/typeorm/data-source.ts

migrate-down:
	@docker exec -it t-posterr-social-media-app_app_1 yarn typeorm:win migration:revert -d src/infrastructure/config/typeorm/data-source.ts

tests:
	@docker exec -it t-posterr-social-media-app_app_1 yarn test
