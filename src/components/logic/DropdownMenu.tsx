import { useDetectClick } from 'src/utils/useDetectClick';

interface NestedComponentProps {
  onClick: () => void;
  isActive: boolean;
}

interface Props {
  MenuType: React.FC<NestedComponentProps>;
}

const DropdownMenu: React.FC<Props> = ({ MenuType }) => {
  const [isActive, setIsActive] = useDetectClick(false);
  const onClick = (): void => {
    setIsActive(!isActive);
  };

  return <MenuType onClick={onClick} isActive={isActive} />;
};

export default DropdownMenu;
