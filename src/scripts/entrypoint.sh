#!/bin/sh

while ! npx prisma migrate dev 2>&1; do
    echo "Makemigrations"
    sleep 3
done

echo "Fakedata and run app"
node ./src/helper/initdata.js
node ./node_modules/.bin/babel-node ./src/app.js

sleep 3

exec "$@"