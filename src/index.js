export default function ({ Plugin, types: t }) {
  return new Plugin('compileout-decorator', {
    visitor: {
      Decorator(node, parent) {
        // Get the decorator expression:
        let expression = this.get('expression');

        // The simple case: The decorator with no arguments.
        if (expression.isIdentifier({name: 'compileOut'})) {
          return this.parentPath.dangerouslyRemove();
        }

        // The complex case: Argument for NODE_ENV passed:
        if (expression.get('callee').isIdentifier({name: 'compileOut'})) {
          // Grab the first argument:
          let envs = expression.get('arguments');

          for (let i = 0; i < envs.length; i++){
            let env = envs[i];
           // Ensure that the argument is a string:
            if (env.isLiteral() && typeof env.node.value === 'string') {
              // If the NODE_ENV is the same as the string value passed, compile out the node:
              if (environment === env.node.value) {
                return this.parentPath.dangerouslyRemove();
              }
            } else {
              throw new SyntaxError('Arguments passed to @compileOut() decorator must be string literals.');
            }
          }

          // If we hit this point, we want to keep the code in.
          // So let's remove this decorator and move on.
          this.dangerouslyRemove();
        }
      }
    }
  });
}