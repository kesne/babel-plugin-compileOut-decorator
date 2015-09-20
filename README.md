# babel-plugin-compileOut-decorator
A babel plugin that takes a `compileOut` decorator and removes the code associated with it. 

## Usage
Install via NPM 
```bash
$ npm install --save-dev babel-plugin-compileout-decorator
```

Head on over to Babel's documentation on [plugins](https://babeljs.io/docs/advanced/plugins/#usage) for documentation on using plugins with Babel. 

Ensure that you have ES7 decorator support enabled. One way to do this is to use a `.babelrc` that looks similar to this: 

```json
{
  "stage": 2,
  "optional": ["es7.decorators"], 
  "plugins": ["babel-plugin-compileout-decorator"]
}
    
```
See [this link](https://babeljs.io/docs/usage/experimental/) for more information on enabling experimental features in Babel. 

### Syntax
Once you have installed and included the compileOut-decorator plugin, you can use it in your transpiled JavaScript files as such: 

#### Usage - Simple
```javascript
  let someObj = {
      @compileOut
      removeThisKey: 'please',
      foo: 'bar'
  }
  console.log(someObj); // Object {foo: 'bar'}
```

#### Usage - Complex
```javascript
  let someObj = {
    @compileOut('production')
    removeThisKey: 'please',
    foo: 'bar'
  }
  console.log(someObj) // When NODE_ENV = 'production', output = Object {foo: 'bar'}
```

Note that the argument passed to the `compileOut` decorator must be a string literal and that it is compared against the value of `NODE_ENV` to determine whether or not the node should be compiled out. 
