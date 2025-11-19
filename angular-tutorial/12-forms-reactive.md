# Forms: Reactive (Beginner to Advanced)

Reactive Forms in Angular are **model-driven forms**, meaning the entire form structure is created and controlled in TypeScript, not the HTML template.

They are more powerful than template-driven forms and useful for:
- Large forms
- Complex validation
- Dynamic form fields
- Custom validators
- Conditional logic
- Real-time validation

---

## 1. What Is a Reactive Form?

A reactive form is built using **FormGroup**, **FormControl**, and **FormArray**.

- **FormGroup** → container that holds multiple form fields
- **FormControl** → represents a single form field (input)
- **FormArray** → holds an array of controls (dynamic forms)

The form is defined entirely in TypeScript, giving full control.

---

## 2. What Is `FormControl`?

`FormControl` represents a single input field.

Example:
```ts
new FormControl('')
```
- This creates a control with empty initial value.

```js
new FormControl('', [Validators.required])
```

## 3. What Is FormGroup?

`FormGroup` is a collection of controls.

Example:

```js
new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
})
```
It allows:

- Accessing the whole form value → form.value

- Checking validity → form.valid

- Checking individual control → form.get('email')

## 4. Built-in Validators

Angular provides built-in validators:

- `Validators.required` → field must not be empty

- `Validators.email` → valid email format

- `Validators.min(length)`

- `Validators.max(length)`

- `Validators.minLength(length)`

- `Validators.maxLength(length)`

- `Validators.pattern(regex)`

Validators run synchronously and update the form status live.


## 5. Custom Validators

Reactive forms allow writing your own validators for:

- Password strength

- Username rules

- Phone number format

- Age restrictions

These validators return:

`null` if valid

`{ errorName: true }` if invalid

## 6. Reactive Form Advantages

- Full control in TypeScript

- Easy debugging

- Better for large-scale or dynamic forms

- Automatic validation tracking

- Compatible with Observables

- Easy to write custom validators

- Better for unit testing

## 7. How to Bind Reactive Forms in HTML

Use: 
```js
<form [formGroup]="form">
  <input formControlName="email" />
</form>
```

- formControlName links the HTML input to the TypeScript form.

## 8. Expected Behavior

- Form has two fields: email and tags

- email requires a valid email

- tags is an empty string array

- form.valid becomes true only when email is valid

- Code dynamically updates UI based on form state

