import * as Employees from './Employees';
import * as Employee from './Employee';

export interface ApplicationState {
    employees: Employees.EmployeesState;
    employee: Employee.EmployeeState;
}

export const reducers = {
    employees: Employees.reducer,
    employee: Employee.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
