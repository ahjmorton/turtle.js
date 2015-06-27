'use strict'

var assert = require('assert'),
    sinon = require('sinon'),
    lib = require('../lib/turtle.js').turtle;

describe('turtle.js', function() {

    var canvasMock, context, subject;

    beforeEach(function() {
        context = sinon.stub({
            beginPath: function() {},
            moveTo: function(oldX, oldY) {},
            lineTo: function(newX, newY) {},
            stroke: function() {}
        });
        canvasMock = {
            getContext: function() {
                return context;
            }
        };
        subject = lib.penFor(canvasMock);
    });


    it('should not draw when pen is up', function() {
        subject.penUp().moveTo(200, 200);
        var movements = [
            function() {
                subject.left(100);
            },
            function() {
                subject.right(100);
            },
            function() {
                subject.up(100);
            },
            function() {
                subject.down(100);
            },
            function() {
                subject.forward(50);
            },
            function() {
                subject.backward(50);
            },
            function() {
                subject.moveTo(10, 10);
            }
        ];
        movements.forEach(function(movementFunction) {
            movementFunction();
            assert(!context.beginPath.called);
            assert(!context.moveTo.called);
            assert(!context.lineTo.called);
            assert(!context.stroke.called);
            assert(!context.lineWidth);
            assert(!context.strokeStyle);
        });
    });

    it('should draw when pen is down', function() {
        subject.penDown().moveTo(200, 200);
        var movements = [
            function() {
                subject.left(100);
            },
            function() {
                subject.right(100);
            },
            function() {
                subject.up(100);
            },
            function() {
                subject.down(100);
            },
            function() {
                subject.forward(50);
            },
            function() {
                subject.backward(50);
            },
            function() {
                subject.moveTo(10, 10);
            }
        ];

        var functionsToCall = [
            context.beginPath,
            context.moveTo,
            context.lineTo,
            context.stroke
        ];
        movements.forEach(function(movementFunction) {
            movementFunction();

            functionsToCall.forEach(function(toCall) {
                assert(toCall.called);
                toCall.reset();
            });

            assert(context.lineWidth);
            delete context.lineWidth;

            assert(context.strokeStyle);
            delete context.strokeStyle;
        });
    });
    it('should apply color and width to draw', function() {
        var width = 5;
        var color = 'red';

        subject.moveTo(100, 100).penDown().color(color).width(width).forward(5);

        assert(context.stroke.called);
        assert.equal(context.lineWidth, width);
        assert.equal(context.strokeStyle, color);
    });
});
