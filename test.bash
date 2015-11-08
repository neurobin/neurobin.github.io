#!/bin/bash
shopt -s globstar
for file in *.php */**/*.php;do
echo "$file"
#[[ $file == "phpheadex.php" ]] && continue
sed -i.bak 's/require_once/include_once/g' "$file"
done
