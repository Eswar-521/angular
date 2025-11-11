# Angular Tutorial (Standalone Components + Signals)

![Angular Logo](favicon_new.png)


## CONTENTS

---

### 📘 [Introduction](./01-introduction.md)
- What is Angular & where it fits
- Angular vs React vs Vue
- Standalone APIs & Signals (why they matter)
- SPA vs SSR/SSG (Angular Universal)

---

### 🚀 [Getting Started](./02-getting-started.md)
- Prereqs (Node, npm/pnpm)
- Install CLI: `npm i -g @angular/cli`
- Create app: `ng new` (standalone)
- Project structure overview
- Dev, build, serve, test

---

### 🧰 [Tooling & Project Setup](./03-tooling-setup.md)
- TypeScript config & strict mode
- ESLint + Prettier
- Path aliases (tsconfig)
- Environment files & secrets
- VS Code extensions (Angular Language Service)

---

### 🧠 [TypeScript & Decorators Primer](./04-ts-decorators.md)
- Classes, interfaces, generics
- Decorators (`@Component`, `@Injectable`, etc.)
- Metadata & reflection basics

---

### 🧱 [Components & Lifecycle](./05-components-lifecycle.md)
- Standalone components (`standalone: true`)
- Templates, styles, encapsulation
- Lifecycle hooks (`OnInit`, `OnDestroy`, etc.)
- Inputs/Outputs & `EventEmitter`
- ViewChild/ContentChild

---

