# Nottes frontend

Nottes is a web app where you can save text notes, links and files. It's easy to use and Open Source. 

Backend is built with Symfony 4 and the Frontend with Angular 5.

## Screenshots

<img src="https://raw.githubusercontent.com/viher3/nottes-frontend/master/screenshots/nottes_1.png" width="150">
<img src="https://raw.githubusercontent.com/viher3/nottes-frontend/master/screenshots/nottes_2.png" width="150">
<img src="https://raw.githubusercontent.com/viher3/nottes-frontend/master/screenshots/nottes_3.png" width="150">

## Features

Version 1 features:

- [x] Create a notte entity
- [x] Encrypt / decrypt nottte entities using [php-encryption](https://github.com/defuse/php-encryption) library
- [x] Upload file/s
- [x] Simple search for entities

Comming soon features:

- [ ] User management
- [ ] User roles management
- [ ] Categories management

## Build

Run `ng build --prod --extract-css false` to build the project. The build artifacts will be stored in the `dist/` directory.

## Configuration

After building the project, you have to edit the config file updating your API endpoint.

Production config file is located here:

`dist/assets/config/config.prod.json`

## LICENSE

Nottes is released under the MIT Licence. See the LICENSE file for details.