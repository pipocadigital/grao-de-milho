<p align="center"><img width="480" src="http://i.giphy.com/3o6gEf38BrzrRYbDXi.gif"></p>

An initiative of [Pipoca Digital](http://www.pipocadigital.com.br) to help those people who want to create Static or WordPress websites easily.

## Table of contents

- [Highlights](#highlights)
- [Getting started](#getting-started)
- [Technologies](#technologies)
- [Structure](#structure)
- [How it works?](#how-it-works)
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
- [Bower](https://bower.io/#install-bower)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally)

```bash
# Clone it:
$ git clone git@github.com:pipocadigital/grao-de-milho.git my-project-name

# Then, go to the project's folder:
$ cd my-project-name

# Install your dependencies:
$ npm install

# Install the application’s dependencies:
$ bower install
```

Now, open your `gulpfile.js` and set the project type.

1. `default`: You’ll work on a Front-end project. Gulp will create a `www` folder on your project’s root.
2. `wordpress`: (Default) You’ll work on a WordPress project. Gulp will create a `wordpress` folder on your project’s root.
When you run the commands below, the WordPress structure will be created, your theme will be named with your project name, etc.

If you wanna more, you can also set it first as `default`, create all your front-end and then, change it to `wordpress`. It will works fine as well.

```bash
# Set your project name
$ gulp init —p “My project”

# If you're trying to work on a WordPress project, run:
$ gulp wp

# Then, run!
$ gulp
```

Wait a few, and the last command will run a development server at `http://localhost:3000/`. It will open a new tab on your browser.

### Technologies

- NodeJS
- Gulp
- JS (ES6)
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

### How it works?

Coming soon.


### Tasks

##### Featured...
1. `gulp`:
	- Runs `gulp build`;
	- Creates a watcher;
	- Creates a webserver and open your brower;
2. `gulp init --p "Your project name"`: Renames the project;
3. `gulp wp`: Alias for `gulp wp-install`
4. `gulp build`: Run all the tasks below, except `wp-install and wp-build`.

##### More...
1. `gulp clean`: Remove all the files from generated directory;
2. `gulp fonts`: Copy `fonts/` from source to generated directory;
3. `gulp images`: Copy `images/` from source to generated directory;
4. `gulp libs`: Get dependencies from brower, concat inside a only file and paste into the generated `scripts
` directory;
5. `gulp pages`: Copy all `.php` files from source to generated directory;
6. `gulp scripts`: Check the quality of all `.js` files, apply babel2015 presets and copy the `js/` files from source to generated directory;
7. `gulp styles`: Copy `styles/` from source to generated directory;
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
