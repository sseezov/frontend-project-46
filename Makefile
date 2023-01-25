install:
	npm ci

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

testUnit:
	node bin/gendiff __fixtures__/testfile1.json __fixtures__/testfile2.json

test:
	npx jest

test-coverage:
	npx jest --coverage
