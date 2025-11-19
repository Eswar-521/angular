# Pipes in Angular 


## 1. What Are Pipes?

Pipes in Angular are used to **transform data in the template**.  
They do not change the original value — they only change how it is displayed.

Example:
- Convert text to uppercase
- Format dates
- Format currency
- Slice arrays
- Create custom formatting

Pipes make templates cleaner because you don’t need to write functions in TypeScript.

---

## 2. Built-in Pipes

Angular provides many built-in pipes:

### **String Pipes**
- `uppercase` → Converts text to UPPERCASE
- `lowercase` → Converts text to lowercase
- `titlecase` → Capitalizes every word

### **Number Pipes**
- `number` → Formats numbers
- `percent` → Converts to percent format
- `currency` → Formats money values

### **Date Pipes**
- `date` → Formats dates (short, medium, long)

### **JSON Pipe**
- `json` → Nicely displays an object as JSON

### **Slice Pipe**
- `slice` → Cuts part of a string or array

---

## 3. Why Pipes Are Useful?

- They format values directly in the template  
- No need for extra helper functions  
- Improve readability  
- Reusable across components  
- Easy to create custom formatting

Example:
```html
{{ price | currency:'INR' }}
```
