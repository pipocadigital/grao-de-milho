 #!/bin/bash
 tput setaf 2;
echo "Installling bower dependencies...";
tput sgr0;
bower install;
tput setaf 2;
echo "installling composer dependencies...";
tput sgr0;
composer install;
tput setaf 2;
echo "Starting gulp build...";
tput sgr0;
gulp build;
