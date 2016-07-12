#!/bin/sh

# Se existe pasta WordPress
file="wordpress"

# Verificando se tem WordPress instalado.
if [ -d "$file" ]
then
	echo '------------------------------------------------------------';
	echo 'Ops! Não foi possivel instalar o wordpress porque já existe.';
	echo '------------------------------------------------------------';
else
	echo '----------------------------------------';
	echo 'Inicializando instalação do wordpress...';
	echo '----------------------------------------';

	#Baixando versão mais recente do wp, descompactando.
	curl -O https://wordpress.org/latest.zip;
	unzip latest.zip -d ./;
	rm -rf latest.zip;
	cp -f wp-config.php cd wordpress;

	#Renomeando o arquivo package.json
	sed "s/grao-de-milho/projeto-pipoca/g" package.json > package2.json;
	rm -r package.json;
	sed "s/grao-de-milho2/projeto-pipoca/g" package2.json > package.json;
	rm -r package2.json;
	#Renomeando o arquivo bower.json
	sed "s/grao-de-milho/projeto-pipoca/g" bower.json > bower2.json;
	rm -r bower.json;
	sed "s/grao-de-milho2/projeto-pipoca/g" bower2.json > bower.json;
	rm -r bower2.json;

	echo '---------------------------------';
	echo 'Projeto instalado com sucesso!';
	echo '---------------------------------';

fi
