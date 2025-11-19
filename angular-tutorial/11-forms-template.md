# Forms: Template-Driven 

Template-driven forms are the simplest way to build forms in Angular.  
They are called “template-driven” because most of the form logic lives in the HTML template.

Template-driven forms use:
- `FormsModule`
- `ngModel` for two-way binding
- HTML validation attributes (`required`, `email`, `minlength`, etc.)
- Form reference variable (`#f="ngForm"`) to check form state

---

## 1. What Is `FormsModule`?

To use template-driven forms, you must import `FormsModule` inside your standalone component:

```ts
imports: [FormsModule]
```

It enables:

- ngModel

- Form validation

- Form states (f.valid, f.invalid, f.touched, f.dirty)

## 2. How Template-Driven Forms Work


HTML controls use:

- name attribute → required for each form field

- ngModel → binds the input value to the component

- Validation attributes like required, email, pattern

Angular automatically:

- Tracks form values

- Tracks validation state

- Generates errors

- Updates UI based on form validity

## 3. Using #f="ngForm"

`#f="ngForm" `creates a reference to the form.
You can check:

- f.valid → form is valid

- f.invalid → form is invalid

- f.value → all the form values

- f.controls → validation information of each field

## 4. Expected Behavior

- The form becomes invalid until a proper email is entered.

- The submit button becomes disabled if the form is invalid.

- Angular automatically adds classes like:

- ng-valid

- ng-invalid

- ng-touched

- ng-dirty

