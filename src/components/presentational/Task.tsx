import React from 'react';
import { priority, difficulty } from 'src/api/models';
import Menu from 'src/components/containers/TaskMenuContainer';
import styled from 'styled-components';
import { DraggableProvided } from 'react-beautiful-dnd';

const StyledTaskContainer = styled.div`
  max-height: 180px;
  min-height: 73px;
  width: 100%;
  margin-top: 8px;
  border: 3px solid #008cbaaf;
  background-color: #008cba22;
  border-radius: 4px;
  overflow: hidden;
`;

const StyledTaskTopbar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #008cba75;
  color: #373810;
  padding-left: 2px;
  min-height: 35px;
  font-size: 15px;
  word-break: break-word;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1.15;
`;

const StyledAdditionalInfo = styled.div`
  display: inline-block;
  background-color: #a8e9ff5c;
  font-size: 11px;
  border-radius: 4px;
  padding: 2px 4px 2px 4px;
  margin-right: 4px;
  margin-bottom: 2px;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  margin: 4px 4px 4px 4px;
  word-break: break-word;
`;

const StyledShowMore = styled.a`
  color: #5082f0;
  cursor: pointer;
  word-break: break-word;
`;

interface Props {
  openModal: () => void;
  title: string;
  description: string;
  priority: priority;
  difficulty: difficulty;
  provided: DraggableProvided;
  innerRef: any;
}

const Task: React.FunctionComponent<Props> = ({
  openModal,
  title,
  description,
  priority,
  difficulty,
  provided,
  innerRef,
}) => {
  return (
    <StyledTaskContainer
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <StyledTaskTopbar>
        <StyledFlexContainer>
          <div>{title}</div>
          <Menu />
        </StyledFlexContainer>
        <div>
          <StyledAdditionalInfo>priority: {priority}</StyledAdditionalInfo>
          <StyledAdditionalInfo>difficulty: {difficulty}</StyledAdditionalInfo>
        </div>
      </StyledTaskTopbar>
      <StyledDescription>
        {description.slice(0, 30)}
        {description.length > 29 && (
          <StyledShowMore onClick={openModal}>... show More</StyledShowMore>
        )}
      </StyledDescription>
    </StyledTaskContainer>
  );
};

export default Task;
