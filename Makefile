install:
	npm ci

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

test:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

