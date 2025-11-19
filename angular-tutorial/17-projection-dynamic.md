# Content Projection & Dynamic Projection in Angular

## 1. What Is Content Projection?

Content Projection allows you to pass **HTML content from a parent component** into a **child component’s template**.

It is like “inserting” HTML into another component, similar to **slots** in Web Components or **children** in React.

Example:
A <card> component can receive content like:
- Title
- Description
- Buttons

The child decides *where* the content goes.

---

## 2. Single-Slot Projection (Basic)

Using `<ng-content></ng-content>`, the child component displays **whatever HTML** the parent passes inside it.

Parent:
```html
<app-card> Hello </app-card>
```

Child : 

```js
<ng-content></ng-content>
```

- The word “Hello” is displayed inside the card.


## 3. Multi-Slot Projection

You can project multiple dynamic sections using select="".

Example:

- `<ng-content` select="[header]"> → projects header content

- `<ng-content` select="[body]"> → projects main content

- `<ng-content` select="[footer]"> → projects footer buttons

Parent decides what content goes where.

## 4. What Is Dynamic Projection?

Dynamic Projection means the projected content can change:

- Based on conditions

- Based on user interaction

- Based on dynamic HTML

- Based on API data

This is useful for: 

- Tabs

- Accordions

- Dynamic layouts

- Reusable UI components

- Flexible dashboard widgets

Dynamic projection uses:

- *ngIf

- *ngFor

- @ViewChild + TemplateRef

- <ng-container>

## 5. Why Projection Is Important?

- Creates reusable UI components

- Separates logic from presentation

- Lets parent define layout content

- Removes duplication across pages

- Makes components flexible and customizable


## 6. Expected Behavior

- Parent passes HTML to child

- Child chooses where to display it

- Multiple areas can receive different content

- Dynamic conditions can change what is projected