### 🧩 [Templates, Binding & Directives](./06-templates-directives.md)
- Interpolation, property & event binding
- Two-way binding `[(ngModel)]`
- Built-in structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`)
- Attribute directives (ngClass, ngStyle)
- Template variables & reference syntax

---

### 🔁 [Pipes](./07-pipes.md)
- Built-in pipes (date, currency, async)
- Pure vs impure
- Custom pipes & performance notes

---

### 🧯 [Dependency Injection & Providers](./08-di-providers.md)
- Hierarchical injectors
- `providedIn` scopes
- `inject()` function & standalone providers
- Multi providers & tokens

---

### 🌐 [HTTP with HttpClient](./09-httpclient.md)
- GET/POST/PUT/DELETE
- Interceptors (auth, logging, retry)
- Error handling & typed responses
- Caching strategies

---

### 🧭 [Routing (Standalone Router)](./10-routing.md)
- Configuring routes with `provideRouter`
- Lazy loading & route-level code-splitting
- Guards (canActivate, canMatch)
- Resolvers & preloading strategies
- Router events & scroll restoration

---

### 📝 [Forms: Template-Driven](./11-forms-template.md)
- `FormsModule` basics
- ngModel & validation
- Custom validators
- Form UX patterns

---

### 🧪 [Forms: Reactive](./12-forms-reactive.md)
- `FormControl`, `FormGroup`, `FormArray`
- Sync/async validators
- Error display patterns
- Dynamic & nested forms
- Custom controls with ControlValueAccessor

---

### 📡 [RxJS Fundamentals](./13-rxjs-basics.md)
- Observables, observers, subscriptions
- Creation operators
- Pipeable operators (map, filter, tap)
- Subjects vs BehaviorSubject

---

### 🔬 [RxJS Advanced](./14-rxjs-advanced.md)
- Higher-order mapping (switchMap/mergeMap/exhaustMap/concatMap)
- Error handling (catchError, retry)
- Multicasting & shareReplay
- Memory leaks & takeUntil patterns
- Schedulers & performance tips

---

### 📶 [Signals in Angular](./15-signals.md)
- `signal`, `computed`, `effect`
- Interop with RxJS
- Signal-based inputs & state
- Change detection with signals

---

### 🧰 [State Management](./16-state-management.md)
- Local component state (signals/RxJS)
- NgRx Store/Effects/Entity
- Signal-based stores & alternatives (e.g., SignalStore patterns)
- Selector patterns & best practices

---

### 🎛️ [Content Projection & Dynamic Components](./17-projection-dynamic.md)
- `<ng-content>` (single & multi-slot)
- Dynamic component rendering (ViewContainerRef)
- Portals & overlays (CDK)

---

### 🎨 [Styling & UI Libraries](./18-styling-ui.md)
- View encapsulation strategies
- Global vs component styles
- Tailwind with Angular
- Angular Material & CDK
- PrimeNG / NG-ZORRO overview
- Design tokens & theming

---

### 🎞️ [Animations](./19-animations.md)
- Angular Animations API
- States, transitions, keyframes
- Route transitions & performance

---

### ♿ [Accessibility (A11y)](./20-accessibility.md)
- Semantic templates
- Focus management
- Keyboard navigation
- CDK a11y utilities

---

### 🌍 [Internationalization (i18n)](./21-i18n.md)
- Built-in i18n pipeline
- Extract/translate messages
- Locales, dates, numbers, plurals
- Lazy-loading translations

---

### 🧯 [Error Handling & Logging](./22-errors-logging.md)
- Global error handler
- Http errors & retry UX
- Sentry/LogRocket integration
- User-facing fallbacks

---

### 🔒 [Security & Hardening](./23-security.md)
- XSS & Angular’s sanitization
- `DomSanitizer` & trust types
- Bypass APIs (when and when not)
- CSP, CORS, auth patterns (JWT/OAuth)

---

### ⚡ [Performance & Change Detection](./24-performance.md)
- Default vs OnPush
- Zonal vs zoneless strategies
- TrackBy, immutability, pure pipes
- Bundle budgets & code splitting
- Preloading & route-level optimization

---

### 🧪 [Testing](./25-testing.md)
- Unit tests (Jest or Jasmine/Karma)
- TestBed & component testing
- Mocking HttpClient, Router, DI tokens
- Component harnesses (Material/CDK)
- E2E with Playwright/Cypress

---

### 🖥️ [SSR/SSG with Angular Universal](./26-universal.md)
- Setup & hydration
- Data fetching on the server
- SEO & meta tags
- Caching & edge rendering notes

---

### 📱 [PWA & Offline](./27-pwa.md)
- Service worker setup
- Caching strategies
- Push notifications
- App manifest & icons

---

### 🧩 [Monorepos & Micro-Frontends](./28-nx-mfe.md)
- Nx workspace basics
- Libraries & boundaries
- Module Federation & routing integration
- Shared design systems

---

### 🛠️ [CI/CD & Environments](./29-ci-cd.md)
- GitHub Actions (lint/test/build)
- Environment promotion
- Feature flags & config toggles
- Artifact storage & previews

---

### 🚢 [Deployment](./30-deployment.md)
- Static hosting vs SSR hosting
- Docker + Nginx
- Cloud providers overview
- Caching/CDN headers

---

### 🔁 [Migrations & Upgrades](./31-migrations.md)
- `ng update` workflow
- Converting to standalone
- Adopting Signals incrementally
- Deprecations & compatibility

---

### 🧱 [Architecture & Patterns](./32-architecture.md)
- Feature-first structure
- Smart/Dumb (Presenter/Container)
- Facade & repository patterns
- Domain modules & boundaries

---

### 📊 [Charts, Tables & Files](./33-dataviz-files.md)
- Chart.js, ngx-charts basics
- Data tables (AG Grid/TanStack Table)
- Virtual scroll (CDK)
- File uploads, previews, S3 signed URLs

---

### 🔎 [Analytics & Monitoring](./34-analytics-monitoring.md)
- Page & event analytics
- Web vitals & RUM
- OpenTelemetry basics
- Alerting & dashboards

---

### 🎓 [Capstone Projects](./35-capstones.md)
- 1) Admin CRUD + Auth (Reactive Forms + Http + Guards)
- 2) E-commerce Front (NgRx + Router + Interceptors)
- 3) Realtime Chat (WebSocket + RxJS)
- 4) Analytics Dashboard (Charts + Virtual Scroll)
- 5) Universal Blog (SSR + i18n + SEO)

---


## 📘 Conclusion
Angular’s **standalone components + signals** modernize DX while keeping batteries-included power (DI, router, Http, forms). Master RxJS, forms, routing, and performance to ship enterprise-grade apps.

© TINITIATE.COM
