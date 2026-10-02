@echo off
setlocal EnableDelayedExpansion

rem 内部改名逻辑：对指定文件夹内文件去空格，并截取 name[20:26]+扩展名
rem 用法: rename_files.bat "E:\某图片文件夹"

set "TARGET=%~1"
if "%TARGET%"=="" (
  echo 用法: rename_files.bat "文件夹路径"
  exit /b 1
)
if not exist "%TARGET%\" (
  echo 目录不存在: %TARGET%
  exit /b 1
)

pushd "%TARGET%" || exit /b 1

set "count=0"
for /f "delims=" %%F in ('dir /b /a-d 2^>nul') do (
  set "filename=%%F"
  set "ext=!filename:~-4!"
  set "last2=!filename:~-2!"

  rem 跳过脚本自身相关文件（与 name.py 跳过 py 类似）
  if /i not "!ext!"==".bat" if /i not "!ext!"==".js" if /i not "!last2!"=="py" if /i not "!ext!"=="json" (
    set "name=!filename: =!"
    set "newname=!name:~20,6!!name:~-4!"
    if not "!filename!"=="!newname!" if not "!newname!"=="" (
      if not exist "!newname!" (
        ren "%%F" "!newname!"
        set /a count+=1
        echo [改名] %%F -^> !newname!
      ) else (
        echo [跳过] %%F -^> !newname! 已存在
      )
    )
  )
)

echo 改名完成，共处理 !count! 个文件
popd
exit /b 0
