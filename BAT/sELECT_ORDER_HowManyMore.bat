@echo off
setlocal enabledelayedexpansion

set "folderPath=%~dp0"

for /R "%folderPath%" %%F in ("*.*") do (
    if /I not "%%~xF"==".bat" (
        for /f "delims=" %%I in ('dir /b /od "%%~nF*%%~xF"') do set "latestFile=%%I"
        for %%O in ("%%~nF*%%~xF") do (
            if not "%%O"=="!latestFile!" (
                echo Deleting: %%O
                del "%%O"
            )
        )
    )
)

endlocal
pause