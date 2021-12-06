## cd backend

npm install
npm run dev

make sure you have Redis running on your system. If that is a Mac and if there is Homebrew installed run: npm run start-redis

to test run: npm test

env variables
PORT=5002

CLIENT_APPLICATION_URL=http://localhost:3000
API_URL_BASE=https://blockchain.info

## cd frontend

npm install
npm start

to test: npm test

env variables:
REACT_APP_BASE_URL=http://localhost:5002

NOTES: I have implemented pagination opn frontend using the React Table pagination api, but in a real scenario I would implemnt pagination on backend.
I didn't use GraphQl because I didn't use it on daily basis yet so there is a small learning curve for me to get fully productive with GraphQl.

I could do the UI much better but that requires time. So I did the minimal possible for the UI.

To deploy I would put the frontend and backend in Docker and upload the container to S3 or so.
