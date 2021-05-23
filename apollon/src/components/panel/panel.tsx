import React, {ReactElement} from 'react';
import PanelHeader from '../panel-header/panel-header';

interface PanelProps {
  children: React.ReactNode;
  title ?: string;
}

const Panel: React.FC<PanelProps> = ({children, title}): ReactElement => (
  <div className="panel" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
    {title ? <PanelHeader title={title} /> : null}
    {children}
  </div>
)

export default Panel;