# 05 Templates And Data Binding

# 📌 Angular Templates & Data Binding  
Understanding Templates and Data Binding is the MOST important part of Angular.  

## What is a Template?  
- A template is the HTML inside a component that defines what the user sees on the screen.

A template contains:
- normal HTML
- Angular syntax
- bindings ({{ }}, [ ], ( ), [( )])
- directives (*ngIf, *ngFor)
- components (<app-student-card>)

🔥 Example from our project: home.component.html

 This HTML is a template because it has:

- Angular directive → `*ngFor`

- Property binding → [student]=`"s"`

- Event binding → (click)=`"delete(s.id)"`

- Router link → routerLink=`"/add"`

- Child component → `<app-student-card>`

## What is Data Binding?  
- Data Binding = Connecting TypeScript data to HTML template

It allows:

- UI → automatically updates when data changes

- User input → updates the component variables

### Angular has **4 types of Data Binding**

| Binding Type       | Syntax             | Direction     | Meaning                  | Example |
|-------------------|--------------------|---------------|--------------------------|---------|
| **Interpolation** | `{{ value }}`      | TS → HTML     | Display dynamic values   | `{{ student.name }}` |
| **Property Binding** | `[property]`    | TS → HTML     | Pass data to elements/components | `[student]="data"` |
| **Event Binding** | `(event)`          | HTML → TS     | Capture user actions     | `(click)="delete(id)"` |
| **Two-way Binding** | `[(ngModel)]`    | TS ↔ HTML     | Sync UI input & variable | `[(ngModel)]="student.name"` |

---

## 📘 Summary  
- Use **Interpolation** when you want to show values in UI.  
- Use **Property Binding** when sending values to components or HTML properties.  
- Use **Event Binding** when responding to user actions.  
- Use **Two-way Binding** when building forms (input ↔ variable syncing).  



## Types of Data Binding ?
Definition

- Interpolation is used to display component variables in HTML.

Syntax:
```js
{{ variable }}
```
🔥 Example from Student Card Component
```js
<h3>{{ student.name }} ({{ student.name | initial }})</h3>
<p>Age: {{ student.age }}</p>
<p>Course: {{ student.course }}</p>
```
**Meaning**
- Whatever value is inside student.name, student.age, student.course 
- will appear in UI Called Variable



