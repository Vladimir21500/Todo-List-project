import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateTaskInput = ({ onCreate }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleTaskCreate = () => {
    if (!value) return null;

    onCreate(value);
    setValue('');
  };

  return (
    <div className='create-task'>
      <input
        type='text'
        value={value}
        className='create-task__input'
        onChange={handleChange}
      />
      <button className='btn create-task__btn' onClick={handleTaskCreate}>
        Create
      </button>
    </div>
  );
};

CreateTaskInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateTaskInput;
