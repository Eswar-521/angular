

# 📌 Angular Pipes

A **Pipe** in Angular is a feature that transforms data in the template  
without changing the original value in the component.

Pipes are used **inside templates** using the `|` (pipe) operator.

Example:
```js
{{ value | pipeName }}
```
 
## 1. Why are Pipes Needed?

Pipes help format data such as:

- uppercase/lowercase strings

- dates

- currency

- numbers

- ## 1. What is a Pipe in Angular? (Full Definition)

- A **Pipe** in Angular is a **small, reusable transformation function** that is used **only in templates** to change **how a value is displayed** on the screen, **without changing the original data** in the component or service.

You always use a pipe with the `|` (pipe) symbol inside `{{ }}` or in a binding:

```html
{{ value | pipeName }}
{{ value | pipeName:arg1:arg2 }}
```


## Key Points 

- Pipe = Display Formatter

- A pipe does not store data.

- A pipe does not fetch data from API.

- A pipe only formats / transforms data that you already have.

Example:
```js
{{ 2.5 | currency:'USD' }}   <!-- $2.50 -->
{{ 'apple' | uppercase }}    <!-- APPLE -->
```

## Works Only in Templates

- Pipes are used in HTML templates (*.component.html), not directly in TypeScript code (unless you manually call them, which is rare for beginners).

Example from our product app 
```js
{{ appName | titlecase }}
{{ p.product_category | uppercase }}
{{ p.unit_price | currency:'USD' }}
```

## Does NOT Change Original Data

- The value in your component/service remains the same.

- Only the displayed value is changed.

Example:

```js
appName = 'angular product routing demo';
```
{{ appName | titlecase }}  <!-- shows: "Angular Product Routing Demo" -->


Inside TypeScript, `appName` is still `"angular product routing demo"`.

## Pure and Reusable

- A pipe is usually a pure function:

- same input → same output

- no side effects

- The same pipe can be used in many components.

Example:

- `currency` pipe is used in both:

- `products.component.html`

- `product-lookup`.component.html

## Two Types 

**Built-in Pipes** 

- `uppercase`, `lowercase`, `titlecase`

- `number`, `currency`, `date`, `percent`, etc.

**Custom Pipes** 

- Example in our app: categoryLabel pipe to convert:

- `FROZEN` → Frozen Foods

- `OFFICE SUPPLIES` → Office & Stationery

## Syntax Inside Template

Basic:
```js
{{ value | pipeName }}
```

With arguments:
```js
{{ value | pipeName:arg1:arg2 }}
```

- Multiple pipes (chaining):
```js
{{ value | pipe1 | pipe2 }}
```

## Example with Our Product App One Line

In products.component.html
```js
<p>
  Unit Price:
  {{ p.unit_price | currency:'USD' }}
</p>
```

- `p.unit_price` might be `2.5` in the data.

- `currency:'USD'` transforms it to `$2.50` for the user.

## 1.2 Why Pipes are Useful in Angular (Especially in Our Project)

They keep templates clean:

- No need to write formatting logic inside components.

- You just apply a pipe where you display the value.

They make UI consistent:

- All prices formatted the same way using currency pipe.

- All category names formatted uniformly (custom categoryLabel pipe).

They are easy to change

- If you decide to show INR instead of USD, you just change the pipe argument:

`{{ p.unit_price | currency:'INR' }}`

## 1.3 Short One-line Definition (Ready for Notes)

`Angular Pipe`
- A template-only formatter that takes a value, transforms it for display (like changing case, formatting currency, or prettifying category names), without modifying the original data, and is reusable across multiple components.

