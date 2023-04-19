// const useTraverseTree = () => {
//     function insertNode(tree, folderId, item, isFolder) {
//         if (tree.id === folderId && tree.isFolder) {
//             tree.items.unshift({
//                 id: new Date().getTime(),
//                 name: item,
//                 isFolder,
//                 items: []
//             });
//             return tree;
//         }
//         let latestNode = [];
//         latestNode = tree.items.map((obj) => {
//             return insertNode(obj, folderId, item, isFolder);
//         });
//         return { ...tree, items: latestNode };
//     }
//     function updateNode(tree, folderId, itemName) {
//         if (tree.id === folderId) {
//             tree.name = itemName;
//             return tree;
//         }
//         let latestNode = [];
//         latestNode = tree.items.map((ob) => {
//             return updateNode(ob, folderId, itemName);
//         });

//         return { ...tree, items: latestNode };
//     }

//     function deleteNode(tree, folderId) {
//         if (tree.id === folderId) {
//             delete tree.name;
//             delete tree.items;
//             delete tree.isFolder;
//             return tree;
//         }
//         let latestNode = [];
//         let filteredNodes = tree.items.filter((ob) => ob.id !== folderId);
//         latestNode = filteredNodes.map(ob => deleteNode(ob, folderId));
//         console.log(latestNode, "latestNode");

//         return { ...tree, items: latestNode };
//     }
//     return { insertNode, updateNode, deleteNode };
// }

// export default useTraverseTree;

const useTraverseTree = () => {
    function insertNode(tree, folderId, itemName, isFolder) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: itemName,
                isFolder,
                items: [],
            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, folderId, itemName, isFolder);
        });

        return { ...tree, items: latestNode };
    }

    function updateNode(tree, folderId, itemName) {
        if (tree.id === folderId) {
            tree.name = itemName;
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return updateNode(ob, folderId, itemName);
        });

        return { ...tree, items: latestNode };
    }

    // function deleteNode(tree, folderId) {
    //     if (tree.id === folderId) {
    //         delete tree.name;
    //         delete tree.items;
    //         delete tree.isFolder;
    //         return tree;
    //     }


    //     let latestNode = [];
    //     let filteredNodes = tree.items.filter((ob) => ob.id !== folderId);
    //     latestNode = filteredNodes.map(ob => deleteNode(ob, folderId));
    //     console.log(filteredNodes, latestNode, "filteredNodes", "latestNode");
    //     return { ...tree, items: latestNode };
    // }

    //error with the code is that if we delete the last child the entire tree gets deleted - running code
    function deleteNode(tree, folderId) {
        if (tree.id === folderId) {
            return null; // remove this node from the tree
        }

        const items = tree.items;
        const index = items.findIndex(ob => ob.id === folderId); // find the index of the node with the given folderId
        if (index !== -1) {
            items.splice(index, 1); // remove the node at the given index from the array
        }

        const updatedNodes = items
            .map(ob => deleteNode(ob, folderId))
            .filter(ob => ob !== null); // recursively delete child nodes that match the folderId and remove the null values

        return {
            ...tree,
            items: updatedNodes // update the child nodes of this node
        };
    }

    return { insertNode, updateNode, deleteNode };
};

export default useTraverseTree;

