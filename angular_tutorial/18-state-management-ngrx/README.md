# 18 State Management Ngrx



##  What is State?

**State means the data that your application currently holds.**

Examples:
- Logged-in user
- List of students
- Selected student
- Form inputs
- Cart items (in e-commerce)
- Theme (dark/light)

Whenever this data changes → the UI should update.

This process is called **State Management**.

---

##  Why Do We Need State Management?

Because in any app:

- Components need to **share data**
- Data needs to be **updated and shown everywhere**
- UI must react whenever the data changes
- We don’t want to duplicate data in many places

Good state management gives:
 Cleaner code  
 Less bugs  
 Easy debugging  
 Faster development  

---

##  State in Angular (Simple Levels)

Angular has 3 common ways to manage state:

### **1. Local State (inside a component)**
Data stored inside one component.

Example:
```ts
students = [];
```
## 2. Shared State using Services

- Service stores common data so multiple components can share it.

- This is what our project already uses.


## 3. Global State (NgRx, Signals Store, Akita)

- Used for very large apps.

## State Management in OUR Student Project

Your app uses Service-Based State Management.

This means:

- The Student Service holds the student list (state)

- All components (Home, Add, Edit) use the same state

- When state changes → UI updates

## In Project 

**StudentService holds the state**
```js
private students: Student[] = [
  { id: 1, name: 'Ram', age: 20 },
  { id: 2, name: 'Sita', age: 21 }
];

getStudents(): Observable<Student[]> {
  return of([...this.students]);
}
```

 `Means`
This service holds the main student data for the entire app.
This is your application state.


## Here what is State Management 

- State Management is the technique of storing application data in one central place and keeping the UI updated whenever the data changes.

- State Data of the application

- Angular manages state using components, services, or global stores

- project uses service-based state management

- Add/Edit/Delete functions update the shared state

- Components always show the latest state

- Signals can also be used for state

