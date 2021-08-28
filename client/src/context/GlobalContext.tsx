import React, {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useParams } from 'react-router';

import * as client from '@/apiClient';
import { RouteParams } from '@/routePaths';

interface IGlobalContext {
  departments: client.Departments;
  selectedDepartmentId: string;
  setSelectedDepartmentId: (id: string) => void;
}
interface IGlobalProvider {
  children: JSX.Element;
}

const DEFAULT_VALUE = {
  departments: [],
  selectedDepartmentId: '',
  setSelectedDepartmentId: () => {},
};

const GlobalContext = createContext<IGlobalContext>(DEFAULT_VALUE);

const GlobalProvider: FC<IGlobalProvider> = ({ children }) => {
  const { departmentId } = useParams<RouteParams>();

  const [departments, setDepartments] = useState<client.Departments | []>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

  useEffect(() => {
    if (!departmentId) return;
    setSelectedDepartmentId(departmentId);
  }, [departmentId]);

  useEffect(() => {
    client.getDepartments().then((departments: any) => {
      setDepartments(departments);
    });
  }, []);

  const value = useMemo(
    () => ({
      departments,
      selectedDepartmentId,
      setSelectedDepartmentId,
    }),
    [departments, selectedDepartmentId]
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
