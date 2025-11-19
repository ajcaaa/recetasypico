@echo off
cd imagenes\recetas\
for %%f in (*.jpg *.jpeg *.png) do (
    cwebp -q 85 "%%f" -o "%%~nf.webp"
)
echo Conversion completed!