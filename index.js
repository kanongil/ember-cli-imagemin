/* jshint node: true */
'use strict';

var imagemin = require('broccoli-imagemin');

module.exports = {
  name: 'ember-cli-imagemin',

  included: function() {
    this._super.included.apply(this, arguments);

    this.enabled = this.app.env === 'production'
    this.imageminOptions = this.app.options.imagemin = this.app.options.imagemin || {};

    if ('enabled' in this.imageminOptions) {
      this.enabled = this.imageminOptions.enabled;
      delete this.imageminOptions.enabled;
    }

    if (!this.imageminOptions.plugins || this.imageminOptions.plugins.length === 0) {
      this.enabled = false;
    }
  },

  postprocessTree: function(type, tree) {
    if (this.enabled) {
      tree = new imagemin(tree, this.imageminOptions);
    }

    return tree;
  }
};
