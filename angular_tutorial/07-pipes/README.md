# 07 Pipes

# 📌 Angular Pipes (With Real Project Example)

A **Pipe** in Angular is a feature that transforms data in the template  
without changing the original value in the component.

Pipes are used **inside templates** using the `|` (pipe) operator.

Example:
```js
{{ value | pipeName }}
```

## 1. Why are Pipes Needed?

Pipes help format data such as:

- uppercase/lowercase strings

- dates

- currency

- numbers

custom formatting

-  Pipes `do not change the actual variable` (pure functions).
- Output only changes in the view (template)

## Types of Pipes
| Type              | Meaning                                               |
|-------------------|-------------------------------------------------------|
| **Built-in Pipes**| Available in Angular (date, uppercase, json, number…) |
| **Custom Pipes**  | Created by developer for custom formatting            |

- Our project uses a Custom Pipe 

## 3. Custom Pipe in Student Manager Project — InitialPipe

You created a pipe to extract the first letter of a student's name.

This is used to show initials like:

```js
Ram → R  
Sita → S  
```

📌 initial.pipe.ts (Our Custom Pipe)
```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initial',
  standalone: true
})
export class InitialPipe implements PipeTransform {
  transform(value: string | undefined): string {
    return value ? value.charAt(0).toUpperCase() : '';
  }
}

```

`@Pipe({ name: 'initial' })`

- This is the pipe name used in templates:

```js
{{ student.name | initial }}
```

`standalone: true`

- No need to declare inside a module

- Pipe can be imported directly into components.


`transform(value: string)`

- Receives the original string

- Returns the first letter in uppercase

- Pure function → doesn't modify original data


## 4. . Where We Use This Pipe in Project

📌 Inside student-card.component.html
```js
<h3>{{ student.name }} ({{ student.name | initial }})</h3>
```

**What happens?**

Example:

- `student.name = 'Sita'`

- `student.name | initial → "S"`

- `UI displays:`

```js
Sita (S)
```

This is exactly how pipes help format data in UI.


## 5. How Pipe Is Used in Component

In `student-card.component.ts` we imported the pipe:
```js
imports: [RouterLink, InitialPipe]
```

This makes the pipe available inside the template.

## 6. Summary — Pipes in This Project


| File                         | Purpose                                  |
|------------------------------|------------------------------------------|
| `initial.pipe.ts`            | Custom pipe to show first letter of name |
| `student-card.component.html`| Used to display student initials         |