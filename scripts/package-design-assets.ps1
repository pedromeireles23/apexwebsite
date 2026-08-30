param(
  [string]$SourceDirectory = "design-assets",
  [string]$OutputDirectory = "backups"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $projectRoot $SourceDirectory
$outputPath = Join-Path $projectRoot $OutputDirectory

if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
  throw "Diretorio de arquivos mestres nao encontrado: $sourcePath"
}

New-Item -ItemType Directory -Path $outputPath -Force | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archivePath = Join-Path $outputPath "apex-design-assets-$timestamp.zip"
$manifestPath = Join-Path $outputPath "apex-design-assets-$timestamp.sha256.csv"

$sourceFiles = Get-ChildItem -LiteralPath $sourcePath -Recurse -File | Sort-Object FullName

$manifest = foreach ($file in $sourceFiles) {
  $relativePath = $file.FullName.Substring($sourcePath.Length).TrimStart([char[]]"\/")
  $hash = Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256

  [pscustomobject]@{
    Path = $relativePath
    Bytes = $file.Length
    SHA256 = $hash.Hash.ToLowerInvariant()
  }
}

$manifest | Export-Csv -LiteralPath $manifestPath -NoTypeInformation -Encoding UTF8
Compress-Archive -Path (Join-Path $sourcePath "*") -DestinationPath $archivePath -CompressionLevel Optimal

$archiveHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()

[pscustomobject]@{
  Archive = $archivePath
  Manifest = $manifestPath
  Files = $sourceFiles.Count
  Bytes = ($sourceFiles | Measure-Object Length -Sum).Sum
  ArchiveBytes = (Get-Item -LiteralPath $archivePath).Length
  ArchiveSHA256 = $archiveHash
}
