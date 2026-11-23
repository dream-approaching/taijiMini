@echo off
setlocal EnableExtensions
chcp 65001 >nul

rem ============================================================
rem  改名 + 压缩 + 同步 dataConfig 一体脚本
rem  1) 选择图片文件夹
rem  2) 按 name 规则批量改名（去空格，保留主文件名最后 6 位）
rem  3) 再按 compress 规则压缩 png/jpg
rem  4) 选择 dataConfig.json，按图片顺序同步 imageDataConfig key
rem ============================================================

set "SCRIPT_DIR=%~dp0"
set "SCRIPT=%SCRIPT_DIR%compress_images.js"
set "SYNC_SCRIPT=%SCRIPT_DIR%sync_image_config.js"

if not exist "%SCRIPT%" (
  echo 找不到脚本: %SCRIPT%
  pause
  exit /b 1
)

if not exist "%SYNC_SCRIPT%" (
  echo 找不到脚本: %SYNC_SCRIPT%
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
  echo 请选择要处理的图片文件夹...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='选择要改名、压缩并同步配置的图片文件夹'; $d.ShowNewFolderButton=$false; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$d.SelectedPath}"`) do set "TARGET=%%I"
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
echo ========== 改名 + 压缩 + 同步 ==========
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
echo ---------- 1/3 批量改名 ----------
call "%SCRIPT_DIR%rename_files.bat" "%TARGET%"
if errorlevel 1 (
  echo 改名失败，已中止。
  pause
  exit /b 1
)

echo.
echo ---------- 2/3 图片压缩 ----------
echo 将使用: max-kb=%MAX_KB%  max-rounds=%MAX_ROUNDS%
echo.
node "%SCRIPT%" "%TARGET%" --max-kb %MAX_KB% --max-rounds %MAX_ROUNDS%
if errorlevel 1 (
  echo 压缩失败，已中止。
  pause
  exit /b 1
)

echo.
echo ---------- 3/3 同步 dataConfig.json ----------
set "JSON_PATH="
if not "%~2"=="" set "JSON_PATH=%~2"

if "%JSON_PATH%"=="" (
  echo.
  echo 请选择 dataConfig.json...
  for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $f=New-Object System.Windows.Forms.OpenFileDialog; $f.Filter='JSON (*.json)|*.json|All files (*.*)|*.*'; $f.Title='选择 dataConfig.json'; $init=Join-Path '%SCRIPT_DIR%' '..\client\src\pages'; if(Test-Path $init){$f.InitialDirectory=(Resolve-Path $init).Path}; if($f.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){$f.FileName}"`) do set "JSON_PATH=%%I"
)

if "%JSON_PATH%"=="" (
  echo 已跳过同步（未选择 JSON）。
  echo.
  echo 改名与压缩已完成。
  pause
  exit /b 0
)

echo.
echo 图片目录: %TARGET%
echo JSON文件: %JSON_PATH%
echo.
node "%SYNC_SCRIPT%" "%TARGET%" "%JSON_PATH%"
set "EXITCODE=%ERRORLEVEL%"
echo.
echo 全部完成。
pause
exit /b %EXITCODE%
