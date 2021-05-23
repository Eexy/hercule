import React, { createContext, ReactElement } from 'react';
import { io, Socket } from 'socket.io-client';

interface IClientContext {
  client: Socket<any, any>;
}

const URL = 'http://localhost:5000';
const socket = io(URL, { autoConnect: false });

export const ClientContext = createContext<IClientContext>({
  client: socket,
});

interface ClientProviderProps {
  children: React.ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({
  children,
}): ReactElement => (
  <ClientContext.Provider value={{ client: socket }}>
    {children}
  </ClientContext.Provider>
);

export default ClientProvider;
