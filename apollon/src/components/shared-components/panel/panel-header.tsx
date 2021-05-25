import React, { ReactElement } from 'react';

interface PanelHeaderProps {
  title: string;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title }): ReactElement => (
  <header
    className="panel__header"
    style={{ padding: '0.8rem', borderBottom: '1px solid #f0f0f0' }}
  >
    <h4 className="panel__header__title" style={{margin: 0}}>{title}</h4>
  </header>
);

export default PanelHeader;
