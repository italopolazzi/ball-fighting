const isEquivalent = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

const allEquivalentLength = (arr, val) => {
    return arr.filter(v => isEquivalent(v, val)).length
}

const a = { test: "a" }
const b = { test: "b" }
const c = { test: "c" }
const d = { test: "b" }
const e = { test: "b" }

const test = [a, b, c, d, e]

console.log(allEquivalentLength(test, b))