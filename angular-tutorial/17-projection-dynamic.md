# Content Projection & Dynamic Components

Project arbitrarily shaped content and render components dynamically.

```html
// template
<card>
  <h2 title>Header</h2>
  <p>Body</p>
  <button actions>OK</button>
</card>
```
**Expected output:** Named slots (select by attribute) render in the right spots; dynamic components mount into containers.
