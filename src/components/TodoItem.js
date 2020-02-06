import React, {useState} from "react";
import EditableLabel from 'react-editable-label';

function TodoItem(props) {
    const { item } = props;
    const [completed, setCompleted] = useState(item.isCompleted);

    const handleDeleteItem = (item) => {
        props.handleDeleteItem(item);
    };

    const handleCompleteItem = (item) => {
        setCompleted(!completed);
        props.handleCompleteItem(item, !completed);
    };

    const handleUpdateItem = (item, newTitle) => {
        props.handleUpdateItem(item, newTitle);
    };

    return (
      <li className={completed ? "completed": ""}>
        <div className="form-check">
          <label className="form-check-label">
            <input className="checkbox"
                   type="checkbox"
                   onChange={() => handleCompleteItem(item)}
                   checked={completed}
            /><i className="input-helper"/>
          </label>
            <EditableLabel
                initialValue={item.title}
                save={value => handleUpdateItem(item, value)}
            />
        </div>
        <i className="remove mdi mdi-close-circle-outline"
           onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteItem(item) } }
        />
      </li>
    );
}

export default TodoItem;
