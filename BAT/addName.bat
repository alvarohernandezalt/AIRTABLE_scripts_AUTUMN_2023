@echo off
set /p name="Enter a name to append to all folders: "
for /d %%A in (*) do ren "%%A" "%name% - %%A"