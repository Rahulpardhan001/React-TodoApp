import React, { useEffect, useState } from "react";
import "./style.css";

const getlocalData = () => {
  const lists = localStorage.getItem("TodoList");

  if (lists) {
    return JSON.parse(lists);
  } else return [];
};
function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getlocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      // console.log(newInputData);
      setInputData("");
    }
  };

  // edit item
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //delete item
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };
  //remove all the element
  const removeAll = () => {
    setItems([]);
  };
  // adding data localstorage
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="todo-container">
        <div className="todo-main">
          <h1>TODO APP</h1>
          <div className="add-items">
            <input
              type="text"
              placeholder="Add Items...."
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            {toggleButton ? (
              <i className="fa-regular fa-pen-to-square" onClick={addItem}></i>
            ) : (
              <i className="fa-solid fa-plus" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <>
                  <div className="each-item" key={curElem.id}>
                    <h3>{curElem.name}</h3>

                    <button
                      className="edit-btn"
                      onClick={() => editItem(curElem.id)}
                    >
                      <i className="fa-regular fa-pen-to-square "></i>
                    </button>
                    <button
                      className="trash-btn"
                      onClick={() => deleteItem(curElem.id)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </>
              );
            })}
            <button className="removeAll-items" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
