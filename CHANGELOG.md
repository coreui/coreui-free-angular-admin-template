## [angular](./README.md) version `changelog`

###### `v2.2.4`
- refactor(colors): use 'DOCUMENT' of '@angular/common'
- refactor(default-layout): use 'DOCUMENT' of '@angular/common' #133 - thanks @damingerdai 
- refactor(main): add compiler option `preserveWhitespaces` #128 - thanks @ctaleck 
- refactor(routing): added URL 404 default #125 - thanks @slam24
- refactor(dropdowns): remove temp css fix
- refactor(_nav.ts): NavData interface add semicolons
- update: `@angular/animations` to `^7.2.1`
- update: `@angular/common` to `^7.2.1`
- update: `@angular/compiler` to `^7.2.1`
- update: `@angular/core` to `^7.2.1`
- update: `@angular/forms` to `^7.2.1`
- update: `@angular/http` to `^7.2.1`
- update: `@angular/platform-browser` to `^7.2.1`
- update: `@angular/platform-browser-dynamic` to `^7.2.1`
- update: `@angular/router` to `^7.2.1`
- update: `@coreui/angular` to `^2.2.4`
- update: `mutationobserver-shim` to `^0.3.3`
- update: `zone.js` to `^0.8.28`
- update: `@angular-devkit/build-angular` to `^0.12.2`
- update: `@angular/cli` to `^7.2.2`
- update: `@angular/compiler-cli` to `^7.2.1`
- update: `@angular/language-service` to `^7.2.1`
- update: `@types/jasmine` to `^3.3.7`
- update: `typescript` to `~3.2.4`

###### `v2.2.3`
- refactor(_nav.ts): add NavData interface
- update: `bootstrap` to `^4.2.1`
- update: `@coreui/angular` to `^2.2.3`
- update: `@coreui/coreui` to `^2.1.6`
- update: `@angular/animations` to `^7.2.0`
- update: `@angular/common` to `^7.2.0`
- update: `@angular/compiler` to `^7.2.0`
- update: `@angular/core` to `^7.2.0`
- update: `@angular/forms` to `^7.2.0`
- update: `@angular/http` to `^7.2.0`
- update: `@angular/platform-browser` to `^7.2.0`
- update: `@angular/platform-browser-dynamic` to `^7.2.0`
- update: `@angular/router` to `^7.2.0`
- update: `core-js` to `^2.6.2`
- update: `moment` to `^2.23.0`
- update: `ngx-bootstrap` to `^3.1.4`
- update: `ngx-perfect-scrollbar` to `^7.2.0`
- update: `zone.js` to `^0.8.27`
- update: `@angular-devkit/build-angular` to `^0.12.1`
- update: `@angular/cli` to `^7.2.1`
- update: `@angular/compiler-cli` to `^7.2.0`
- update: `@angular/language-service` to `^7.2.0`
- update: `@types/jasmine` to `^3.3.5`
- update: `@types/node` to `^10.12.18`
- update: `karma` to `^3.1.4`
- update: `protractor` to `^5.4.2`
- update: `tslint` to `^5.12.1`

###### `v2.2.1`
- fix(routes): add default routes
- fix(colors): class order for `bg-blue`
- refactor(dafault-layout): observer add `attributeFilter` prop & `disconnect()` 
- update: `@coreui/angular` to `2.2.1`
- update: `core-js` to `2.6.0`
- update: `@types/node` to `10.12.12`
- update: `@angular/cli` to `7.1.1`
- update: `@angular-devkit/build-angular` to `0.11.1`
- update: `@types/jasmine` to `3.3.1`

###### `v2.2.0`
- chore: update Angular to `^7.1.0` see: https://update.angular.io/
- update: `@angular/animations` to `^7.1.1`
- update: `@angular/common` to `^7.1.1`
- update: `@angular/compiler` to `^7.1.1`
- update: `@angular/core` to `^7.1.1`
- update: `@angular/forms` to `^7.1.1`
- update: `@angular/http` to `^7.1.1`
- update: `@angular/platform-browser` to `^7.1.1`
- update: `@angular/platform-browser-dynamic` to `^7.1.1`
- update: `@angular/router` to `^7.1.1`
- update: `@coreui/angular` to `^2.2.0`
- update: `ngx-perfect-scrollbar` to `^7.1.0`
- update: `tslib` to `^1.9.0`
- update: `@angular-devkit/build-angular` to `~0.11.0`
- update: `@angular/cli` to `^7.1.0`
- update: `@angular/compiler-cli` to `^7.1.1`
- update: `@angular/language-service` to `^7.1.1`
- update: `@types/jasmine` to `^3.3.0`
- update: `karma-jasmine` to `^2.0.1`
- update: `typescript` to `3.1.x`

###### `v2.1.0`
- feat: sidebar nav-link  `attributes` - optional JS object with valid JS API naming:
  - valid attributes: `rel`, `target`, `hidden`, `disabled`, etc...
  - item example (`_nav.ts`):
