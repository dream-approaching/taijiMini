@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem ============================================================
rem  双击即可：选择图片文件夹后按规则批量改名
rem  规则与 name.py 一致：去空格，保留主文件名最后 6 位 + 原扩展名
rem ============================================================

set "SCRIPT_DIR=%~dp0"
set "TARGET="
if not "%~1"=="" set "TARGET=%~1"

if "%TARGET%"=="" (
  echo.
  echo 请选择要改名的图片文件夹...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='选择要改名的图片文件夹'; $d.ShowNewFolderButton=$false; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$d.SelectedPath}"`) do set "TARGET=%%I"
)

if "%TARGET%"=="" (
  echo 已取消，未选择文件夹。
  pause
  exit /b 0
)

if not exist "%TARGET%\" (
  echo 目录不存在: %TARGET%
  pause
  exit /b 1
)

echo.
echo ========== 批量改名 ==========
echo 目标目录: %TARGET%
echo.

call "%SCRIPT_DIR%rename_files.bat" "%TARGET%"
set "EXITCODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXITCODE%
