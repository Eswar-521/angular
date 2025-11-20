# 15 Angular Material

# ⭐ Angular Material — Simple Definition

**Angular Material is a ready-made UI Component Library created by the Angular team.  
It provides beautiful, modern, and professional UI components based on Google's Material Design.**

---

# ⭐ Why Angular Material?

Angular Material gives you:
- Ready-made buttons, cards, forms, dialogs, tables
- A clean and modern look without writing much CSS
- Mobile-friendly and responsive design
- Components that follow Material Design standards
- Easy theming (light / dark / custom colors)

---

# ⭐ One-Line Definition (For Quick Understanding)

> **Angular Material lets you build beautiful Angular applications faster using prebuilt UI components.**

---

# ⭐ Key Features (Simple)

-  Professional UI components  
-  Faster development (less CSS needed)  
-  Works on all devices  
-  Dark mode and custom themes  
-  Official library from Angular team  

---

# ⭐ How to Install (Easy)

```bash
ng add @angular/material
```
**This installs:**

- Material components

- Animations

- Default theme

## How to use 

**Here we have import a materia Button**

```js
import { MatButtonModule } from '@angular/material/button';
```
## Add inside imports of a standalone component

```js

@Component({
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-raised-button color="primary">Click Me</button>`
})
export class DemoComponent {}
```



**Use in Html** 

```js
<mat-form-field appearance="outline">
  <mat-label>Your Name</mat-label>
  <input matInput placeholder="Enter name">
</mat-form-field>

```



## Angular Material makes Angular development easier by giving you:

- Beautiful UI components

- Less CSS work

- Faster development

- Better user experience

- It is one of the best ways to create clean and modern Angular applications.

