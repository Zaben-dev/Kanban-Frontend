import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DroppableProvided } from 'react-beautiful-dnd';

const StyledHorizontalLine = styled.div`
  border: 0;
  height: 1px;
  margin-top: 3px;
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
  height: 92%;
  width: 258px;
  padding-left: 4px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-color: #008cba transparent !important;
  scrollbar-width: thin !important;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #008cba;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
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
