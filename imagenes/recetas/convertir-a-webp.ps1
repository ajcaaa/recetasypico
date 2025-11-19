# Convertir todos los archivos JPG/JPEG a WEBP con cwebp

# Carpeta actual
$imagenes = Get-ChildItem -Include *.jpg, *.jpeg -File -Recurse

foreach ($img in $imagenes) {
    $input = $img.FullName
    $output = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")

    Write-Host "Convirtiendo: $input -> $output"

    # Ejecutar cwebp con comillas para evitar problemas con espacios
    cwebp "`"$input`"" -o "`"$output`""
}
