# Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Modular SCSS
1. Each component in angular has its own SCSS file and the encapsulation is mentioned as ViewEncapsulation.Emulated which means that each scss file is local to the component.
2. There are two global scss files variable.scss and singleton.scss. variable.scss has variables which are added to body and can be used throught the application without specifically importing the file.
singleton.scss has some common global color classes.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

