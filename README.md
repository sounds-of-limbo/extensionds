# @sounds.of.limbo/extensions
Useful extensions for basic JS prototypes

## Table of Contents
1. [Installation](#installation)
2. [Basic usage](#basic-usage)
3. [Available extensions](#available-extensions)
	1. [Console](#console)

## Installation
Simply install it using NPM:
```bash
npm install @sounds.of.limbo/extensions
```

## Basic usage
To apply specific prototype extension, you have to `import` corresponding file at some point of you application:
```typescript
// Assuming some React application
import React from "react"
import "@sounds.of.limbo/dist/Console"

export default class App extends React.Component {
	componentDidMount() {
		console.ok("Application *has been mounted*!")
	}

	render() {
		console.say("Application is being rendered")
		return <main>
			<h1>
				Hello, world!
			</h1>
		</main>
	}
}
```

Note that since corresponding file will be imported, extended prototype will be available **GLOBALLY**, including runtime (e.g. web browser's console). This is the basic side-effect of the prototype extension.

## Available extensions

### Console
Extended with five colorful log methods:
 - `say` - cyan-colored, analogue of `console.log`
 - `nfo` - blue-colored, analogue of `console.info`
 - `ok` - lime-colored. Does not have analogues among basic console method. Typically being used for logging some success messages.
 - `hey` - yellow-colored, analogue of `console.warn`
 - `no` - red-colored, analogue of `console.error`

Despite some methods are marked as analogues, ***they are all still logging to the same level as `console.log` does***. This is due to only `console.log` supports color customizations.

Each method takes infinite number of parameters.
First parameter should be a string - this is the log message that will be colorfully customized. Other params will be logged as is.

You can make parts of the message to be written using **bold** font. To do this, just conclude desired part of message in asterisks (\*) (see screenshots below).

Here is how custom logs look like in the browser console:  
![console demo web](./static/images/console_demo_web.png)

and here is an example from the terminal (Node.js):  
![console demo web](./static/images/console_demo_node.png)