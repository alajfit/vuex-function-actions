# vuex-function-actions

[![Build Status](https://travis-ci.org/simoneb/vuex-function-actions.svg?branch=master)](https://travis-ci.org/simoneb/vuex-function-actions)
[![codecov](https://codecov.io/gh/simoneb/vuex-function-actions/branch/master/graph/badge.svg)](https://codecov.io/gh/simoneb/vuex-function-actions)
[![npm version](https://badge.fury.io/js/vuex-function-actions.svg)](https://badge.fury.io/js/vuex-function-actions)

| Refactor-friendly [Vuex](https://github.com/vuejs/vuex) actions and mutations, heavily inspired by [redux-actions](https://github.com/redux-utilities/redux-actions)

### Installation

```bash
$ npm install --save vuex-function-actions
```

The [npm](https://www.npmjs.com/package/vuex-function-actions) package provides a [CommonJS](http://webpack.github.io/docs/commonjs.html) build for use in Node.js, and with bundlers like [Webpack](http://webpack.github.io/) and [Browserify](http://browserify.org/). It also includes an [ES modules](http://jsmodules.io/) build that works well with [Rollup](http://rollupjs.org/) and [Webpack2](https://webpack.js.org)'s tree-shaking.

The [UMD](https://unpkg.com/vuex-function-actions@0.0.1/dist/vuex-function-actions.js) build (or the [minified](https://unpkg.com/vuex-function-actions@0.0.1/dist/vuex-function-actions.min.js) flavor) exports a global called `window.VuexFunctionActions` if you add it to your page via a `<script>` tag. We _don’t_ recommend UMD builds for any serious application, as most of the libraries complementary to Vuex are only available on [npm](https://www.npmjs.com/search?q=vuex). Note that this package has a peer dependency on Vuex, therefore if you use the UMD build, Vuex has to be included before.

### Motivation

In plain Vuex, actions and mutations have string keys, which is not very refactoring friendly. The aim of this library is to allow using functions rather than strings to:

- configure actions and mutations in the Vuex store
- import actions in components
- commit mutations in actions

### Usage

1. Define mutations

```js
/// mutations.js
import { createMutation } from 'vuex-function-actions'

export const storeIncrement = createMutation('STORE_INCREMENT', (state, { amount }) => {
  state.count += amount
})

```

2. Define actions

```js
/// actions.js
import { createAction } from 'vuex-function-actions'
import { storeIncrement } from './mutations'

export const incrementBy = createAction('INCREMENT_BY', ({ commit }, amount) => 
  // commit function mutations instead of strings
  commit(storeIncrement({ amount }))
)

```

1. Configure actions and mutations in the Vuex store

```js
import Vuex from 'vuex'
import { mapMutations } from 'vuex-function-actions'
import { storeIncrement } from './mutations'
import { incrementBy } from './actions'

new Vuex.Store({
  state: {
    count: 1
  },
  // use the `mapMutations` helper to inject mutations
  // accepts either an array or a variable number of arguments
  mutations: mapMutations(storeIncrement),
  actions: {
    incrementBy
  }
})
```

4. Inject and dispatch actions in Vue components

```html js
<!-- Component.vue -->
<template>
  <button @click="onClick">Click me!</button>
</template>

<script>
import { mapActions } from 'vuex-function-actions'
import { incrementBy } from './actions'

export default {
  /* ... */
  methods: {
    // use the `mapActions` helper to inject function actions
    // accepts either an array or a variable number of arguments
    ...mapActions(incrementBy),
    onClick() {
      // dispatch the injected actions in the usual way
      this.incrementBy(1)
    }
  }
}
</script>
```