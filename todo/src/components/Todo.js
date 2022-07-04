import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalStorageData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorageData());
    const [toggleButton, setToggleButton] = useState(false);

    const addItems = () => {
        if (!inputData) {
            alert("Please input the task!!");
        } else {
            const newItem = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, newItem]);
            setInputData("");
        }
    };

    const deleteItem = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    };

    const updateItem = (id) => {
        const element = items.filter(item => item.id === id);
        document.getElementById("inputfield").value = element.name;
    };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addItems();
        }
    };

    const editItem = (id) => {
        
    };
    
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            id="inputfield"
                            type="text"
                            placeholder="✍🏻 Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                            onKeyPress={handleKeyPress}
                        ></input>
                        {toggleButton ? <i className="fa fa-edit add-btn" onClick={addItems}></i> : <i className="fa fa-solid fa-plus add-btn" onClick={addItems}></i>}
                    </div>
                    {/* show our items */}

                    <div className="showItems">
                        {items.map((curItem) => {
                            return (
                                <div className="eachItem" key={curItem.id}>
                                    <h3>{curItem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="fa fa-edit add-btn" onClick={() => editItem(curItem.id)}></i>
                                        <i className="fa fa-trash add-btn" onClick={() => deleteItem(curItem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
