# 09 Routing

# 📌 Angular Routing

Routing in Angular allows us to build Single Page Applications (SPA)  
where the page does **not reload**, but the view changes.

Angular Router maps:
- a **URL path**
- to a **Component**

Example:
```js
`/add` → AddStudentComponent  
`/edit/10` → EditStudentComponent
```

- Routing helps switch between different screens in the application.

## How Routing Works

Routing requires:

- A routes configuration file

- A router-outlet placeholder

- routerLink for navigation


## Routing File in Our Project — app.routes.ts

This file defines all routes in the Student Manager app.

```js
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },                // Home page
  { path: 'add', component: AddStudentComponent },       // Add student
  { path: 'edit/:id', component: EditStudentComponent }, // Edit student by ID
];
```

## Registering Routes in main.ts

Your application bootstraps routing like this:

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
});
```

- provideRouter(appRoutes) registers all routes
- AppComponent becomes the root container

## Using `<router-outlet>` in AppComponent

Router outlet is where the current page's component is displayed.

📌 app.component.html

```js
<h1 class="title">Student Manager</h1>

<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/add">Add Student</a>
</nav>

<router-outlet></router-outlet>
```

-  Acts like a placeholder
- Whatever route you visit → that component is loaded here
- No page reload → SPA behavior

## Navigating with routerLink

You used routerLink in multiple places.
```js
📌 Navigation Links
<a routerLink="/">Home</a>
<a routerLink="/add">Add Student</a>
```

## Routing 
## 📌 Routing Summary

| File                   | Purpose                                      |
|------------------------|----------------------------------------------|
| `app.routes.ts`        | Defines all application routes               |
| `main.ts`              | Registers routes with provideRouter()        |
| `app.component.html`   | Contains <router-outlet> and navigation      |
| `student-card.component.html` | Uses routerLink to open edit page     |
| `edit-student.component.ts`   | Reads route parameter (:id)           |


## 📌 Route Types Used

| Route Type        | Example                 | Purpose                         |
|-------------------|--------------------------|---------------------------------|
| Basic Route       | `{ path: '', component: HomeComponent }` | Load home page |
| Simple Path       | `{ path: 'add', component: AddStudentComponent }` | Add page |
| Parameterized Route | `{ path: 'edit/:id', component: EditStudentComponent }` | Load student by ID |
