

```html
<!-- component.html -->
<form #f="ngForm">
  <input 
    name="email" 
    ngModel 
    required 
    email 
    placeholder="Enter your email"
  />

  <button [disabled]="f.invalid">Submit</button>
</form>
```

### ➜ `<form #f="ngForm">`
Creates a form and assigns a form reference variable named `f`.
`ngForm` turns this form into an Angular form with validation support.
`f` can now be used to check validity: `f.valid`, `f.invalid`.

---

### ➜ `<input name="email" ngModel required email />`
- `name="email"` → Required for Angular to register this input inside the form.
- `ngModel` → Enables two-way binding and makes this input part of the form model.
- `required` → Makes the field mandatory.
- `email` → Validates that the entered value is a valid email format.

If the user enters an invalid email, the control becomes `ng-invalid`.

---

### ➜ `<button [disabled]="f.invalid">Submit</button>`
- `[disabled]="f.invalid"` → Button is disabled if the form is invalid.
- Angular updates this automatically based on the `<input>` field validity.

When the email becomes valid → the button becomes enabled.

---

### ⭐ Expected Output:
- Email field turns invalid when empty or incorrect.
- Button remains disabled until a valid email is typed.
- Angular handles validation and form state automatically without TypeScript code.
