const mock = require('./mock');
const fs = require('fs');
const { dropRight, get } = require('lodash');

const dupa = [];

function paths(tree, parent = []) {
    if (Array.isArray(tree)) {
        tree.forEach(e => paths(e, parent))
    } else if (typeof tree === 'object') {
        parent = parent.concat(tree.id);
        tree.path = parent;
        if (tree.children) paths(tree.children, parent)
    }

    return tree;
}

const flatten = tree => {
    return tree.reduce((r, { children, checked, ...rest}) => {
        r.push(rest);
        if (children) r.push(...flatten(children));
        return r;
    }, [])
};

const dropParentPath = (array) => {
    return array.map(element => ({
        ...element,
        path: dropRight(element.path)
    }))
};


const result = dropParentPath(flatten(paths(mock)));
console.log(result)

fs.writeFile(__dirname + '/asd.json', JSON.stringify(result, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

// const getRecursive = (arr) => {
//     // console.log(arr);
//     // if (!arr.length) return [];
//     return arr.reduce((flat, i) => {
//
//
//         if (i.children > 0 && Array.isArray(i.children)) {
//             return flat.concat(getRecursive(i.children));
//         }
//
//         dupa.push(i);
//
//         return flat.concat(i);
//     }, []);
// };
//
// const result = flatten(mock);
//
// console.log(result);

