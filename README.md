# vue-doctitle

> Simple plugin for switching document title on transitions between routes (for VueRouter)

## Installation

You can install this plugin globally or included in `dependencies` (in package.json)

```bash
$ npm install vue-doctitle
```

## Functionality and features
- Switching page(document) title on transitions between routes



## Integration

To use `VueDocTitle` in your app:

### 1. Simple Way:

#### Importing and wrap VueRouter by VueDocTitle plugin

> In your entry point (usually it's index.js or main.js)

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueDocTitle from 'vue-doctitle'

...(ignore lines of codes)

var router = new VueRouter({
	// your set of options
})
VueDocTitle.wrap(router, { defTitle: 'my app' }) // defTitle in param 2, means default title if not set in any routes
router.map({
	'': {
    	component: Index
    },
    'a': {
    	component: A,
    	doctitle: 'my app - component a' // special document title of component A
    }
    ...(other routes)
})
router.start(...) // start

...(ignore lines of codes)
```

**NOTE:**
> `VueDocTitle.wrap` must be invoked before `router.start`


### 2. Directive Way:

#### Importing and registering VueRouter plugin

> In your entry point (usually it's index.js or main.js)

```js
import Vue from 'vue'
import VueDocTitle from 'vue-doctitle'

...(ignore lines of codes)

Vue.use(VueDocTitle)
```

#### use directive in page components

1. dynamic (bind prop or data)

```html
<template>
	<template v-doctitle="boundPropsOrData"></template>
	<...> <!-- other elements of component -->
</template>
```

2. literal

```html
<template>
	<template v-doctitle.literal="my app - component xx"></template>
	<...> <!-- other elements of component -->
<template>
```


**NOTE:**
> Ways above can be used together
> if both ways used, the directive way is prior


