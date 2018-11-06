import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface EmployeeState {
    id: number;
    employee?: Employee;
    isLoading: boolean;

}

export interface Employee {
    id: number;
    firstName?: string;
    lastName?: string;
    complexDetails?: string;
    streetName?: string;
    suburb?: string;
    province?: string;
    country?: string;
    postalCode?: string;
    contactCountryCode?: string;
    contactNumber?: string;
    contactExtension?: string;
    emailAddress?: string;
    twitterHandle?: string;
    githubPage?: string;
}

interface RequestEmployeeAction {
    type: 'REQUEST_EMPLOYEE';
    id: number;
}

interface ReceiveEmployeeAction {
    type: 'RECEIVE_EMPLOYEE';
    id: number;
    employee: Employee;
}

interface UpdateEmployeeAction {
    type: 'UPDATE_EMPLOYEE';
    employee: Employee;
}

interface UpdateEmployeeStateAction {
    type: 'UPDATE_EMPLOYEE_STATE';
    employee: Employee;
}


type KnownAction = RequestEmployeeAction | ReceiveEmployeeAction | UpdateEmployeeAction | UpdateEmployeeStateAction;



export const actionCreators = {
    requestEmployeeAction: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        if (id !== getState().employee.id) {
            let fetchTask = fetch(`api/v1/Employees/${id}`)
                .then(response => response.json() as Promise<Employee>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEE', id: id, employee: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_EMPLOYEE', id: id });
        }
    },

    updateEmployeeAction: (employee: Employee): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (employee.id !== getState().employee.id) {
            let fetchTask = fetch(`api/v1/Employees`,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },  
                    body: JSON.stringify(employee)
                })
                .then(response => response.json() as Promise<Employee>)
                .then(data => {
                    dispatch({ type: 'REQUEST_EMPLOYEE', id: data.id });
                });

            addTask(fetchTask);
            dispatch({ type: 'UPDATE_EMPLOYEE', employee: employee });
        }
    },
    updateEmployeeStateAction: (name: string, value: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var employeeFromState = getState().employee.employee;
        if (employeeFromState != undefined) {
            var employee = Object.assign({}, employeeFromState);

            switch (name) {

                case 'firstName':
                    employee.firstName = value;
                    break;
                case 'lastName':
                    employee.lastName = value;
                    break;
                case 'complexDetails':
                    employee.complexDetails = value;
                    break;
                case 'streetName':
                    employee.streetName = value;
                    break;
                case 'suburb':
                    employee.suburb = value;
                    break;
                case 'province':
                    employee.province = value;
                    break;
                case 'country':
                    employee.country = value;
                    break;
                case 'postalCode':
                    employee.postalCode = value;
                    break;
                case 'contactCountryCode':
                    employee.contactCountryCode = value;
                    break;
                case 'contactNumber':
                    employee.contactNumber = value;
                    break;
                case 'contactExtension':
                    employee.contactExtension = value;
                    break;
                case 'emailAddress':
                    employee.emailAddress = value;
                    break;
                case 'twitterHandle':
                    employee.twitterHandle = value;
                    break;
                case 'githubPage':
                    employee.githubPage = value;
                    break;
                default:
                    break;

            }
            dispatch({ type: 'UPDATE_EMPLOYEE_STATE', employee: employee });
        }

    }
}

const unloadedState: EmployeeState = { id: 0, employee: { id: 0 }, isLoading: false };

export const reducer: Reducer<EmployeeState> = (state: EmployeeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEE':
            return {
                id: action.id,
                employee: state.employee,
                isLoading: true
            };
        case 'RECEIVE_EMPLOYEE':

            if (action.id === state.id) {
                return {
                    id: action.id,
                    employee: action.employee,
                    isLoading: false
                };
            }
            break;
        case 'UPDATE_EMPLOYEE':
            return {
                employee: state.employee,
                id: state.id,
                isLoading: false
            }
        case 'UPDATE_EMPLOYEE_STATE':
            return {
                employee: action.employee,
                id: state.id,
                isLoading: false
            }

        default:
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
};
