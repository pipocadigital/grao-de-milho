<p align="center"><img width="480" src="http://i.giphy.com/3o6gEf38BrzrRYbDXi.gif"></p>

An initiative of [Pipoca Digital](http://www.pipocadigital.com.br) to help those people who want to create Static or WordPress websites easily.

## Table of contents

- [Highlights](#highlights)
- [Getting started](#getting-started)
- [Technologies](#technologies)
- [Structure](#structure)
- [Tasks](#tasks)
- [License](#license)

### Highlights
- Simple
- Free
- Fast
- Easy for begginers
- Uses cool stuff such as JS, Sass and Gulp

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

We can create two types of projects. A Front-end (`front`) and a WordPress (`wp`) project.

#### Front-end Dev

```
$ npm run front:dev
```

1. Set the project format;
2. Generate your compiled files inside a folder called `www` and start your development server;
5. Open a new tab on your browser running a development server.

#### Front-end Deploy

```
$ npm run front:build
```

1. Set the project format;
2. Generate your compiled files inside a folder called `www`.

#### WordPress Dev

```
$ npm run wp:dev
```

1. Set the project format;
2. Download WordPress inside a folder called `wordpress/`
3. Copy your style.css, plugins, wp-configs.php files to the correct place.
4. Generate your theme based on your compiled files.
5. After all it will open a new tab on your browser running a development server.

To keep working on your WordPress project whithout donwload it everytime, just run:

```
$ npm run serve
```

#### WordPress Deploy

```
$ npm run wp:build
```

1. Set the project format;
2. Download WordPress inside a folder called `wordpress/`
3. Copy your style.css, plugins, wp-configs.php files to the correct place.
4. Generate your theme based on your compiled files.


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
├── www
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


### Gulp Tasks

If you're running gulp globally, so you can use all the tasks below:

##### Featured tasks...
1. `gulp`:
	- Runs `gulp build`;
	- Creates a watcher;
	- Creates a webserver and open your brower;
2. `gulp init --name "Your project name"`: Renames the project;
3. `gulp wp`: Alias for `gulp wp-install`
4. `gulp build`: Run all the tasks below, except `wp-install and wp-build`.

##### More tasks...
1. `gulp clean`: Remove all the files from generated directory;
2. `gulp fonts`: Copy `fonts/` from source to generated directory;
3. `gulp images`: Copy `images/` from source to generated directory;
4. `gulp libs`: Get dependencies from brower, concat inside a only file and paste into the generated `scripts
` directory;
5. `gulp pages`: Copy all `.php` files from source to generated directory;
6. `gulp scripts`: Check the quality of all `.js` files, apply babel2015 presets and copy the `js/` files from source to generated directory;
7. `gulp styles`: Copy `styles/` from source to generated directory;
7. `gulp set-format --name "Project type"`: Set the project format
8. `gulp wp-install`:
	- Checks if the project has a name;
	- It also checks if WordPress is already installed;
	- If you confirm, it installs the latest version of WordPress;
	- Runs `gulp wp-build`;

9. `gulp wp-build`:
	- Updates the DB configurations;
	- Updates the authentication unique keys;
	- Removes default themes from `wp-content/`;
	- Copy files from `plugins/` to `wp-content/plugins/`;

*Generated directory* could be: `www/` or `wordpress/`


### License
Grão de Milho is distributed under the [MIT License](#)
