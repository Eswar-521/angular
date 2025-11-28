# 📁 Student Manager - Project Folder Structure


---

## ✅ 1. Install Node.js

 Download & install from:  

https://nodejs.org

- Check installation:

```bash
node -v
npm -v
```

## 2. Install Angular CLI
```js
npm install -g @angular/cli
```

- Check:
`ng version`

## 3. Create New Angular Project

- We created a project using:

```js
ng new student-manager
```

CLI will ask:

- Add routing? → Yes

- CSS or SCSS? → CSS


## After creation:
```js
cd student-manager
```

Run the default project:
```js
ng serve -o
```

## 4. Clean Up Default Angular Files

 removed unwanted default files:

- ❌ app.component.spec.ts
- ❌ app.component.css content
- ❌ default HTML inside app.component.html

Kept only:

- app.component.ts

- app.component.html

- app.routes.ts (generated manually)


## 5. Convert Project to Standalone Mode

Changed app.component.ts:

```js
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

## Created main routes file:

📌 app.routes.ts
```js
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddStudentComponent },
  { path: 'edit/:id', component: EditStudentComponent }
];
```

## Updated main.ts:
```js
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
});
```

