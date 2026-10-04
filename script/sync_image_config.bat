@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem ============================================================
rem  按图片文件夹顺序，替换 dataConfig.json 的 imageDataConfig key
rem  - 只改 key 末尾文件名，value 不动
rem  - 图片比现有 key 多：补 83/{dataConfig所在文件夹名}/文件名 -> {"desc":""}
rem ============================================================

set "SCRIPT_DIR=%~dp0"
set "SCRIPT=%SCRIPT_DIR%sync_image_config.js"

if not exist "%SCRIPT%" (
  echo 找不到脚本: %SCRIPT%
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo 未找到 node，请先安装 Node.js。
  pause
  exit /b 1
)

set "IMAGE_DIR="
set "JSON_PATH="
if not "%~1"=="" set "IMAGE_DIR=%~1"
if not "%~2"=="" set "JSON_PATH=%~2"

if "%IMAGE_DIR%"=="" (
  echo.
  echo 请选择图片文件夹...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='选择图片文件夹'; $d.ShowNewFolderButton=$false; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$d.SelectedPath}"`) do set "IMAGE_DIR=%%I"
)

if "%IMAGE_DIR%"=="" (
  echo 已取消，未选择图片文件夹。
  pause
  exit /b 0
)

if "%JSON_PATH%"=="" (
  echo.
  echo 请选择 dataConfig.json...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $f=New-Object System.Windows.Forms.OpenFileDialog; $f.Filter='JSON (*.json)|*.json|All files (*.*)|*.*'; $f.Title='选择 dataConfig.json'; $f.InitialDirectory='E:\longzi\sites\taijiMini\client\src\pages'; if($f.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$f.FileName}"`) do set "JSON_PATH=%%I"
)

if "%JSON_PATH%"=="" (
  echo 已取消，未选择 JSON。
  pause
  exit /b 0
)

echo.
echo ========== 同步 imageDataConfig key ==========
echo 图片目录: %IMAGE_DIR%
echo JSON文件: %JSON_PATH%
echo.

node "%SCRIPT%" "%IMAGE_DIR%" "%JSON_PATH%"
set "EXITCODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXITCODE%
