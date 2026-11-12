@echo off
setlocal
title Grimorio Herbal
where node.exe >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js. Instala Node.js para abrir el juego.
  pause
  exit /b 1
)
node.exe "%~dp0scripts\launch-game.mjs"
if errorlevel 1 (
  echo.
  echo No se pudo abrir el juego. Revisa el mensaje anterior.
  pause
)
