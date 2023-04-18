import "./styles.css";
import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/traverse_tree";

export default function App() {
    const [explorerData, setExplorerData] = useState(explorer);
    const { insertNode } = useTraverseTree();
    const handleInsertNode = (folderId, item, isFolder) => {
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(finalTree);
    };

    return (
        <div className="App">
            <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
        </div>
    );
}
