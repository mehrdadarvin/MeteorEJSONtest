import { EJSON } from 'meteor/ejson';

RegExp.prototype.options = function() {
  var opts = [];

  if (this.global) {
    opts.push('g');
  }

  if (this.ignoreCase) {
    opts.push('i');
  }

  if (this.multiline) {
    opts.push('m');
  }

  return opts.join('');
};

RegExp.prototype.clone = function() {
  var self = this;
  return new RegExp(self.source, self.options());
};

RegExp.prototype.equals = function(other) {
  var self = this;

  // if not an instance of regexp
  if (other instanceof RegExp !== true) {
    return false;
  }
  return EJSON.stringify(self) === EJSON.stringify(other);
};

RegExp.prototype.typeName = function() {
  return "RegExp";
};

RegExp.prototype.toJSONValue = function() {
  var self = this;
  return {
    'regex'   : self.source,
    'options' : self.options()
  };
};

EJSON.addType("RegExp", function(value) {
  return new RegExp(value['regex'], value['options']);
});