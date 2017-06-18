# Test

> Front-end test for Red Ventures

[Final Result](http://henriquemelanda.com.br/test-rv)

> Project Requirements

* NodeJS
* Gulp
* SASS
* Javascript / ES6

> Insalling Dependencies

* gulp install

> Work Directories

* HTML - src/
* SASS - src/sass
* JS - src/scripts
* Images - src/images
* Images Sprite - src/images/icons/*.png

> Work Directories

* All - build/

> Working with sprite

- Save your icon inside the folder /images/icons/ that it will be generated automatically while the gulp server is running.
- To place the icon in css use the code @include sprite($nombre-do-icone)

> Development Environment

* gulp server

- The sass and css files are concatenated to only one file.

> Production Environment

* gulp prod