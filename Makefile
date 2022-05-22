up:
	@docker-compose up -d

migrate-up:
	@docker-compose run --rm app yarn typeorm:win migration:run -d src/infrastructure/config/typeorm/data-source.ts

migrate-down:
	@docker-compose run --rm app yarn typeorm:win migration:revert -d src/infrastructure/config/typeorm/data-source.ts

tests:
	@docker-compose run --rm app yarn test
