import React from 'react';

interface props {
  handleClick: () => void;
}

const DeleteColumn: React.FunctionComponent<props> = ({ handleClick }) => {
  return <button onClick={handleClick}>delete</button>;
};

export default DeleteColumn;
