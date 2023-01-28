install:
	npm ci

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

testUnit:
	node bin/gendiff __fixtures__/file1.yml __fixtures__/file2.yml

test:
	npx jest

test-coverage:
	npx jest --coverage
