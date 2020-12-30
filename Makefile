.PHONY: shell
shell:
	docker-compose build && \
	docker-compose run --rm tweet-delete bash
