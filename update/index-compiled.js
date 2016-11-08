'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
exports.default = update;
function update(old, toChange) {
    if ((typeof toChange === 'undefined' ? 'undefined' : _typeof(toChange)) === 'object' && toChange !== null) {
        // When command is not depth
        var keys = Object.keys(toChange);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _key = _step.value;

                if (command.hasOwnProperty(_key)) {
                    return command[_key](toChange[_key], old);
                }
            }
            // When command is depth on object
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var finalOld = {};
        for (var key in old) {
            if (old.hasOwnProperty(key)) {
                finalOld[key] = old[key];
            }
        };
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _key2 = _step2.value;

                var newValue = undefined;

                if (_typeof(toChange[_key2]) === 'object' && toChange !== null) {
                    newValue = update(old[_key2], toChange[_key2]);
                }
                finalOld[_key2] = newValue;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return finalOld;
    } else {
        throw new Error('Please! Insert an object as 2nd parameter');
    }
}

var command = {
    $push: function $push(value, old) {
        value.map(function (val) {
            return old.push(val);
        });
        return old;
    },
    $unshift: function $unshift(value, old) {
        value.map(function (val) {
            return old.unshift(val);
        });
        return old;
    },
    $splice: function $splice(value, old) {
        old.splice(value[0][0], value[0][1], value[0][2]);
        return old;
    },
    $merge: function $merge(value, old) {
        return Object.assign({}, old, value);
    },
    $set: function $set(value, old) {
        return value;
    },
    $apply: function $apply(value, old) {
        return value(old);
    },
    $delete: function $delete(value, old) {
        value.map(function (val) {
            return delete old[val];
        });
        return old;
    }
};
