# 11 Forms Reactive

# 📌 Angular Reactive Forms

Reactive Forms are the **model-driven** approach in Angular.

Instead of writing form logic in the HTML (like template-driven forms),  
Reactive Forms put ALL logic inside TypeScript.

This gives:
- Full control  
- Strong validation  
- Scalability  
- Testability  
- Dynamic form creation 


## Why Reactive Forms ? 

| Feature             | Reactive Forms              |
| ------------------- | --------------------------- |
| Form logic location | **TypeScript (TS)**         |
| Validation          | **Powerful & customizable** |
| Performance         | Faster, predictable         |
| Suitable for        | Large/complex forms         |
| Data flow           | Structured, Reactive        |
| Best for            | Enterprise apps             |


**Reactive forms use two main classes** :

- FormGroup → For grouping form controls
- FormControl → For single input fields
- FormBuilder → For easier form creation

## Import Required Modules

- Before using reactive forms, import:

```js
imports: [ReactiveFormsModule]
```

## Understanding Reactive Form Classes

FormGroup
 ```js
this.fb.group({
  name: [''],
  age: [0],
  course: ['']
});

```

Manages all controls as a group.

FormControl
```js
new FormControl('', Validators.required)
```

Represents a single input element.

 FormBuilder (recommended)
```js
this.fb.group({...})
```

Cleaner syntax, reduces code.

## Reactive Form Validation

Angular has built-in validators:

| Validator            | Purpose               |
| -------------------- | --------------------- |
| Validators.required  | Field must have value |
| Validators.min(n)    | Minimum value         |
| Validators.max(n)    | Maximum value         |
| Validators.email     | Valid email           |
| Validators.pattern() | Regex                 |


Example from our form:

- age: [0, [Validators.required, Validators.min(1)]]

## Comparison Table — Template vs Reactive Forms
| Feature | Template-Driven | Reactive Forms |
|---------|------------------|----------------|
| Code written in | HTML | TypeScript |
| Complexity | Simple | Complex / Scalable |
| Validation | Easy, basic | Strong, customizable |
| Form Model | Created by Angular | Created by developer |
| Best For | Small forms | Enterprise apps |
| Used in Our Project | Yes (Add/Edit Forms) | Now added (Reactive Version) |
