install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js' $(file) $(file2)

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run
