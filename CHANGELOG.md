### [coreui-free-angular-admin-template](https://coreui.io/angular/) changelog

---

#### `5.5.5`

- chore(dependencies): update to `Angular 20.1`

---

#### `5.5.3`

- chore(dependencies): update
- chore: add docs-components and docs-icons, minor cleanups
- refactor(navItems): add pro components docs links

---

#### `5.5.1`

- chore(dependencies): update to `Angular 20`
  - update `@angular/*` to `^20.0.x`
  - update `typescript` to `~5.8.3`
  - move `@angular/localize` to `dependencies` for use at runtime
  - update `@coreui/angular` to `~5.5.1`
  - update `@coreui/angular-chartjs` to `~5.5.1`
  - update `@coreui/icons-angular` to `~5.5.1`
  - update `moduleResolution` to `bundler` in TypeScript configurations
  - migrate application project to the new build system with `application` builder
  - update imports of `DOCUMENT` from `@angular/common` to `@angular/core`
  - update Node.js version list to the supported versions
  
- fix(dashboard): `TS2307`: Cannot find module `chart.js/dist/types/utils` or its corresponding type declarations. `[plugin angular-compiler]` - tempfix
- refactor: migrate to `inject` function (remove constructor-based dependency injection)
- refactor(toasters): use ComponentRef `setInput()` api
- refactor: migration to signal inputs, host bindings, cleanups
- refactor: migration to signal queries
- fix(mainChart): chart.js - Cannot read properties of undefined _clip (reading 'disabled')  - fixed by stop() current animations
- test: remove deprecated RouterTestingModule, use provideRouter() instead
- refactor: migration to lazy-loaded routes
- refactor: migration to self-closing tags

---

#### `5.4.6`

- chore(dependencies): update
- fix(pages): obsolete css class used in login page example, closes #279 - thanks @bernik1980

---

#### `5.4.5`

- chore(dependencies): update
- fix(default-layout): missing min-height for .ng-scroll-content

---

#### `5.4.3`

- chore(dependencies): update to `Angular 19.2`

---

#### `5.4.1`

- chore(dependencies): version bump for tilde `~` dependencies for @coreui/* to avoid Sass modules mismatch

---

#### `5.4.0`

- **refactor(styles): migrate to Sass modules, cleanup**
- refactor(default-layout): scrollbar cleanups
- chore(dependencies): update
- refactor(carousels): toggle interval example
- refactor(form-control): cleanup readonly / plaintext example
- fix(icon-subset): typo in cilContrast
- refactor(dropdowns): disabled cDropdownItem example
- fix(docs-example): set routerLink="" for Preview nav-item

---

#### `5.3.9`

- chore(dependencies): update
- refactor(carousels): cleanup, add config
- refactor(app.config): use provideAnimationAsync
- chore(modals): remove @.disabled animations

---

#### `5.3.8`

- chore(dependencies): update to `Angular 19.1`
- fix(toast): narrow type for cToastClose

---

#### `5.3.4`

- chore(dependencies): update
- chore(dependencies): security patch for `path-to-regexp` ReDoS in 0.1.x
- fix(toast.component): remove constructor-based dependency injection

---

#### `5.3.3`

- chore(dependencies): update
- chore(workflows): update node-version to 22.x

---

#### `5.3.2`

- chore(dependencies): update 
- chore(workflows): update with npm ci
- fix(package-lock): rebuild

---

#### `5.3.1`
 
- chore(dependencies): update to Angular 19
- refactor: directives, components and pipes are now standalone by default
- fix(dashboard-charts-data): brandInfoBg rgb is not a valid hex color
- chore(build): silence sass import deprecation warnings
- fix(toasters): remove position from props for AppToastComponent

---

#### `5.2.22`

- chore(dependencies): update to `Angular 18.2.9`
- fix(widgets-brand): use capBg instead of color
- fix(toasters): toast.index is a signal

---

#### `5.2.16`

- chore(dependencies): update
  - `tslib` to `^2.7.0`
  - `micromatch` to `4.0.8`
    - see vulnerability [Regular Expression Denial of Service (ReDoS) in micromatch](https://github.com/advisories/GHSA-952p-6rrq-rcjv)

---

#### `5.2.15`

- chore(dependencies): update to `Angular 18.2`
- refactor: move ColorModeService setup from default-header to app component
- chore(karma.conf): add custom chrome launcher with `--disable-search-engine-choice-screen` flag

---

#### `5.2.5`

- chore(dependencies): update to `Angular 18.1`
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
