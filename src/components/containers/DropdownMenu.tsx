import { useDetectClick } from 'src/utils/useDetectClick';

interface NestedComponentProps {
  onClick: () => void;
  isActive: boolean;
}

interface Props {
  Component: React.FC<NestedComponentProps>;
}

const DropdownMenu: React.FC<Props> = ({ Component }) => {
  const [isActive, setIsActive] = useDetectClick(false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return <Component onClick={onClick} isActive={isActive} />;
};

export default DropdownMenu;
