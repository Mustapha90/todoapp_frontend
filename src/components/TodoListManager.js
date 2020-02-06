
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from "./TodoItem";

const API_PATH="https://todoapp-backend-mus.herokuapp.com/api/todoitem";

function TodoListManager() {
    const [data, setData] = useState({ items: []});
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            API_PATH,
          );
          setData({ items: [...result.data.data] });
          setLoading(false);
        };
        fetchData();
    }, [loading]);


    const handleAddItem = () => {
        axios.post(API_PATH, { title: input }).then(response => {
            setLoading(true);
            setInput('');
        });
     };

    const handleCompleteItem = (item, isCompleted) => {
        axios.put(API_PATH, { id: item.id, title: item.title, isCompleted: isCompleted }).then(response => {
            setLoading(true);
            setInput('');
        });
     };

    const handleUpdateItem = (item, newTitle) => {
        axios.put(API_PATH, { id: item.id, title: newTitle }).then(response => {
            setLoading(true);
        });
    };

    const handleDeleteItem = (item) => {
        axios.delete(API_PATH, { data: { id: item.id } }).then(response => {
            setLoading(true);
        });
     };

    return (
      <div>
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-lg-12">
                <div className="card px-3">
                  <div className="card-body">
                    <h4 className="card-title">Your Todo list for today</h4>
                    <div className="add-items d-flex">
                        <input type="text"
                               className="form-control todo-list-input"
                               placeholder="What do you need to do today?"
                               value={input}
                               onChange={e => setInput(e.target.value)}
                        />
                        <button className="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={() => handleAddItem()}>Add</button>
                    </div>
                    <div className="list-wrapper">
                      <ul className="d-flex flex-column-reverse todo-list">
                          {data.items ? data.items.map(item => (
                            <TodoItem key={item.id}
                                      item={item}
                                      handleDeleteItem={handleDeleteItem}
                                      handleCompleteItem={handleCompleteItem}
                                      handleUpdateItem={handleUpdateItem}
                            />
                          )) : <p>No todo items to show.</p>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TodoListManager;
