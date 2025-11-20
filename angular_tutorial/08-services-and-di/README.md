# 08 Services And Di

# 📌 Angular Services & Dependency Injection (DI)

Services in Angular are used to write **reusable logic**, such as:
- data handling  
- business logic  
- API calls  
- shared utilities  

Services are **not directly connected to UI**.  
They are used by components to perform actions.

## What is a Service?

In Angular:

- A Service is a class marked with @Injectable()
that contains shared logic used across components.

**Why Services?**

- To separate business logic from UI code

- To avoid code duplication

- To share data between components

- To fetch/update/delete data (API or in-memory)


## Service Used in Our Student Manager Project

Your project uses StudentService to manage all student operations.

📌 File: services/student.service.ts
```js
@Injectable({ providedIn: 'root' })
export class StudentService {

  private students: Student[] = [
    { id: 1, name: 'Ram', age: 20, course: 'BSc' },
    { id: 2, name: 'Sita', age: 21, course: 'BA' }
  ];

  getStudents() { return of([...this.students]); }

  getStudent(id: number) {
    return of(this.students.find(s => s.id === id)!);
  }

  addStudent(s: Student) {
    s.id = Date.now();
    this.students.push(s);
    return of(s);
  }

  updateStudent(id: number, s: Student) {
    const i = this.students.findIndex(st => st.id === id);
    this.students[i] = { ...s, id };
    return of(s);
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    return of(void 0);
  }
}
```

## What is Dependency Injection (DI)?

Dependency Injection is a design pattern where `Angular automatically provides required objects` (services) to a class (component).

- Instead of creating objects manually using new,
Angular injects them into components.

Example (WRONG):

```js
let service = new StudentService(); ❌
```

Example (CORRECT):
```js
constructor(private ss: StudentService) {} 
```

`This is DI.`

## Where DI is used in Our Project

Your components receive services through DI:

**Home Component DI** 
```js
constructor(private ss: StudentService) {}
```

**Injected Service**

StudentService (for loading & deleting students)

Add Student Component DI
constructor(private ss: StudentService, private router: Router) {}


Injected Services:

- StudentService → to add students

- Router → to navigate back to home page

**Edit Student Component DI**
```js
constructor(
  private route: ActivatedRoute,
  private ss: StudentService,
  private router: Router
) {}
```

**Injected Services:**

- ActivatedRoute → to read URL parameter id

- StudentService → to load & update student

- Router → navigate after update

## How Angular Knows Which Service to Inject?

Because your service has:

```js
@Injectable({ providedIn: 'root' })
```

- This makes it a singleton
- Available application-wide
- No need to register anywhere else
