import * as Employees from './Employees';

export interface ApplicationState {
    employees: Employees.EmployeesState
}

export const reducers = {
    employees: Employees.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
