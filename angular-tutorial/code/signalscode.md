

```ts
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h2>Signals Demo</h2>

    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>

    <button (click)="increment()">Increment</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {

  count = signal(0);

  double = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }

  increment() {
    this.count.update(v => v + 1);
  }

  reset() {
    this.count.set(0);
  }
}
```

## Code Explanation 

### ➜ `import { Component, signal, computed, effect } from '@angular/core';`
Imports Angular’s signal system:
- `signal` → create state
- `computed` → derive new reactive values
- `effect` → run logic when signals change

---

### ➜ `@Component({ ... })`
Defines a standalone Angular component.

---

### ➜ `template: \` ... \``
HTML template that displays:
- `count()` → current signal value
- `double()` → computed value
Includes two buttons for increment and reset.

---

### ➜ `count = signal(0);`
Creates a **writable signal** with initial value 0.  
You read the value with `count()`.  
You update it using `set()` or `update()`.

---

### ➜ `double = computed(() => this.count() * 2);`
Creates a **computed signal** derived from `count`.  
Updates automatically whenever `count` changes.

---

### ➜ `constructor() { effect(() => { ... }) }`
Defines an **effect** that runs whenever `count()` changes.  
Used for logging or side effects.

---

### ➜ `increment() { this.count.update(v => v + 1); }`
Updates `count` by +1 using the update function.

---

### ➜ `reset() { this.count.set(0); }`
Directly sets the signal value to 0.

---

### ⭐ Expected Output:
- “Count” increases when clicking Increment  
- “Double” updates automatically  
- Console logs each update  
- Reset sets count to 0  
