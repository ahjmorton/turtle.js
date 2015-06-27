// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module 'turtle'.
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.turtle = factory();
    }
}(this, function () {
    'use strict';

    /*** YOUR LIBRARY CODE GOES HERE! ***/

    function Pen(context) {
      var x, y, angle, draw;
      init();

      function init() {
        x = 0;
        y = 0;
        angle = 360 - 90;
        draw = false;
      }

      function drawLine(oldX, oldY, newX, newY) {
        context.beginPath();
        context.moveTo(oldX, oldY);
        context.lineTo(newX, newY);
        context.stroke();
      }

      this.position = function() {
        return { x: x, y: y };
      }

      this.angle = function() {
        return angle;
      }

      this.turn = function(amount) {
        angle = (((angle + amount) % 360) + 360) % 360;
        return this;
      }

      this.turnRight = function(amount) {
        return this.turn(amount);
      }

      this.turnLeft = function(amount) {
        return this.turn(-amount);
      }

      this.isPenDown = function () {
        return draw;
      }

      this.penDown = function() {
        draw = true;
        return this;
      }

      this.penUp = function() {
        draw = false;
        return this;
      }

      this.strafeX = function(newX) {
         if(draw) {
           drawLine(x, y, newX, y);
         }
         x = newX;
         return this;
      }

      this.left = function(amount) {
        return this.strafeX(x - amount);
      }

      this.right = function(amount) {
        return this.strafeX(x + amount);
      }

      this.strafeY = function(newY) {
        if(draw) {
          drawLine(x, y, x, newY);
        }
        y = newY;
        return this;
      }

      this.up = function(amount) {
        return this.strafeY(y - amount);
      }

      this.down = function(amount) {
        return this.strafeY(y + amount);
      }

      this.moveTo = function(newX, newY) {
        if(draw) {
          drawLine(x, y, newX, newY);
        }
        x = newX;
        y = newY;
        return this;
      }
    }

    return {
      penFor: function(canvasNode) {
        if(typeof canvasNode === 'string') {
          canvasNode = document.getElementById(canvasNode);
        }
        if(!canvasNode) {
          console.error('Not a canvas node');
        } else {
          return new Pen(canvasNode.getContext('2d'));
        }
      }
    };
}));
