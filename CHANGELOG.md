### [coreui-free-angular-admin-template](https://coreui.io/angular/) changelog

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
- to `import  {getStyle, ...} from '@coreui/utils` 

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
