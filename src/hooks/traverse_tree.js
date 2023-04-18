const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
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

    function deleteNode(tree, folderId) {
        if (tree.id === folderId) {
            delete tree.name;
            delete tree.items;
            delete tree.isFolder;
            return tree;
        }
    };
    return { insertNode, updateNode, deleteNode };
}

export default useTraverseTree;
