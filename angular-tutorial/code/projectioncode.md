
```ts
// card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <header>
        <ng-content select="[card-header]"></ng-content>
      </header>

      <section>
        <ng-content select="[card-body]"></ng-content>
      </section>

      <footer>
        <ng-content select="[card-footer]"></ng-content>
      </footer>
    </div>
  `
})
export class CardComponent {}


// parent.component.ts
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <h2 card-header>Product Details</h2>

      <p card-body>
        This is the dynamic projected body content.
      </p>

      <button card-footer>
        Buy Now
      </button>
    </app-card>
  `
})
export class ParentComponent {}
```

### ➜ `selector: 'app-card'`
Defines the reusable card component.

---

### ➜ `<ng-content select="[card-header]"></ng-content>`
Projects HTML from parent **where attribute card-header is used**.

Parent writes:
`<h2 card-header>...</h2>`

This content will be placed into the card's `<header>`.

---

### ➜ `<ng-content select="[card-body]"></ng-content>`
Projects content marked with `card-body`.

---

### ➜ `<ng-content select="[card-footer]"></ng-content>`
Projects content marked with `card-footer`.

---

### ➜ Parent Component Usage
```html
<app-card>
  <h2 card-header>Product Details</h2>
```
- This <h2> is projected inside header slot.

- <p card-body>This is the dynamic projected body content.</p>

This `<p>` goes to the body slot.

```js
<button card-footer>Buy Now</button>
```

- This `<button>` goes to the footer slot.

### Expected Output:

A rendered card with three dynamic sections:

Header:
Product Details

Body:
This is the dynamic projected body content.

Footer:
Buy Now button

Parent decides what content goes where 
Child controls the layout 
This is content projection with dynamic slots.

