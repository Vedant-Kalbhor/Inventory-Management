cd server
npm run dev

cd client
npm run dev

cd ml-service
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000