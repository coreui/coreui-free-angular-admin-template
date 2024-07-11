### [coreui-free-angular-admin-template](https://coreui.io/angular/) changelog

---

#### `5.2.5`

- chore(dependencies): update to Angular 18.1
- refactor(cards): card navigation update to the latest `tabs` api

---

#### `5.2.3`

- chore(dependencies): update
- fix(widgets): c-progress white with inverse()

---

#### `5.2.0`

- chore(dependencies): update to Angular 18
- refactor(tabs): update to the latest api

---

#### `5.0.4`

- chore(dependencies): update

---

#### `5.0.3`

- chore(dependencies): update
- fix: add missing `aria-label` attributes etc
- refactor(tabs): add `role="tablist"`, minor cleanups

---

#### `5.0.2`

- chore(dependencies): update
- refactor(default-header): color modes dropdown

---

#### `5.0.0`

CoreUI v5 for Angular 17

- chore(dependencies): update to `Angular 17.3`
- refactor: update to CoreUI v5 (styles, structure, api)
- refactor: standalone components app
- refactor: routes config
- refactor: update to chart.js v4
- refactor: project structure (containers->layout)
- refactor: use control flow
- refactor(dashboard): main chart data - typings and theme switching fix
- fix(dashboard): missing custom tooltips on first render, refactor main chart scales

---

#### `4.7.15`

- chore: move to `application` builder
- chore(dependencies): update to `Angular 17.2`
    - `Angular 17.2`
    - `TypeScript ~5.3`
    - `zone.js ~0.14.4`
    - `@coreui/angular ~4.7.15`
    - `@coreui/angular-chartjs ~4.7.14`
    - `@coreui/icons-angular ~4.7.14`

---

#### `4.7.13`

- chore(dependencies): update to `Angular 17.1`
    - `Angular 17.1`
    - `TypeScript ~5.2`
    - `zone.js ~0.14.3`
    - `@coreui/angular ~4.7.13`
    - `@coreui/angular-chartjs ~4.7.13`
    - `@coreui/icons-angular ~4.7.13`

---

#### `4.7.0`

- chore(dependencies): update to `Angular 17`
    - `Angular 17`
    - `TypeScript ~5.2`
    - `zone.js ~0.14.2`
    - `@coreui/angular ~4.7.0`
    - `@coreui/angular-chartjs ~4.7.0`
    - `@coreui/icons-angular ~4.7.0`

```shell
ng update @angular/core@17 @angular/cli@17 @angular/cdk@17 @coreui/angular@~4.7 @coreui/angular-chartjs@~4.7 @coreui/icons-angular@~4.7

```

---

#### `4.5.28`

- chore(dependencies): update

---

#### `4.5.27`

- chore(dependencies): update

see: [Babel vulnerable to arbitrary code execution when compiling specifically crafted malicious code](https://github.com/coreui/coreui-angular/security/dependabot/31)

---

#### `4.5.25`

- chore(dependencies): update

---

#### `4.5.16`

- chore(dependencies): update to `Angular 16.2`
- fix(carousels): remove routerLink directives from carousel controls
- chore: add CoreUI links to the sidebar-nav, minor refactors
- refactor(styles): scrollbar tweaks
- refactor(styles): scss variables - disable deprecation messages

---

#### `4.5.2`

- chore(dependencies): update to `Angular 16.1`

---

#### `4.5.0`

- chore(dependencies): update to `Angular 16`
- refactor: remove deprecated ngx-perfect-scrollbar, use `ngx-scrollbar` instead
- fix: getStyle() add nullish check
- refactor(toasters): use takeUntilDestroyed() operator

---

#### `4.3.13`

- docs(LICENSE): add missing license info
- chore(dependencies): update

---

#### `4.3.12`

- chore(dependencies): update

---

#### `4.3.11`

- chore(dependencies): update `@angular/*` to version `^15.2.7`
- standalone components:
    - chore(dependencies): update `@coreui/angular` to version `~4.4.1`
    - chore(dependencies): update `@coreui/angular-chartjs` to version `~4.4.1`
    - chore(dependencies): update `@coreui/icons-angular` to version `~4.4.1`
- fix(widgets): breakpoints

---

#### `4.3.10`

- chore(dependencies): update `@angular/*` to version `^15.2.4`
- chore(dependencies): update `@coreui/angular` to version `~4.3.17`
- chore(dependencies): update `@coreui/angular-chartjs` to version `~4.3.17`
- chore(dependencies): update `@coreui/icons-angular` to version `~4.3.17`
- chore(dependencies): update `@coreui/icons` to version `^3.0.1`
- chore(dependencies): update `@coreui/charts` to version `^3.1.1`
- chore(dependencies): update `@coreui/utils` to version `^2.0.1`

imports update required :boom: :exclamation:

- from `import {getStyle, ...} from '@coreui/utils/src`
- to `import {getStyle, ...} from '@coreui/utils`

---

#### `4.3.9`

- chore: dependencies update
- fix(widgets): add missing pointBackgroundColor

---

#### `4.3.0`

update to:

- `Angular 15`
- `TypeScript 4.8`
- `RxJS 7.5`

refactor:

- refactor(AppComponent): change selector to `app-root`

---
