@echo off
setlocal enabledelayedexpansion

set "folderPath=%~dp0"

for %%F in ("%folderPath%* (1).*") do (
    set "originalFile=%%~dpnF"
    set "originalFile=!originalFile: (1)=!"

    if exist "!originalFile!.*" (
        set "originalDate="
        set "duplicateDate="

        for %%O in ("!originalFile!.*") do (
            set "originalDate=%%~tO"
        )

        for %%D in ("%%F") do (
            set "duplicateDate=%%~tD"
        )

        if !originalDate! gtr !duplicateDate! (
            echo Deleting: %%F
            del "%%F"
        ) else (
            echo Deleting: !originalFile!.*
            del "!originalFile!.*"
        )
    )
)

endlocal
pause