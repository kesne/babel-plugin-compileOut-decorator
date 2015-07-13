export default function ({ Plugin, types: t }) {
  return new Plugin('compileout-decorator', {
    visitor: {
      Decorator(node, parent) {
        // Get the decorator expression:
        var expression = this.get('expression');

        // The simple case: The decorator with no arguments.
        if (expression.isIdentifier({name: 'compileOut'})) {
          return this.parentPath.dangerouslyRemove();
        }

        // The complex case: Argument for NODE_ENV passed:
        if (expression.get('callee').isIdentifier({name: 'compileOut'})) {
          // Grab the first argument:
          var env = expression.get('arguments')[0];
          // Ensure that the argument is a string:
          if (env.isLiteral() && typeof env.node.value === 'string') {
            // If the NODE_ENV is the same as the string value passed, compile out the node:
            if (environment === env.node.value) {
              this.parentPath.dangerouslyRemove();
            } else {
              this.dangerouslyRemove();
            }
          } else {
            throw new SyntaxError('Arguments passed to @compileOut() decorator must be string literals.');
          }
        }
      }
    }
  });
}