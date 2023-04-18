import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Switch, FormControlLabel } from "@mui/material";

function Folder({
    handleInsertNode,
    explorer,
    updateNodeHandler,
    deleteNodeHandler
}) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });
    const [showRename, setShowRename] = useState(false);
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
    const renameFileFolder = (e) => {
        if (e.target.value.trim() && e.keyCode === 13) {
            setShowRename(false);
            updateNodeHandler(explorer.id, e.target.value.trim());
        }
    };

    const deleteFileFolderHandler = () => {
        deleteNodeHandler(explorer.id);
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
                    {showRename && (
                        <input
                            onKeyDown={(e) => renameFileFolder(e)}
                            autoFocus
                            className="input__newFileFolder"
                            type="text"
                            defaultValue={explorer.name}
                            onBlur={() => {
                                setShowRename(false);
                            }}
                        ></input>
                    )}
                    {!showRename && <span> 📁{explorer.name}</span>}
                    <div>
                        <Autocomplete
                            disableClearable
                            size="small"
                            id="nested-combo-box"
                            value={datatype}
                            options={data}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Select Datatype" />
                            )}
                            onChange={(e, val) => handleDataType(val)}
                            style={{ margin: '0px 5px' }}
                        />
                        <button
                            disabled={datatype != "object" ? true : false}
                            onClick={(e) => handleNewFolder(e, true)}
                            style={{ margin: '0px 5px' }}
                        >
                            Add +
                        </button>
                        {/* <button onClick={(e) => handleNewFolder(e, false)}>File +</button> */}
                        {/* <Switch {...label} helperText="Required Feild"/> */}
                        <FormControlLabel required control={<Switch />} label="Required" style={{ margin: '0px 5px' }} />
                        <button onClick={(e) => deleteFileFolderHandler(e)} style={{ margin: '0px 5px' }}>
                            Delete -
                        </button>
                        <button
                            style={{ margin: '0px 5px' }}
                            onClick={(e) => setShowRename(true)}
                        >
                            Edit
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
                                updateNodeHandler={updateNodeHandler}
                                deleteNodeHandler={deleteNodeHandler}
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
