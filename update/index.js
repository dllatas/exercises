export default function update(old, toChange) {
    if (typeof toChange === 'object' && toChange !== null) {
        // When command is not depth
        const keys = Object.keys(toChange);
        for (let key of keys) {
            if (command.hasOwnProperty(key)) {
                return command[key](toChange[key], old);
            }
        }
        // When command is depth on object
        let finalOld = {};
        for (var key in old) {
            if (old.hasOwnProperty(key)) {
                finalOld[key] = old[key];
            }
        };
        for (let key of keys) {
            let newValue;
            if(typeof toChange[key] === 'object' && toChange !== null) {
                newValue = update(old[key], toChange[key]);
            }
            finalOld[key] = newValue
        }
        return finalOld;
    }
    else {
        return "Please insert object";
    }
}

var command = {
    $push(value, old) {
        value.map((val) => old.push(val));
        return old;
    },
    $unshift(value, old) {
        value.map((val) => old.unshift(val));
        return old
    },
    $splice(value, old) {
        old.splice(value[0][0], value[0][1], value[0][2]);
        return old;
    },
    $merge(value, old) {
        return Object.assign({}, old, value);
    },
    $set(value, old) {
        return value;
    },
    $apply(value, old) {
        return value(old);
    },
    $delete(value, old) {
        value.map((val) => delete old[val]);
        return old;
    }
}