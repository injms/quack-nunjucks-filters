# 🦆 Quack Nunjucks filters

A collection of small, simple, opinionated filters that can be used with Nunjucks and Eleventy.

## What do these filters do?

### `cssmin`

Takes a string of CSS and minifies it.

### `debug`

Does nothing apart from display the _thing_ in the console.

```javascript
{{ "hello world" | debug }} // returns "hello world" unchanged and logs "hello world" in the console
```

Can be used multiple times so you can see what something is before and after it goes through a filter:

```javascript
{{ "22 July 2020" | debug | humandate('pt') | debug }}

// returns "22 de julho de 2020"; also logs "22 July 2020" and then "22 de julho de 2020" in the console.
```

### `humandate`

Takes a date that can be understood by [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) and returns a human readable version.

```javascript
{{ '2020-06-23T20:07:58.800Z' | humandate }} // 23 July 2020
```

Supports internationalisation - pass in a langauage or a language-country code:

```javascript
{{ '2020-06-23T20:07:58.800Z' | humandate('pt') }} // 23 de junho de 2020
```

```javascript
{{ '2020-06-23T20:07:58.800Z' | humandate('es-HN') }} // 23 de junio de 2020
```

### `markdownify`

Takes a string of Markdown and returns a string of HTML. A simple wrapper around [MarkdownIt](https://github.com/markdown-it/markdown-it).

```javascript
{{ '*bold* text' | markdownify | safe }} // <b>bold</b> text
```

The markdownify filter requires use of [Nunjuck's `safe` filter](https://mozilla.github.io/nunjucks/templating.html#safe) to output - so make sure you trust the string being markdownified.

Credit where credit is due, this idea was completely pinched from [Hugo's markdownify function](https://gohugo.io/functions/markdownify/).

## Set up

Requires Node 14.x and npm 6.x.

### Installation

First install this as a dependency in your project:

```bash
npm install @injms/quack-nunjucks-filters
```

### Using in Nunjucks

```javascript
const nunjucks = require('nunjucks')

const {
  cssmin,
  debug
  humandate,
  isodate,
  markdownify,
} = require('@injms/quack-nunjucks-filters')

const env = new nunjucks.Environment()

env.addFilter('cssmin', (css) => cssmin(css))
env.addFilter('debug', (thing) => debug(thing))
env.addFilter('humandate', (datestring, locale) => isodate(datestring, locale))
env.addFilter('isodate', (datestring) => isodate(datestring))
env.addFilter('markdownify', (markdown) => md.render(markdown)) // Note the use of render()
```

And now you can use these filters wherever you use `env` to render markup; for example:

```javascript
env.renderString('<time datetime="{{ date | isodate }}">{{ date | humandate('en-AU') }}</time>', { date: 1592942878800 })
```

gives:

```html
<time datetime="2020-06-23T20:07:58.800Z">23 July 2020</time>
```

### Using with Eleventy

Import the filters into the `.eleventy.js` file:

```javascript
// .eleventy.js

const {
  cssmin,
  debug
  humandate,
  isodate,
  markdownify,
} = require('@injms/quack-nunjucks-filters')

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('cssmin', (css) => cssmin(css))
  eleventyConfig.addFilter('debug', (thing) => debug(thing))
  eleventyConfig.addFilter('humandate', (datestring, locale) => isodate(datestring, locale))
  eleventyConfig.addFilter('isodate', (datestring) => isodate(datestring))
  eleventyConfig.addFilter('markdownify', (markdown) => md.render(markdown))

  // rest of Eleventy's config and setup
}
```

Now these can be used in the template:

```njk
<!-- blog-post.njk -->

<h2>{{ blog_post_title }}</h2>
<time datetime="{{ publish_time | isodate }}">
  {{ publish_time | humandate }}
</time>

<h3>Author</h3>
{{ author_biography | markdownify }}
```

## 🧪 Testing

Clone the repo; run `npm install`; and then run `npm test` will run all the tests.

Tests use [Mocha](https://mochajs.org/), [Chai](http://chaijs.com), and [Sinon](https://sinonjs.org/).

## 👔 Linting

`npm run lint` will lint all the JavaScript files.

This is linted using a slightly extended version of [standard](https://standardjs.com/). The only adjustment is that trailing commas - `comma-dangle` - are allowed to give a better diff.

## 🐞 Bugs and issues

Make sure to check the [issues page](https://github.com/injms/quack-nunjucks-filters/issues) before raising a new issue please - ta!
