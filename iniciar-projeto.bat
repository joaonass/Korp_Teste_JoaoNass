@echo off

echo ==========================================
echo   Iniciando Sistema de Notas Fiscais
echo ==========================================

echo.
echo Iniciando Estoque API...
start "Estoque API" cmd /k "dotnet run --project Estoque.api"

echo.
echo Iniciando Nota Fiscal API...
start "Nota Fiscal API" cmd /k "dotnet run --project NotaFiscal.api"

echo.
echo Iniciando Angular...
start "Angular" cmd /k "cd korp-app && npm start"

echo.
echo Aguardando o Angular iniciar...
timeout /t 5 /nobreak > nul

echo.
echo Abrindo sistema...
start http://localhost:4200

echo.
echo Sistema iniciado!