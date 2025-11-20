# 10 Forms Template Driven

# 📌 Angular Forms — Template-Driven Forms

Angular provides two ways to handle forms:

1. **Template-Driven Forms** (simple, HTML-based)  
2. **Reactive Forms** (advanced, TypeScript-based)

Our Student Manager project uses **Template-Driven Forms**.

Template-Driven Forms:
- are written mostly in **HTML template**
- use `[(ngModel)]` for two-way binding
- are easier for beginners
- need **FormsModule** to work

## What is a Template-Driven Form?

Template-Driven Forms are form mechanisms where:

- Most of the logic is in the HTML template
- Angular tracks form values using ngModel
- Angular handles validation automatically
- Perfect for simple forms like our Add Student, Edit Student forms

## Enable Template-Driven Forms

To use template-driven forms, you must import:
```js
imports: [FormsModule]
```

In our project, this is added in:

- AddStudentComponent
- EditStudentComponent


## Template-Driven Form in Our Project Add Student

📌 add-student.component.html

```js
<h2>Add Student</h2>

<form (ngSubmit)="submit()">
  <input [(ngModel)]="student.name" name="name" placeholder="Name" required>

  <input [(ngModel)]="student.age" name="age" type="number"
         placeholder="Age" required>

  <input [(ngModel)]="student.course" name="course" placeholder="Course">

  <button type="submit">Save</button>
</form>
```

## Explanation 

| Feature                        | Explanation                              |
| ------------------------------ | ---------------------------------------- |
| `<form (ngSubmit)="submit()">` | Calls submit() when form is submitted    |
| `[(ngModel)]="student.name"`   | Two-way binding between UI ↔ TS variable |
| `name="name"`                  | Required for Angular to track the input  |
| `required`                     | HTML validation                          |
| `<button>`                     | Submits the form                         |


## Two-Way Binding in Forms

Template-Driven Forms rely fully on:

```js
[(ngModel)]
```

Example from our project:

```js
<input [(ngModel)]="student.name">
```

- When user types → updates student.name
- When component updates → UI updates
- This creates perfect sync between UI ↔ TypeScript


## ## 📌 Forms Used in Student Manager

| File                         | Purpose                             |
|------------------------------|-------------------------------------|
| add-student.component.ts     | Uses template-driven form to add student |
| edit-student.component.ts    | Uses template-driven form to edit student |
| FormsModule                  | Enables ngModel and template forms  |

## 📌 Important Form Features Used

| Feature               | Code Example                                  | Meaning |
|----------------------|-----------------------------------------------|---------|
| Two-way binding      | `[(ngModel)]="student.name"`                  | Sync between UI & TS |
| Form submission      | `(ngSubmit)="submit()"`                       | Calls TS function |
| HTML validation      | `required`                                    | Basic validation |
| Router navigation    | `this.router.navigate(['/'])`                 | Redirect |
