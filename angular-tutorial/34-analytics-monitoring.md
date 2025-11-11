# Analytics & Monitoring

Collect page views, events, vitals, and traces; alert on errors and SLIs.

```ts
// basic web vitals hook (pseudo)
new PerformanceObserver(list => console.log(list.getEntries())).observe({type:'largest-contentful-paint', buffered:true});
```
**Expected output:** Dashboards track health; regressions trigger alerts; user journeys are measurable.
