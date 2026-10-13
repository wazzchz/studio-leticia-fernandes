@echo off
REM Dev: frontend (5173) + API (3333)
start "API - Studio LF" cmd /k "cd /d %~dp0server && npm run dev"
start "WEB - Studio LF" cmd /k "cd /d %~dp0 && npm run dev"
echo Frontend: http://localhost:5173  API: http://localhost:3333/api/health
