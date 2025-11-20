# 13 Lifecycle Hooks

#  Angular Lifecycle Hooks

Angular components go through different stages from creation → update → destruction.  
At each stage, Angular triggers special methods called **Lifecycle Hooks**.

These hooks allow you to run code at exactly the right moment in a component’s life.

---

## ⭐ Why Lifecycle Hooks?

Lifecycle hooks help you:
- Run code when component loads
- Detect when data changes
- Access the DOM after view loads
- Clean up before component is removed
- Initialize values and call services

---

## ⭐ List of Important Lifecycle Hooks

| Hook | When It Runs | Meaning |
|------|--------------|---------|
| **ngOnInit()** | After component is created | Best place to load data |
| **ngOnChanges()** | When @Input value changes | Respond to input updates |
| **ngDoCheck()** | Every change detection | Custom change tracking |
| **ngAfterContentInit()** | After content projection | After `<ng-content>` loads |
| **ngAfterContentChecked()** | After projected content checked | Rarely used |
| **ngAfterViewInit()** | After component view loads | Access DOM safely |
| **ngAfterViewChecked()** | After view re-checked | Avoid heavy logic here |
| **ngOnDestroy()** | Before component is destroyed | Cleanup, unsubscribe |

---

##  Easy Memory Trick

- **Born → ngOnInit()**  
- **Growing → ngOnChanges(), ngDoCheck()**  
- **View Ready → ngAfterViewInit()**  
- **Death → ngOnDestroy()**

---

## ⭐ Most Important Hooks for Beginners

###  `ngOnInit()`
Runs **once** when the component loads.

Use for:
- Loading API data  
- Initializing variables  
- Default values  

**Example (from our project):**

```ts
ngOnInit() {
  this.load();  // Loads student list when HomeComponent opens
}
```

##  ngOnDestroy()

Runs when you leave the page or when component is removed.

Use for:

- Unsubscribing from observables

- Clearing timers

- Removing event listeners

Example:

```js
ngOnDestroy() {
  console.log("Component removed");
}
```

## Hooks 

| Hook                      |  Why it is useful                  |
| ------------------------- | ------------------------------------ |
| **ngOnChanges**           | When @Input() data changes           |
| **ngOnInit**              | Component created for the first time |
| **ngDoCheck**             | Manual change detection              |
| **ngAfterContentInit**    | After content projection loads       |
| **ngAfterContentChecked** | After content is checked             |
| **ngAfterViewInit**       | After view/template loads            |
| **ngAfterViewChecked**    | After view check completed           |
| **ngOnDestroy**           | Before component is destroyed        |

