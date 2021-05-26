import React, { ReactElement } from 'react';

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  className,
}): ReactElement => (
  <div className={className} style={{ height: '100%' }}>
    {children}
  </div>
);

export default Screen;
