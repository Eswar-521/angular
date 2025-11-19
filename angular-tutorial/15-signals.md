# Angular Signals — Beginner to Advanced Explanation

## 1. What Are Signals?

Signals are a new reactivity system introduced in Angular 16+.  
A **signal** holds a value and notifies Angular whenever that value changes.

Think of a signal like a “state variable” that automatically updates:
- The template (HTML)
- Computed values
- Effects (side effects)
- Components that depend on it

Signals replace:
- RxJS Subjects for simple state
- @Input() setters in many cases
- Change detection complexity

---

## 2. Why Do We Need Signals?

Traditional Angular used:
- Zones → expensive change detection
- Observables → powerful but complex
- Input/Output → limited

Signals give:
- Simplicity like React’s `useState`
- Predictability (synchronous updates)
- Fine-grained reactivity (only affected views update)
- No async race
- Fewer change detection cycles

---

## 3. Types of Signals

### **1. Writable Signals**
Created with:
```ts
const count = signal(0);
```

We can update it using:

- `set(value)`

- `update(fn)`

- `mutate(fn)`

## 2. Computed Signals

These depend on other signals.
They re-run only when dependencies change.

Example:
```js
const double = computed(() => count() * 2);
```

## 3. Effects

Effects run automatically whenever signals inside them change.

Example:
```js
effect(() => console.log(count()));
```

Effects are used for:

- Logging

- Updating localStorage

- Triggering API calls

- Interacting with DOM or services

## 4. How Signals Work Internally

- When a signal value changes → Angular marks it dirty

- Only the components using that signal update

- No full component tree re-render

- Extremely fast compared to zone-based detection

## 5. Best Use Cases

- Component state (count, isOpen, showMenu)

- UI toggles and flags

- Form state

- Cached values

- Computed UI properties

- Local component logic

- Store pattern (mini NgRx alternatives)


## 6. Expected Behavior

In a signals-based component:

- signal() holds a state

- computed() recalculates automatically

- effect() runs when signal changes

- The template updates instantly

- State management becomes simple, predictable, and powerful.

