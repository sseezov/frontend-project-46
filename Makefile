install:
	npm ci

test:
	npm test

run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json
