<p align="center"><img width="600" src="http://i.giphy.com/3o6gEf38BrzrRYbDXi.gif"></p>

> Um boilerplate desenvolvido para acelerar o desenvolvido de sites com [WordPress](https://br.wordpress.org) pelo time de desenvolvimento da [Pipoca Digital](http://www.pipocadigital.com.br/).


### O que usamos
- [Gulp](http://gulpjs.com/)
- [Jade](http://jade-lang.com/)
- [Sass](http://sass-lang.com/)
- [Bower](https://bower.io/)
- [BrowserSync](https://www.browsersync.io/)


### Instalação
Vamos instalar as dependencias de nosso projeto
- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)

```sh
# Clone o boilerplate
$ git clone https://github.com/pipocadigital/grao-de-milho
$ cd grao-de-milho

# Instala as dependencias
$ npm install
```

### Estrutura
```
├── README.md
├── bower.json
├── gulpfile.js
├── package.json
└── src
    ├── img
    │   └── {.jpg, .png, .svg, .gif, .ico}
    ├── js
    │   ├── .js
    ├── css
    │   ├── components
    │   │   └── _component-name.sass
    │   ├── elements
    │   │   └── _element-name.sass
    │   ├── pages
    │   │   └── page-name
    │   │       └── _.sass
    │   ├── settings
    │   │   ├── _base.sass
    │   │   ├── _colors.sass
    │   │   ├── _measures.sass
    │   │   └── _typography.sass
    │   ├── tools
    │   │   └── _mixins.sass
    │   └── main.sass
    ├── archive.jade
    ├── category.jade
    ├── examples.jade
    ├── footer.jade
    ├── functions.jade
    ├── header.jade
    ├── index.jade
    ├── page.jade
    ├── sidebar.jade
    └── single.jade
```

### Tasks do Gulp
- `gulp`: Task default que executa todas as tasks, inicia um server e ativa o `watch` que executa na alterações dos arquivos
- `gulp build`: Executa todas as tasks abaixo, preparando para fazer o deploy
- `gulp pages`: Compila os arquivos .jade
- `gulp styles`: Compila os arquivos .sass
- `gulp scripts`: Verifica a qualidade dos arquivos js e minifica
- `gulp images`: Minifica todas as imagens
- `gulp libs`: Concatena todos os arquivos de dependencia gerenciados pelo bower
- `gulp clean`: Limpa o /dist
