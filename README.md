# Welcome to bitsky-ui 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000) ![Prerequisite](https://img.shields.io/badge/node-%3E%3D10.0.0-blue.svg) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://docs.bitsky.ai) [![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202-yellow)](#)

> UI code for BitSky

### 🏠 [Homepage](https://bitsky.ai)

## Prerequisites

- node >=10.0.0

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Run tests

```sh
npm run test
```

## FAQ

### How to add a menu to left navigation

1. Add following code to `menuRouters` in `config/config.*.js`

```js
{
    path: '/app/example',
    name: 'example',
    icon: 'info-circle',
    component: './Example',
}
```

> Find more information about [Menu Item Data Structure](https://prolayout.ant.design/#menudataitem)

2. Now you need to add a `locale` string to `src/locales/en-US/menu.js`. In this example, the key should be `menu.example`

3. Add a file `Example.js` to `src/pages`

```js
import Example from '@/containers/Example';
import React from 'react';

export default () => <Example />;
```

Now you need to add a `Example` folder and implement your UI

## Author

👤 **BitSky**
