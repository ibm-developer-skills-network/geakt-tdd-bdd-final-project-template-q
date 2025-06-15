.PHONY: all help install test lint start dev build clean

help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-\\.]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

all: help

install: ## Install Node.js dependencies
	$(info Installing dependencies...)
	npm install

test: ## Run the unit tests with coverage
	$(info Running tests...)
	npm test

test-watch: ## Run tests in watch mode
	$(info Running tests in watch mode...)
	npm run test:watch

bdd: ## Run BDD tests
	$(info Running BDD tests...)
	npm run bdd

lint: ## Run the linter
	$(info Running linting...)
	npm run lint

lint-fix: ## Run the linter and fix issues
	$(info Running linting with auto-fix...)
	npm run lint:fix

start: ## Start the production server
	$(info Starting production server...)
	npm start

dev: ## Start the development server
	$(info Starting development server...)
	npm run dev

build: ## Build a Docker image
	$(info Building Docker image...)
	docker build --rm --pull --tag products-js:1.0 . 

db-start: ## Start PostgreSQL in Docker
	$(info Starting PostgreSQL...)
	docker run -d --name postgres \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=postgres \
		-v postgres_data:/var/lib/postgresql/data \
		postgres:13-alpine

db-stop: ## Stop and remove PostgreSQL in Docker
	$(info Stopping and removing PostgreSQL...)
	-docker stop postgres
	-docker rm postgres

db-migrate: ## Run database migrations
	$(info Running database migrations...)
	npm run db:migrate

db-reset: ## Reset database
	$(info Resetting database...)
	npm run db:reset

clean: ## Clean node_modules and logs
	$(info Cleaning up...)
	rm -rf node_modules
	rm -rf coverage
	rm -rf reports
	rm -f *.log