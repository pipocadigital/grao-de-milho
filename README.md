<p align="center"><img src="http://upload-gifs.s3-sa-east-1.amazonaws.com/e3ea1527-cb01-4727-b3e3-2d52169b6e44_grao-de-milho.jpg"></p>

An initiative of [Pipoca Digital](http://www.pipocadigital.com.br) to help those people who want to create WordPress websites easily.

## Table of contents

- [Getting started](#getting-started)
- [Technologies](#technologies)
- [Structure](#structure)
- [License](#license)

### Getting started
First of all, make sure you have installed the main dependencies:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

```bash
# Clone it:
$ git clone git@github.com:pipocadigital/grao-de-milho.git my-project-folder

# Then, go to the project's folder:
$ cd my-project-folder

# Install your dependencies and Init a new project by running:
$ npm start --name "My cool project name"
```

#### Dev

```
$ npm run wp:dev
```

2. Download WordPress inside a folder called `wordpress/`
3. Copy your files to the correct place.
4. Generate your theme based on your compiled files.
5. After all it will open a new tab on your browser running a development server.

To keep working on your WordPress project whithout donwload it everytime, just run:

```
$ npm run serve
```

#### Production

```
$ npm run wp:build
```

1. Download WordPress inside a folder called `wordpress/`
2. Copy your files to the correct place.
3. Generate your theme based on your compiled files.


### Technologies

- NodeJS
- Gulp
- JS (ES2015)
- Sass
- HTML5
- WordPress


### Structure

If everything from the Getting Started section goes well, you should have this:

```
├── gulpfile.js
├── bower.json
├── package.json
├── README.md
├── wordpress
└── src
    ├── js
    │   ├── *.js
    ├── images
    │   └── {.jpg, .png, .svg, .gif, .ico}
    ├── css
    │   ├── components
    │   │   └── _component-name.sass
    │   ├── elements
    │   │   └── _element-name.sass
    │   ├── pages
    │   │   └── page-name
    │   │       └── *.sass
    │   ├── settings
    │   │   ├── _base.sass
    │   │   ├── _colors.sass
    │   │   ├── _measures.sass
    │   │   └── _typography.sass
    │   ├── tools
    │   │   └── _mixins.sass
    │   └── main.sass
    ├── 404.php
    ├── footer.php
    ├── functions.php
    ├── header.php
    ├── index.php
    ├── page.php
    ├── search.php
    └── style.css
```


### License

Grão de Milho is distributed under the MIT License
