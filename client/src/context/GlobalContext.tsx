import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import * as client from '@/apiClient';

interface IGlobalContext {
  departments: client.Departments;
}
interface IGlobalProvider {
  children: JSX.Element;
}

const DEFAULT_VALUE = {
  departments: [],
};

const GlobalContext = createContext<IGlobalContext>(DEFAULT_VALUE);

const GlobalProvider: FC<IGlobalProvider> = ({ children }) => {
  const [departments, setDepartments] = useState<client.Departments | []>([]);

  useEffect(() => {
    client.getDepartments().then((departments: any) => {
      setDepartments(departments);
    });
  }, []);

  const value = useMemo(
    () => ({
      departments,
    }),
    [departments]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { GlobalProvider, useGlobal };
