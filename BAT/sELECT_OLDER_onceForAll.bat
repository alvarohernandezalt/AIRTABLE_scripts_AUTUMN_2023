@echo off
setlocal enabledelayedexpansion

set "folderPath=%~dp0"

for /R "%folderPath%" %%F in ("* (*)*.*") do (
    set "originalFile=%%~dpnF"
    set "originalFile=!originalFile: (1)=!"

    if exist "!originalFile!.*" (
        set "latestDate="
        set "latestFile="

        for /f "delims=" %%I in ('dir /b /od "!originalFile!.*" "%%F"') do set "latestFile=%%I"

        for %%O in ("!originalFile!.*" "%%F") do (
            if not "%%O"=="!latestFile!" (
                echo Deleting: %%O
                del "%%O"
            )
        )
    )
)

endlocal
pause