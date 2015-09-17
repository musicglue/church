var Context = function(res) {
  this.res = res;
}

Context.prototype.succeed = function(result) {
  console.log('Context#succeed', result);
  this.res
      .set({'X-Amz-Log-Result': ''})
      .send(result);
}

Context.prototype.fail = function(err) {
  console.log('Context#fail', err);
  this.res
      .set({'X-Amz-Function-Error': 'Handled', 'X-Amz-Log-Result': ''})
      .send({errorMessage: err});
}

Context.prototype.done = function(err, result) {
  if (err) { this.fail(err); }
  else     { this.succeed(result); }
}

module.exports = Context;
