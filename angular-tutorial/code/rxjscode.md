

```md
### `import { of, map, filter } from 'rxjs';`
Imports RxJS functions:
- `of()` → creates an Observable from given values
- `map()` → transforms each value
- `filter()` → removes values that don't match a condition

---

### `of(1,2,3)`
Creates an Observable that emits: 1 → 2 → 3 in sequence.

---

### ➜ `.pipe(`
Begins the pipeline of operators.  
`pipe()` lets you chain multiple transformations.

---

### ➜ `map(x => x * 2),`
Operator #1 — transforms every emitted value.  
Changes:  
1 → 2  
2 → 4  
3 → 6

---

### ➜ `filter(x => x > 2)`
Operator #2 — filters out values that are not greater than 2.  
Remaining: 4, 6

---

### ➜ `.subscribe(console.log);`
Starts the Observable and prints each emitted value to console.  
Final Output:
4
6