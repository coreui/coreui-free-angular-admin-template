# CoreUI Free Angular 2+ Admin Template [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?text=CoreUI%20-%20Free%20Angular%20Admin%20Template%20&url=https://coreui.io/angular/&hashtags=bootstrap,admin,template,dashboard,panel,free,angular,react,vue)

Please help us on [Product Hunt](https://www.producthunt.com/posts/coreui-open-source-bootstrap-4-admin-template-with-angular-2-react-js-vue-js-support) and [Designer News](https://www.designernews.co/stories/81127). Thanks in advance!

Curious why I decided to create CoreUI? Please read this article: [Jack of all trades, master of none. Why Bootstrap Admin Templates suck.](https://medium.com/@lukaszholeczek/jack-of-all-trades-master-of-none-5ea53ef8a1f#.7eqx1bcd8)

CoreUI is an Open Source Bootstrap Admin Template. But CoreUI is not just another Admin Template. It goes way beyond hitherto admin templates thanks to transparent code and file structure. And if that's not enough, let’s just add that CoreUI consists bunch of unique features and over 1000 high quality icons.

CoreUI is based on Bootstrap 4 and offers 6 versions: [HTML5 AJAX](https://github.com/coreui/free-bootstrap-admin-template-ajax), [HTML5](https://github.com/coreui/free-angular-admin-template), [Angular 2+](https://github.com/coreui/free-angular-admin-template), [React.js](https://github.com/coreui/free-react-admin-template) & [Vue.js](https://github.com/coreui/free-vue-admin-template), [.NET Core 2](https://github.com/coreui/free-dotnet-admin-template).

CoreUI is meant to be the UX game changer. Pure & transparent code is devoid of redundant components, so the app is light enough to offer ultimate user experience. This means mobile devices also, where the navigation is just as easy and intuitive as on a desktop or laptop. The CoreUI Layout API lets you customize your project for almost any device – be it Mobile, Web or WebApp – CoreUI covers them all!

## Table of Contents

* [Versions](#versions)
* [CoreUI Pro](#coreui-pro)
* [Installation](#installation)
* [Usage](#usage)
* [What's included](#whats-included)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [Versioning](#versioning)
* [Creators](#creators)
* [Community](#community)
* [Community Projects](#community-projects)
* [License](#license)
* [Support CoreUI Development](#support-coreui-development)

## Versions

* [CoreUI Free Bootstrap Admin Template (Ajax)](https://github.com/coreui/free-bootstrap-admin-template-ajax)
* [CoreUI Free Angular 2+ Admin Template](https://github.com/coreui/free-angular-admin-template)
* [CoreUI Free .NET Core 2 Admin Template](https://github.com/coreui/free-dotnet-admin-template)
* [CoreUI Free React.js Admin Template](https://github.com/coreui/free-react-admin-template)
* [CoreUI Free Vue.js Admin Template](https://github.com/coreui/free-vue-admin-template)

## CoreUI Pro

* 💪  [CoreUI Pro Bootstrap Admin Template](https://coreui.io/pro/)
* 💪  [CoreUI Pro Bootstrap Admin Template (Ajax)](https://coreui.io/pro/)
* 💪  [CoreUI Pro Angular Admin Template](https://coreui.io/pro/angular)
* 💪  [CoreUI Pro React Admin Template](https://coreui.io/pro/react)
* 💪  [CoreUI Pro Vue Admin Template](https://coreui.io/pro/vue)

## Installation

``` bash
# clone the repo
$ git clone https://github.com/coreui/free-angular-admin-template.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:4200
$ ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can configure the default HTTP host and port used by the development server with two command-line options :

```bash
ng serve --host 0.0.0.0 --port 4201
```

### Generating Components, Directives, Pipes and Services

You can use the `ng generate` (or just `ng g`) command to generate Angular components:

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
ng g component ./newer-cmp
# your component will be generated in src/app/newer-cmp
# if in the directory src/app you can also run
ng g component feature/new-cmp
# and your component will be generated in src/app/feature/new-cmp
```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`

angular-cli will add reference to `components`, `directives` and `pipes` automatically in the `app.module.ts`. If you need to add this references to another custom module, follow this steps:

 1. `ng g module new-module` to create a new module
 2.  call `ng g component new-module/new-component`

This should add the new `component`, `directive` or `pipe` reference to the `new-module` you've created.

```bash
# build for production with minification
$ ng build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
free-bootstrap-admin-template/
├── e2e/
├── src/
│   ├── app/
│   ├── assets/
│   ├── scss/
│   ├── vendors/
│   ├── ...
│   ├── index.html
│   └── ...
├── .angular-cli.json
├── package.json
├── ...
├── tsconfig.json
└── ...
```

## Documentation

The documentation for the CoreUI  Admin Template is hosted at our website [CoreUI for Angular](https://coreui.io/angular/)

## Contributing

Please read through our [contributing guidelines](https://github.com/coreui/free-angular-admin-template/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Editor preferences are available in the [editor config](https://github.com/coreui/free-angular-admin-template/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility,CoreUI Free Admin Template is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See [the Releases section of our project](https://github.com/coreui/free-angular-admin-template/releases) for changelogs for each release version.

## Creators

**Łukasz Holeczek**

* <https://twitter.com/lukaszholeczek>
* <https://github.com/mrholek>

**Andrzej Kopański**

* <https://github.com/xidedix>

## Community

Get updates on CoreUI's development and chat with the project maintainers and community members.

- Follow [@coreuikit on Twitter](https://twitter.com/coreuikit).
- Read and subscribe to [CoreUI Blog](https://coreui.ui/blog/).

### Community Projects

Some of projects created by community but not maintained by CoreUI team.

* [NuxtJS + Vue CoreUI](https://github.com/muhibbudins/nuxt-coreui)
* [Colmena](https://github.com/colmena/colmena)

## Copyright and license

copyright 2018 creativeLabs Łukasz Holeczek. Code released under [the MIT license](https://github.com/coreui/free-angular-admin-template/blob/master/LICENSE).
There is only one limitation you can't can’t re-distribute the CoreUI as stock. You can’t do this if you modify the CoreUI. In past we faced some problems with persons who tried to sell CoreUI based templates.

## Support CoreUI Development

CoreUI is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by donating on [PayPal](https://www.paypal.me/holeczek), buying [CoreUI Pro Version](https://coreui.io/pro) or buying one of our [premium admin templates](https://genesisui.com/?support=1).

As of now I am exploring the possibility of working on CoreUI fulltime - if you are a business that is building core products using CoreUI, I am also open to conversations regarding custom sponsorship / consulting arrangements. Get in touch on [Twitter](https://twitter.com/lukaszholeczek).
