# Template & Directives in Angular

In Angular, the **template** is the HTML part of a component.  
It defines what the user sees on the screen.

A template can use:
- HTML
- Angular bindings (`{{ }}`)
- Directives (`*ngIf`, `*ngFor`, `[ngClass]`, `[ngStyle]`)
- Events (`(click)`, `(keyup)`)
- Property bindings (`[value]`, `[disabled]`)

---

## 1. What Are Directives?

Directives are instructions that tell Angular **how to change the DOM**.

Three types of directives:

### **1. Structural Directives**  
These change the structure of the DOM (add/remove elements).

Examples:
- `*ngIf` → show/hide elements  
- `*ngFor` → loop and display list  
- `*ngSwitch` → conditional rendering  

### **2. Attribute Directives**  
These change the appearance or behavior of an element.

Examples:
- `[ngClass]` → add CSS classes dynamically  
- `[ngStyle]` → add inline styles dynamically  

### **3. Custom Directives**  
User-created logic to modify DOM.

---

## 2. Why Directives Are Important?

- They make templates dynamic  
- They allow looping, conditions, styling, event control  
- They reduce JavaScript DOM manipulation  
- They follow Angular’s reactive pattern

---

## 3. How Templates Use Directives?

Templates can contain Angular expressions such as:

```html
<h1 *ngIf="isLoggedIn">Welcome User</h1>
<li *ngFor="let item of items">{{item}}</li>
<div [ngClass]="{active: isActive}">Box</div>
<button (click)="toggle()">Toggle</button>
