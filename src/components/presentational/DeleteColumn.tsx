import React from 'react';

interface Props {
  handleClick: () => void;
}

const DeleteColumn: React.FunctionComponent<Props> = ({ handleClick }) => {
  return <button onClick={handleClick}>delete</button>;
};

export default DeleteColumn;
