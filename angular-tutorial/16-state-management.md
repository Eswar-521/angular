# State Management 

## 1. What Is State Management?

State management means controlling and organizing **shared data** in your application.

Examples of state:
- Logged-in user details
- Cart items
- Notifications
- Form data
- UI flags (dark mode, sidebar open)
- API response cache
- Selected products or filters

The goal of state management is:
- Keep data **centralized**
- Avoid inconsistent values across components
- Update UI automatically when data changes
- Prevent unnecessary API calls
- Make debugging easier

---

## 2. Why Do We Need State Management?

Without proper state:
- Components become tightly coupled  
- Data is duplicated  
- Updates become unpredictable  
- Bugs appear due to mismatched states  

Good state management ensures:
- Predictability  
- Reusability  
- Easy testing  
- Cleaner components  

---

## 3. How Signals Improve State Management

Before Angular 16, state was mostly handled with:
- RxJS BehaviorSubjects  
- NgRx (Redux pattern)  
- Services with Observables  

Now, Signals allow:
- Simpler global state  
- No subscriptions needed  
- Direct state access  
- Synchronous updates  
- Very fast reactivity  

The **Signals Store Pattern** looks like a mini NgRx, but without complexity.

---

## 4. What Makes a Good Store?

A good store should:
- Hold application data
- Allow safe read/write access
- Expose computed values
- Provide updater functions
- Contain side effects inside effects()
- Be reusable across many components

---

## 5. How the Signals Store Works

A Store typically contains:
- **Signals** for data  
- **Computed signals** for derived data  
- **Methods** to update signals  
- **Effects** for logging, caching, API calls  

It is a simple class used like:
```ts
store.count();   // read  
store.increment();  // update  
store.double();  // computed  
```

## 6. Expected Behavior of a Store

- Holds global data in one place

- UI automatically updates when store values change

- Logic stays centralized (not scattered across components)

- Computed properties auto-update

- Easy testing

- Easy expansion as app grows