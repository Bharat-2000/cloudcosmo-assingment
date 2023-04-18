import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";

function Folder({ handleInsertNode, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });
    const label = { inputProps: { "aria-label": "Required" } };
    const [datatype, setDatatype] = useState("");
    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder,
        });
    };

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ ...showInput, visible: false });
        }
    };
    const handleDataType = (value) => {
        setDatatype(value);
    };
    const data = ["boolean", "string", "number", "object"];
    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5, width: "200px" }}>
                <div
                    className="folder"
                    style={{ display: "flex", flexDirection: "row" }}
                    onClick={() => setExpand(!expand)}
                >
                    <span> 📁{explorer.name}</span>
                    <div>
                        <Autocomplete
                            disableClearable
                            size="small"
                            id="nested-combo-box"
                            value={datatype}
                            options={data}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Select Extension" />
                            )}
                            onChange={(e, val) => handleDataType(val)}
                        />
                        <button
                            disabled={datatype != "object" ? true : false}
                            onClick={(e) => handleNewFolder(e, true)}
                        >
                            Add +
                        </button>
                        {/* <button onClick={(e) => handleNewFolder(e, false)}>File +</button> */}
                        <Switch {...label} />
                        <button
                            disabled={datatype != "object" ? true : false}
                            onClick={(e) => handleNewFolder(e, true)}
                        >
                            Delete -
                        </button>
                    </div>
                </div>
                <div
                    style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
                >
                    {showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                type="text"
                                autoFocus
                                onKeyDown={onAddFolder}
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                                className="inputContainer__input"
                            />
                        </div>
                    )}
                    {explorer.items.map((item) => {
                        return (
                            <Folder
                                handleInsertNode={handleInsertNode}
                                explorer={item}
                                key={item.id}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Folder;
