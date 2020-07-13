# `programming-linguist`

![Main](https://github.com/RomainMuller/programming-linguist/workflows/Main/badge.svg)
![Maintainability](https://api.codeclimate.com/v1/badges/0c45248e1d1a979ba092/maintainability)
![Test Coverage](https://api.codeclimate.com/v1/badges/0c45248e1d1a979ba092/test_coverage)

A library to facilitate generation of TypeScript code from TypeScript/Javascript
applications.

## Quick Start

### Installation

Add the library to your dependencies using your package manager of choice:

- `npm install programming-linguist`
- `yarn add programming-linguist`

### Usage

Start by creating a new `Project`, then add `SourceFile`s to it with statements
in those, and finally synthesize the `Project`:

```ts
import * as linguist from 'programming-linguist';

// Creating a root TypeScript Project
const project = new linguist.Project();

// Creating a new SourceFile in the project
const sourceFile = new linguist.SourceFile(project, 'index');

// Adding a new Interface declaration
new linguist.Interface(sourceFile, 'FooInterface', {
  documentation: 'This is an example interface',
  exported: true,
  name: 'FooInterface',
});

// Synthesizing the project into `/target/directory`:
project.synthesize('/target/directory');
```
