install:
	npm ci

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

testUnit:
	node bin/gendiff __fixtures__/testfile1.json __fixtures__/testfile2.json

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	cross-env NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