```
...
{
  name: 'Try CoreUI PRO',
  url: 'https://coreui.io/pro/react/',
  icon: 'cui-layers icons',
  variant: 'danger',
  attributes: { target: '_blank', rel: "noopener" },
},
...
```
- update: `@coreui/angular` to `2.1.0`
- update: `@coreui/coreui` to `^2.1.3`
- update: `ngx-bootstrap` to `^3.1.2`
- update: `@angular/cli` to `^6.2.8` 
- update: `@types/jasmine` to `^2.8.12`
- update: `@types/jasminewd2` to `^2.0.6`
- update: `@types/node` to `^10.12.11`
- update: `jasmine-core` to `^3.3.0`
- update: `karma` to `^3.1.3`
- update: `karma-jasmine-html-reporter` to `^1.4.0`


###### `v2.0.1`
- refactor(modals): buttons spacing
- refactor(brand-buttons): buttons spacing
- update: `@coreui/coreui` to `2.0.20`
- update: `@angular/*` to `6.1.10`
- update: `@angular/cli` to `6.2.6`
- update: `chart.js` to `2.7.3`
- update: `flag-icon-css` to `3.2.1`
- update: `ngx-perfect-scrollbar` to `6.3.1`
- update: `rxjs` to `6.3.3`
- update: `rxjs-compat` to `6.3.3`
- update: `tsickle` to `0.33.0`
- update: `@types/jasmine` to `2.8.9`
- update: `@types/jasminewd2` to `2.0.5`
- update: `@types/node` to `10.12.0`
- update: `codelyzer` to `4.5.0`
- update: `karma-coverage-istanbul-reporter` to `2.0.4`
- update: `protractor` to `5.4.1`

###### `v2.0.0`
- fix(dropdowns): dropup misplaced temp fix
- chore: update `@coreui/icons` to `0.3.0`
- refactor(coreui-icons): move to `@coreui/icons v0.3.0`
- update: `@angular/*` to `6.1.6`
- update: `angular-devkit/build-angular` to `0.7.5`
- update: `@angular/cli` to `6.1.5`
- update: `rxjs` to `6.3.0`
- update: `rxjs-compat` to `6.3.0`
- update: `@types/node` to `10.9.4`
- update: `jasmine-core` to `3.2.1`
- update: `karma-coverage-istanbul-reporter` to `2.0.2`
- update: `karma-jasmine-html-reporter` to `1.3.1`

###### `v2.0.0-rc.4`
- fix(forms): validation classes example closes #95  
- fix(forms): card-header-actions example
- fix(forms): autocomplete
- fix(login): form, autocomplete
- fix(register): form, autocomplete
- update: `@types/node` to `10.7.0`
- update: `codelyzer` to `4.4.4`
- update: `karma-jasmine-html-reporter` to `1.3.0`
- update: `typescript` to `2.9.2`

###### `v2.0.0-rc.3`
- fix(carousels): move to `loremflickr` image placeholders
- refactor: code cleanup
- tests: fix minimal testing
- update: `@angular/*` to `6.1.2`
- update: `@angular/cli` to `6.1.3`
- update: `@angular-devkit/build-angular` to `0.7.3`
- update: `ngx-perfect-scrollbar` to `6.3.0`
- update: `rxjs` to `6.2.2`
- update: `rxjs-compat` to `6.2.2`
- update: `@types/node` to `10.5.8`
- update: `codelyzer` to `4.4.3`
- update: `jasmine-core` to `3.2.0`
- update: `karma` to `3.0.0`
- update: `protractor` to `5.4.0`
- update: `ts-node` to `7.0.1`
- update: `tslint` to `5.11.0`

###### `v2.0.0-rc.2`
- update: @angular/animations to 6.0.9
- update: @angular/common to 6.0.9
- update: @angular/compiler to 6.0.9
- update: @angular/core to 6.0.9
- update: @angular/forms to 6.0.9
- update: @angular/http to 6.0.9
- update: @angular/platform-browser to 6.0.9
- update: @angular/platform-browser-dynamic to 6.0.9
- update: @angular/router to 6.0.9
- update: @coreui/coreui to 2.0.4
- update: @coreui/icons to 0.3.0
- update: bootstrap to 4.1.2
- update: codelyzer to 4.4.2
- update: karma-jasmine-html-reporter to 1.2.0

###### `v2.0.0-rc.1`
- chore: dependencies update

###### `v1.0.10`
- update: ngx-bootstrap to `2.0.2`
- update: dependencies

###### `v1.0.9`
- update: bootstrap to `v4.0.0`
- update: dependencies

###### `v1.0.8`
- update: bootstrap to `4.0.0-beta.3`
- update: ngx-bootstrap to `2.0.0-rc.0`
- fix(forms): duplicate `select` ids, toggleCollapse
- fix(dashboard): btnRadio
- refactor: `input-group-addon` to new `4.0.0-beta.3` classes
- feature: some Bootstrap4 components added
- feat: mobile sidebar link click closes the sidebar
- update: dependencies
