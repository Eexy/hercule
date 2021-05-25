import React, { ReactElement } from 'react';
import PanelHeader from './panel-header';

interface PanelProps {
  children: React.ReactNode;
  title?: string;
}

const Panel: React.FC<PanelProps> = ({ children, title }): ReactElement => (
  <div
    className="panel"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}
  >
    {title ? <PanelHeader title={title} /> : null}
    <div className="panel__content" style={{ padding: 8, flex: 1 }}>
      {children}
    </div>
  </div>
);

export default Panel;
