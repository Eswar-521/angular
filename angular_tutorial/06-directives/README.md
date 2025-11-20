# 06 Directives

# 📌 Angular Directives 

A **Directive** in Angular is a special instruction added to HTML elements  
to change how they look or behave.

Angular gives 3 types of directives:

1. **Structural Directives** → change DOM structure  
2. **Attribute Directives** → change appearance/behavior  
3. **Custom Directives** → developer-created behavior

In the Student Manager project, we mainly use:
- `*ngFor` (structural)
- `routerLink` (attribute)
- custom `app-student-card` (component directive)

## 1. Structural Directives

Structural directives change the layout of the DOM
(add/remove/manipulate elements).

Common structural directives:

- *ngIf

- *ngFor

- *ngSwitch

- `Our project uses *ngFor.`

## `*ngFor` in Our Project

Used to loop through all students and display them.

📌 home.component.html
```js
<div *ngFor="let s of students">
  <app-student-card [student]="s"></app-student-card>
  <button class="delete-btn" (click)="delete(s.id)">Delete</button>
</div>
```
 **What it does?**

- Loops through students array


- For each s, it creates:


- a Student Card


- a Delete button


**Why it's structural?**

- Because it creates DOM elements dynamically for each student.

##  2. Attribute Directives

Attribute directives modify the behavior or appearance of an element.

- Examples:

   `routerLink`

   `ngClass`

   `ngStyle`


Our project uses `routerLink.`

📌 In AppComponent navigation:
```js
<a routerLink="/">Home</a>
<a routerLink="/add">Add Student</a>
```

📌 In Student Card:
```js
<a [routerLink]="['/edit', student.id]">Edit</a>
```

 **What it does?**

- Adds navigation behavior to the anchor tag

- No full page reload → SPA (Single page Application)navigation 


✔ Why it's an attribute directive?
Because it adds behavior to an HTML attribute without creating DOM elements.

##  3. Component Directives

- This means using a component as a custom HTML tag.
Example:
```js
<app-student-card></app-student-card>
```
- Every Angular Component is also a directive.

Our project uses:
```js
<app-student-card [student]="s"></app-student-card>
```
 **What it does?**

- Treats StudentCardComponent like an HTML tag

- Makes UI modular & reusable

- Passes data using property binding



⭐ COMPLETE SUMMARY TABLE
| Directive Type         | Example in Project                                | Purpose |
|------------------------|----------------------------------------------------|---------|
| **Structural Directive** | `*ngFor="let s of students"`                    | Create a list of student cards dynamically |
| **Attribute Directive**  | `routerLink="/add"`                             | Add navigation behavior |
| **Component Directive**  | `<app-student-card [student]="s">`              | Use a component as a directive |


`*ngFor` → Creates HTML elements for each student


`routerLink` → Adds routing behavior


`app-student-card` → Custom component acting as a directive

