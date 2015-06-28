/*! turtle.js - v0.0.2 - 2015-06-28
* http://github.com/ahjmorton/turtle.js
* Copyright (c) 2015 ; Licensed Unlicense */
// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module 'turtle'.
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.turtle = factory();
    }
}(this, function() {
    'use strict';

    function Pen(context) {
        var x, y, angle, draw, width, color;

        function init() {
            x = 0;
            y = 0;
            angle = 360 - 90;
            draw = false;
            width = 1;
            color = 'black';
        }

        init();

        function drawLine(oldX, oldY, newX, newY) {
            context.beginPath();
            context.moveTo(oldX, oldY);
            context.lineTo(newX, newY);
            context.lineWidth = width;
            context.strokeStyle = color;
            context.stroke();
        }

        this.position = function() {
            return {
                x: x,
                y: y
            };
        };

        this.angle = function() {
            return angle;
        };
        this.setAngle = function(newAngle) {
            angle = newAngle;
            return this;
        };
        this.turn = function(amount) {
            angle = (((angle + amount) % 360) + 360) % 360;
            return this;
        };

        this.turnRight = function(amount) {
            return this.turn(amount);
        };

        this.turnLeft = function(amount) {
            return this.turn(-amount);
        };

        this.isPenDown = function() {
            return draw;
        };

        this.penDown = function() {
            draw = true;
            return this;
        };

        this.penUp = function() {
            draw = false;
            return this;
        };

        this.strafeX = function(newX) {
            if (draw) {
                drawLine(x, y, newX, y);
            }
            x = newX;
            return this;
        };

        this.left = function(amount) {
            return this.strafeX(x - amount);
        };

        this.right = function(amount) {
            return this.strafeX(x + amount);
        };

        this.strafeY = function(newY) {
            if (draw) {
                drawLine(x, y, x, newY);
            }
            y = newY;
            return this;
        };

        this.up = function(amount) {
            return this.strafeY(y - amount);
        };

        this.down = function(amount) {
            return this.strafeY(y + amount);
        };

        this.moveTo = function(newX, newY) {
            if (draw) {
                drawLine(x, y, newX, newY);
            }
            x = newX;
            y = newY;
            return this;
        };

        this.forward = function(amount) {
            var radians = angle * Math.PI / 180;
            var newX = x + (amount * Math.cos(radians));
            var newY = y + (amount * Math.sin(radians));

            return this.moveTo(newX, newY);
        };

        this.backward = function(amount) {
            return this.forward(-amount);
        };

        this.width = function(newWidth) {
            width = newWidth;
            return this;
        };

        this.color = function(newColor) {
            color = newColor;
            return this;
        };
    }

    return {
        penFor: function(canvasNode) {
            if (typeof canvasNode === 'string') {
                canvasNode = document.getElementById(canvasNode);
            }
            if (!canvasNode) {
                console.error('Not a canvas node');
            } else {
                return new Pen(canvasNode.getContext('2d'));
            }
        }
    };
}));
