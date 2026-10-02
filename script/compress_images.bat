@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem ============================================================
rem  双击即可用：脚本和依赖固定在本目录，不用复制到图片文件夹
rem  也不需要 npm -g 全局安装
rem ============================================================

set "SCRIPT_DIR=%~dp0"
set "SCRIPT=%SCRIPT_DIR%compress_images.js"

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

if not exist "%SCRIPT_DIR%node_modules\sharp" (
  echo 缺少依赖 sharp，正在安装到脚本目录...
  pushd "%SCRIPT_DIR%"
  call npm install --no-fund --no-audit
  popd
  if not exist "%SCRIPT_DIR%node_modules\sharp" (
    echo 依赖安装失败，请在 "%SCRIPT_DIR%" 手动执行: npm install
    pause
    exit /b 1
  )
)

set "TARGET="
if not "%~1"=="" set "TARGET=%~1"

if "%TARGET%"=="" (
  echo.
  echo 请选择要压缩的图片文件夹...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='选择要压缩的图片文件夹'; $d.ShowNewFolderButton=$false; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$d.SelectedPath}"`) do set "TARGET=%%I"
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
echo ========== 图片压缩 ==========
echo 目标目录: %TARGET%
echo 直接回车则使用默认值
echo.

set "MAX_KB="
set "MAX_ROUNDS="
set /p "MAX_KB=最大体积 KB [默认 160]: "
set /p "MAX_ROUNDS=最大压缩轮数 [默认 5，上限 5]: "

if "%MAX_KB%"=="" set "MAX_KB=160"
if "%MAX_ROUNDS%"=="" set "MAX_ROUNDS=5"

echo.
echo 将使用: max-kb=%MAX_KB%  max-rounds=%MAX_ROUNDS%
echo.

node "%SCRIPT%" "%TARGET%" --max-kb %MAX_KB% --max-rounds %MAX_ROUNDS%
set "EXITCODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXITCODE%
