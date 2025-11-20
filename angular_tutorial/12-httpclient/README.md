# 12 Httpclient

## What is HttpClient? (Clear Cut Definition)

**HttpClient is an Angular service used to make HTTP calls (GET, POST, PUT, DELETE) to a backend server or API.**

It allows Angular apps to communicate with REST APIs —
send requests, receive responses, and handle data over HTTP.

HttpClient supports:
- GET – fetch data
- POST – send new data
- PUT – update existing data
- DELETE – remove data
- Interceptors
- Error handling
- Observables (RxJS)

**To use it, Angular provides**
```js
provideHttpClient()
```

## Why HttpClient is important?

- Talks to backend API

- Loads data from server

- Sends form data

- Updates DB

- Deletes records

- Handles response & errors

- Works with Observables (async streams)


## HttpClient Flow (Simple Explanation)
```js
Component → Service → API → Response → Component → UI updates.
```

In realworld:

- Component does not call API directly

- Component calls service

- Service uses HttpClient

- Service returns Observable

- Component subscribes and updates UI


## In our project Http client 

```js
private students: Student[] = [...];

```

- Below is the same StudentService but using HttpClient.

## Here we have Injecting Http client, and GET, Post, Put, Delete 

**Injecting HttpClient**

```js
constructor(private http: HttpClient) {}
```
- HttpClient is injected using Angular’s Dependency Injection.


**Get All Student**
```js
getStudents(): Observable<Student[]> {
  return this.http.get<Student[]>(this.apiUrl);
}
```

- Calls GET http://localhost:3000/students

- Returns list of students

- Type-safe because of <Student[]>


**Get One Student**

```js 
getStudent(id: number) {
  return this.http.get<Student>(`${this.apiUrl}/${id}`);
}
```
- Loads one student by ID. 

**Post Method**

```js
return this.http.post<Student>(this.apiUrl, student);
```

- Sends new student data to server 

**Put Method**

```js
return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
```
- Updates student with given ID.

**DELETE Method**
```js
return this.http.delete<void>(`${this.apiUrl}/${id}`);
```

- Deletes student.

## Http Client 

**What is HttpClient?**
 - Angular service to make HTTP API calls. (HyperText Transfer Protocol)

**Why it is used?**
 - Communicate with backend, CRUD operations 

**How?**
 - Using http.get, http.post, http.put, http.delete 

**Data type?**
 - Returns Observables (async) 

**Where used?**
 - Inside Angular Services, NOT components 


## Why Angular Needs HTTP?

Because Angular apps:

- Load data from API

- Save form data

- Update changes

- Delete records

- Authenticate (login, signup)

Angular does this through HttpClient, but it works on top of HTTP protocol.

`HTTP is the communication protocol that defines how data is exchanged between client and server using methods like GET, POST, PUT, and DELETE.`