import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DroppableProvided } from 'react-beautiful-dnd';

const StyledHorizontalLine = styled.div`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(74, 136, 207, 0.7),
    rgba(0, 0, 0, 0)
  );
`;

const StyledTasksArea = styled.div`
  display: inline-block;
  padding-right: 9px;
  min-height: 115px;
  width: 253px;
  padding-left: 2px;
`;

interface Props {
  children: ReactNode;
  innerRef: any;
  provided: DroppableProvided;
}

const TasksArea: React.FunctionComponent<Props> = ({
  children,
  innerRef,
  provided,
}) => {
  return (
    <>
      <StyledHorizontalLine></StyledHorizontalLine>
      <StyledTasksArea {...provided.droppableProps} ref={innerRef}>
        {children}
      </StyledTasksArea>
    </>
  );
};

export default TasksArea;
