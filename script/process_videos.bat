@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem ============================================================
rem  视频处理一体脚本（对应图片侧的 rename_and_compress.bat）
rem  1) 手动选择视频文件夹
rem  2) 基于 compress_videos.js 批量压缩 mp4/mov
rem ============================================================

set "SCRIPT_DIR=%~dp0"
set "SCRIPT=%SCRIPT_DIR%compress_videos.js"

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

where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo 未找到 ffmpeg，请先安装并加入 PATH。
  echo 例如: winget install Gyan.FFmpeg
  echo 或访问 https://ffmpeg.org/download.html
  pause
  exit /b 1
)

set "TARGET="
if not "%~1"=="" set "TARGET=%~1"

if "%TARGET%"=="" (
  echo.
  echo 请选择要处理的视频文件夹...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='选择要压缩的视频文件夹'; $d.ShowNewFolderButton=$false; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$d.SelectedPath}"`) do set "TARGET=%%I"
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
echo ========== 视频压缩 ==========
echo 目标目录: %TARGET%
echo 直接回车则使用默认值
echo.

set "MAX_MB="
set "MAX_ROUNDS="
set /p "MAX_MB=最大体积 MB [默认 15]: "
set /p "MAX_ROUNDS=最大压缩轮数 [默认 5，上限 5]: "

if "%MAX_MB%"=="" set "MAX_MB=15"
if "%MAX_ROUNDS%"=="" set "MAX_ROUNDS=5"

echo.
echo ---------- 压缩视频 ----------
echo 将使用: max-mb=%MAX_MB%  max-rounds=%MAX_ROUNDS%
echo.
node "%SCRIPT%" "%TARGET%" --max-mb %MAX_MB% --max-rounds %MAX_ROUNDS%
set "EXITCODE=%ERRORLEVEL%"
echo.
echo 全部完成。
pause
exit /b %EXITCODE%
