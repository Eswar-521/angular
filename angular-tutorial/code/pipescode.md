

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Pipes Demo</h2>

    <!-- String Pipes -->
    <p>Uppercase: {{ username | uppercase }}</p>
    <p>Lowercase: {{ username | lowercase }}</p>
    <p>Titlecase: {{ username | titlecase }}</p>

    <!-- Number Pipes -->
    <p>Price (Number): {{ price | number:'1.2-2' }}</p>
    <p>Price (Currency): {{ price | currency:'INR' }}</p>
    <p>Discount (Percent): {{ discount | percent }}</p>

    <!-- Date Pipe -->
    <p>Today's Date: {{ today | date:'medium' }}</p>

    <!-- JSON Pipe -->
    <p>JSON Data: {{ user | json }}</p>

    <!-- Slice Pipe -->
    <p>First 5 Letters: {{ username | slice:0:5 }}</p>
  `
})
export class PipesDemoComponent {
  username = 'john doe';
  price = 1299.456;
  discount = 0.25;
  today = new Date();
  user = { name: 'John', age: 25 };
}
```
## Code explanation 

```js
import { Component } from '@angular/core';
```

- Imports the component decorator so we can create Angular components.

```js
import { CommonModule } from '@angular/common';
```

- Needed for pipes like uppercase, date, currency in standalone components.

```js
@Component({
```

- Starts component metadata.

```js
selector: 'app-pipes-demo',
```

- The HTML tag for this component → <app-pipes-demo></app-pipes-demo>.
```js
standalone: true,
```

- Component works independently without NgModule.
```js
imports: [CommonModule],
```

- Enables built-in pipes and structural directives.

```js
template: \ ... 
```

- Contains the UI with different pipe examples.


```js
<p>Uppercase: {{ username | uppercase }}</p>
```

- uppercase pipe converts "john doe" → "JOHN DOE".

```js
<p>Lowercase: {{ username | lowercase }}</p>
```

- lowercase pipe converts "JOHN DOE" → "john doe".

```js
<p>Titlecase: {{ username | titlecase }}</p>
```

- titlecase pipe converts "john doe" → "John Doe".

```js
<p>Price (Number): {{ price | number:'1.2-2' }}</p>
```

- Formats numbers with 2 decimal places:
1299.456 → "1,299.46".

```js
<p>Price (Currency): {{ price | currency:'INR' }}</p>
```

- Formats value as Indian Rupees:
₹1,299.46

```js
<p>Discount (Percent): {{ discount | percent }}</p>
```
- Formats 0.25 → "25%".

```js
<p>Today's Date: {{ today | date:'medium' }}</p>
```

- Formats Date object into readable string.

```js
<p>JSON Data: {{ user | json }}</p>
```

- Displays object as formatted JSON.

```js
<p>First 5 Letters: {{ username | slice:0:5 }}</p>
```

- Cuts "john doe" → "john " (first 5 chars).


⭐ Class Properties
```js
username = 'john doe';
```

- Demo string for string pipes.
```js
price = 1299.456;
```

- Used for number/currency pipes.

```js
discount = 0.25;
```

- Used for percent pipe.

```js
today = new Date();
```

- Used for date pipe.

```js
user = { name: 'John', age: 25 };
```

- Used for JSON pipe.

