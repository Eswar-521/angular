# Components & Lifecycle 

In Angular, everything starts with **components**.  
A component controls:
- The UI (HTML)
- The logic (TypeScript)
- The styling (CSS)

Angular uses **Lifecycle Hooks** to manage the different stages of a component’s life.

## 1. What is Component Lifecycle?

Every component goes through a cycle:
1. **Creation** → Component instance is created.
2. **Rendering** → Template (HTML) appears on the screen.
3. **Update** → Values change (like name = 'Angular'), UI updates.
4. **Destruction** → Component is removed from the screen.

Angular provides lifecycle hook methods that run at each stage.

## 2. Common Lifecycle Hooks 

`Hook` : ngOnInit()
`When it Runs` : After component is created & first template render 
`Why it's Used` : Fetch data, initialize variables 

`Hook` : ngOnDestroy
`When it Runs` : Before component is Removed 
`Why it's Used` : Cleanup: unsubscribe, remove timers, detach listeners 

`Hook` : ngAfterViewInt() 
`When it Runs` : After view (HTML) is fully rendered 
`Why it's Used` : Access DOM, ViewChild elements 

`Hook` : ngChanges() 
`When it Runs` :  When `@Input()` values change 
`Why it's Used` :  React to parent updates 

---

## 3. What Are Standalone Components?

Before Angular 15, every component had to be added to an **NgModule**.

Now, you can write standalone components:

```ts
standalone: true
```

### Advantages : 

- No need for NgModule

- Components become simpler

- You import only what you need in each component

- Better performance and tree-shaking


### 4. What Are Component Imports?

- Standalone components need their own dependencies.

Example:
```js
imports: [CommonModule]
```

This is where you include:

- CommonModule (ngIf, ngFor, etc.)

- Other components

- Pipes

- Directives

`This replaces NgModule declarations.`

