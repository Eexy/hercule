import React, {ReactElement} from'react';

interface PanelHeaderProps {
  title: string;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({title}): ReactElement => (
  <header className="panel__header" style={{background: '#2d3037' , padding: '0.8rem'}}>
    <h4 className="panel__header__title" style={{color: 'white'}}>{title}</h4>
  </header>
);

export default PanelHeader;