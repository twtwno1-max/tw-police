# PowerShell script to add numbering to 學歷 and 經歷 sections in txt files

$files = Get-ChildItem -Path "data\台北市" -Recurse -Filter "*.txt"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content $file.FullName -Encoding UTF8
    $newContent = @()
    $inEducation = $false
    $inExperience = $false
    $counter = 1
    
    foreach ($line in $content) {
        if ($line -match "^學歷：$") {
            $newContent += $line
            $inEducation = $true
            $inExperience = $false
            $counter = 1
        }
        elseif ($line -match "^經歷：$") {
            $newContent += $line
            $inEducation = $false
            $inExperience = $true
            $counter = 1
        }
        elseif ($line -match "^(機關地址|連絡電話|ref url|photo|姓名|職稱|任職單位)：?") {
            $newContent += $line
            $inEducation = $false
            $inExperience = $false
        }
        elseif (($inEducation -or $inExperience) -and $line.Trim() -ne "" -and 
                -not ($line -match "^\s*$") -and 
                -not ($line -match "^(1. |2. |3. |4. |5. |6. |7.  |8. |9. |十、|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|9\.|10\.)")) {
            # Add numbering to non-empty lines that don't already have numbering
            $newContent += "$counter. $($line.Trim())"
            $counter++
        }
        else {
            $newContent += $line
        }
    }
    
    # Write back to file
    $newContent | Out-File $file.FullName -Encoding UTF8
    Write-Host "Updated: $($file.FullName)"
}

Write-Host "Completed processing all files"
