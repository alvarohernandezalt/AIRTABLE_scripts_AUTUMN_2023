@echo off
setlocal enabledelayedexpansion

set "folderPath=%~dp0"

for /R "%folderPath%" %%F in ("* (*)*.*") do (
    set "originalFile=%%~nF"
    set "originalFile=!originalFile:~0,-4!"

    if exist "!originalFile!.*" (
        set "latestDate="
        set "latestFile="

        for %%O in ("!originalFile!.*") do (
            for /f "delims=" %%I in ('dir /b /od "!originalFile!.*"') do set "latestFile=%%I"
            set "latestDate=%%~tO"
        )

        if not "%%F"=="!latestFile!" (
            echo Deleting: %%F
            del "%%F"
        )
    )
)

endlocal
pause