# match.js
**match.js** is a small plugin that you can include in your projects and libraries. Its aim is to prevent repetitive syntax usage in if/else statements and defy the ugliness of both switch/case and if/else.

With **match.js**, this plain javascript example:
```js
if (target === "div-1") {
    divType = 1
    console.log('first div clicked')
    document.body.style.backgroundColor = "red"
} else if (target === "div-2") {
    divType = 2
    console.log('second div clicked')
    document.body.style.backgroundColor = "green"
} else if (target === "div-3") {
    divType = 3
    console.log('third div clicked')
    document.body.style.backgroundColor = "blue"
} else {
    console.log('no div clicked')
}
```
turns into this:
```js
match(target)
    .case(["div-1", "div-2", "div-3"])
    .do([
        () => divType = 1,
        () => divType = 2,
        () => divType = 3
    ]).do([
        () => console.log('first div clicked'),
        () => console.log('second div clicked'),
        () => console.log('third div clicked'),
        () => console.log('no div clicked')
    ]).do([
        () => document.body.style.backgroundColor = "red",
        () => document.body.style.backgroundColor = "green",
        () => document.body.style.backgroundColor = "blue",
    ])
```
You can even shorten it further, preventing repetition in code:
```js
match(target)
    .case(["div-1", "div-2", "div-3"])
    .do([1, 2, 3], (el) => divType = el)
    .do([
        () => console.log('first div clicked'),
        () => console.log('second div clicked'),
        () => console.log('third div clicked'),
        () => console.log('no div clicked')
    ])
    .do(["red", "green", "blue"], (el) => document.body.style.backgroundColor = el)
```

**Does readability increase?** Well yes, even before you get used to the above articulation. The ordering makes iteasy to read. This ordering can't be achieved with clsasical if-else or switch-case.

**Ease of maintenance?** Improves significantly. Definitely results in more scalable code.

**Speed?** The above example is just 50% slower than its if/else complement. Not bad. (See the benchmark in https://jsperf.com/matchcase)

### A Small Warning
Everything you write inside the `array` variable of `.do(array,function)` gets automatically evaluated. Writing strings or numbers is safe, however if you write functions like `[fn1(),fn2()]`, make sure you do it in this fashion: `[() => fn1(), () => fn2()]`. This way, they do not get automatically evaluated and slow down the code. See:

Do **not**:
```js
match(getWhat)
    .case(["width", "height", "x", "y"])
    .do([
        elem.getBoundingClientRect().width,
        elem.getBoundingClientRect().height,
        elem.getBoundingClientRect().x,
        elem.getBoundingClientRect().y
    ], (el) => temp = el)
```
Instead, do:
```js
match(getWhat)
    .case(["width", "height", "x", "y"])
    .do([
        () => elem.getBoundingClientRect().width,
        () => elem.getBoundingClientRect().height,
        () => elem.getBoundingClientRect().x,
        () => elem.getBoundingClientRect().y
    ], (el) => temp = el)
```
Moreover, this one also gives the same result:

```js
match(getWhat)
    .case(["width", "height", "x", "y"])
    .do([
        () => {temp = elem.getBoundingClientRect().width},
        () => {temp = elem.getBoundingClientRect().height},
        () => {temp = elem.getBoundingClientRect().x},
        () => {temp = elem.getBoundingClientRect().y}
    ])
```
