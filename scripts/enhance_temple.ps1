Add-Type -AssemblyName System.Drawing

$inputPath = "d:\ShivDarshan-homestay\src\assets\images\client\adi-kailash-temple-landscape-hd.jpg"
$outputPath = "d:\ShivDarshan-homestay\src\assets\images\client\adi-kailash-temple-hero-wide.jpg"

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $bmp.Width
$h = $bmp.Height

# Create output bitmap
$dest = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($dest)

# Color matrix for vibrant mountain tone: +8% contrast, deep sky, crisp snow
$cm = New-Object System.Drawing.Imaging.ColorMatrix
$cm.Matrix00 = 1.08  # Red scale
$cm.Matrix11 = 1.08  # Green scale
$cm.Matrix22 = 1.12  # Blue scale (enhances mountain sky and snow)
$cm.Matrix33 = 1.00  # Alpha
$cm.Matrix44 = 1.00

# Slight shadow crush to add rich depth
$cm.Matrix40 = -0.02
$cm.Matrix41 = -0.02
$cm.Matrix42 = -0.01

$attributes = New-Object System.Drawing.Imaging.ImageAttributes
$attributes.SetColorMatrix($cm, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$g.DrawImage($bmp, $rect, 0, 0, $w, $h, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
$g.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]96)

$dest.Save($outputPath, $codec, $encoderParams)
$dest.Dispose()
$bmp.Dispose()

Write-Output "Enhanced hero temple image written to $outputPath"
Get-Item $outputPath | Select-Object Name, Length
