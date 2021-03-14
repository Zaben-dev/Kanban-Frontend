import React from 'react';
import { SpinnerComponent } from 'react-element-spinner';

interface Props {
  handleDelete: () => void;
  isLoading: boolean;
}

const DeleteColumn: React.FunctionComponent<Props> = ({
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <SpinnerComponent loading={isLoading} position="global" />
      <button onClick={handleDelete}>delete</button>;
    </>
  );
};

export default DeleteColumn;
