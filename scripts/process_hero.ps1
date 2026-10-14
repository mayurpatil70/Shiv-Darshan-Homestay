Add-Type -AssemblyName System.Drawing

$srcPath = "d:\ShivDarshan-homestay\src\assets\images\client\adi-kailash-trek3.jpg"
$destPath = "d:\ShivDarshan-homestay\src\assets\images\client\adi-kailash-temple-landscape-hd.jpg"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = 2360
$h = 1130

$dest = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()

# Save with high JPEG quality (95%)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$dest.Save($destPath, $codec, $encoderParams)
$dest.Dispose()
$src.Dispose()

Write-Output "Successfully saved upscaled image: $destPath"
Get-Item $destPath | Select-Object Name, Length
