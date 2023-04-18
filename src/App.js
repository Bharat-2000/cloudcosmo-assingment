import "./styles.css";
import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/traverse_tree";

export default function App() {
    const [explorerData, setExplorerData] = useState(explorer);
    const { insertNode, updateNode, deleteNode } = useTraverseTree();
    const handleInsertNode = (folderId, item, isFolder) => {
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(finalTree);
    };
    const updateNodeHandler = (folderId, itemName) => {
        const updatedTree = updateNode(explorer, folderId, itemName);
        setExplorerData(updatedTree);
    };
    const deleteNodeHandler = (folderId) => {
        const updatedTree = deleteNode(explorer, folderId);
        setExplorerData(updatedTree);
    };

    return (
        <div className="App">
            <Folder handleInsertNode={handleInsertNode} updateNodeHandler={updateNodeHandler} deleteNodeHandler={deleteNodeHandler} explorer={explorerData} />
        </div>
    );
}
