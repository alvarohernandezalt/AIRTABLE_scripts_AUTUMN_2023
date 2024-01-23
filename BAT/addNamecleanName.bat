@echo off
setlocal enabledelayedexpansion
set /p name="Enter a name to append to all folders: "
for /d %%A in (*) do (
    for /f "tokens=1,* delims=-" %%B in ("%%A") do (
        set "dir=%%B"
        set "rest=%%C"
        if "!dir:~0,1!!dir:~4,1!"=="()" (
            set "dir=!dir:~1,4! - !rest!"
        )
    )
    ren "%%A" "%name% - !dir!"
)