
---

# ✅ **BLOCK 2 — CODE ONLY (Markdown Block)**

```ts
import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterStore {

  // STATE
  count = signal(0);

  // DERIVED STATE
  double = computed(() => this.count() * 2);

  // SIDE EFFECTS
  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }

  // ACTIONS
  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }

  reset() {
    this.count.set(0);
  }
}


```

## Code Explanation :

### ➜ `import { Injectable, signal, computed, effect } from '@angular/core';`
Imports Angular’s signal-based state tools:
- `signal` → state
- `computed` → derived state
- `effect` → react to changes
- `Injectable` → service usable across app

---

### ➜ `@Injectable({ providedIn: 'root' })`
This makes the store a global singleton.
Any component can inject and use this store.

---

### ➜ `count = signal(0);`
Creates a writable signal for the main state.
Initial value = 0.
Read with `count()`, update with `.set()` or `.update()`.

---

### ➜ `double = computed(() => this.count() * 2);`
A computed signal that recalculates only when `count` changes.
No need to compute manually.

---

### ➜ `constructor() { effect(() => { ... }) }`
Defines a side-effect that runs every time `count` updates.
Here it logs the new value.
Useful for:
- syncing to localStorage
- API triggers
- analytics

---

### ➜ `increment() { this.count.update(v => v + 1); }`
Updates count by increasing its value.
Actions mutate state in a controlled way.

---

### ➜ `decrement() { this.count.update(v => v - 1); }`
Decreases the count.
Signals automatically update the UI.

---

### ➜ `reset() { this.count.set(0); }`
Resets count to zero.
Directly sets the value.

---

### ⭐ Expected Behavior:
- Components inject this store to read/update values.
- UI updates immediately when count changes.
- `double` always stays in sync.
- Store centralizes logic → components become simple.
