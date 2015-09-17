# Church

Run your AWS Lambda (node.js) functions locally.

Church is API compatible with AWS so you should be able to use your favourite language's AWS SDK and things will "Just Work".

**Church is a partial implementation of the Lambda API and only provides the subset of functionality that I happened to need.**

## Usage

1. `npm install`
2. `node main.js`
3. Configure AWS SDK to use local endpoint (default: `http://localhost:3333`)
4. Update `config.json` with the names and paths of your lambda functions (Church assumes that your modules export a `handler` method for invoking the function)
