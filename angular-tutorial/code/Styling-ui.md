// app.component.ts
```js
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Welcome to UI Libraries Demo</h2>
      <p>This is a Material Card component.</p>

      <button mat-raised-button color="primary">
        Material Button
      </button>
    </mat-card>
  `,
  styles: [`
    mat-card {
      padding: 20px;
      margin: 20px;
    }
  `]
})
export class AppComponent {}
```

## Code explanation 

### `import { MatButtonModule } from '@angular/material/button';`
Imports Angular Material’s button component.

---

### `import { MatCardModule } from '@angular/material/card';`
Imports Angular Material’s card UI component.

---

###  `imports: [MatButtonModule, MatCardModule]`
Standalone components require importing UI libraries directly here.

---

### ➜ `<mat-card> ... </mat-card>`
Material Card component — used for grouping content in a clean UI box.

---

### ➜ `<button mat-raised-button color="primary">`
Material button with a raised (elevated) style and Angular Material theme color.

---

### ➜ `styles: [\` ... \`]`
Component-scoped CSS:
- Adds padding
- Adds margin
- Styles apply only inside this component

---

### ⭐ Expected Output:
A clean Material UI card with:
- A heading
- A paragraph
- A primary raised button  
All styled with Angular Material’s default theme.
