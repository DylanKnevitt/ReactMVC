import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';



export interface EmployeesState {
    isLoading: boolean;
    pageIndex?: number;
    employees: Employee[];
    newEmployee: Employee;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    complexDetails: string;
    streetName: string;
    suburb: string;
    province: string;
    country: string;
    postalCode: string;
    contactCountryCode: string;
    contactNumber: string;
    contactExtension: string;
    emailAddress: string;
    twitterHandle: string;
    githubPage: string;
}


interface RequestEmployeesAction {
    type: 'REQUEST_EMPLOYEES';
    pageIndex: number;
}

interface ReceiveEmployeesAction {
    type: 'RECEIVE_EMPLOYEES';
    pageIndex: number;
    employees: Employee[];
}

interface RequestEmployeeAction {
    type: 'REQUEST_EMPLOYEE';
    id: number;
}

interface ReceiveEmployeeAction {
    type: 'RECEIVE_EMPLOYEE';
    employee: Employee;
}

interface UpdateEmployeeAction {
    type: 'UPDATE_EMPLOYEE';
    employee: Employee;
}

interface UpdateEmployeeStateAction {
    type: 'UPDATE_EMPLOYEE_STATE';
    employee: Employee;
    newEmployee: Employee;
}

interface CancelEmployeeChangesAction {
    type: 'CANCEL_EMPLOYEE_CHANGES';
}

type KnownAction = RequestEmployeesAction | ReceiveEmployeesAction | RequestEmployeeAction | ReceiveEmployeeAction | UpdateEmployeeAction | UpdateEmployeeStateAction | CancelEmployeeChangesAction;


export const actionCreators = {
    requestEmployeesAction: (pageIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (pageIndex != getState().employees.pageIndex) {
            let fetchTask = fetch(`api/v1/Employees?pageIndex=${pageIndex}`)
                .then(response => response.json() as Promise<Employee[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEES', pageIndex: pageIndex, employees: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_EMPLOYEES', pageIndex: pageIndex});
        }
    },
    requestEmployeeAction: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        if (id != getState().employees.employees[id-1].id) {
            let fetchTask = fetch(`api/v1/Employees/${id}`)
                .then(response => response.json() as Promise<Employee>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEE', employee: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_EMPLOYEE', id: id });
        }
    },

    updateEmployeeAction: (employee: Employee): AppThunkAction<KnownAction> => (dispatch, getState) => {

            let fetchTask = fetch(`api/v1/Employees`,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(employee)
                })
                .then(response => response.json() as Promise<number>)
                .then(data => {
                    dispatch({ type: 'REQUEST_EMPLOYEE', id: data});
                });

            addTask(fetchTask);
        dispatch({ type: 'UPDATE_EMPLOYEE', employee: employee });

    },
    updateEmployeeStateAction: (id: number,name: string, value: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let employeeFromState = getState().employees.newEmployee;

        if (id != 0) {
            employeeFromState = getState().employees.employees[id - 1];
        }
        
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
            dispatch({ type: 'UPDATE_EMPLOYEE_STATE', employee: employee,newEmployee : employee });
        }

    },
    cancelEmployeeChangesAction: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CANCEL_EMPLOYEE_CHANGES'});
}
};

const newEmployee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    complexDetails: "",
    streetName: "",
    suburb: "",
    province: "",
    country: "",
    postalCode: "",
    contactCountryCode: "",
    contactNumber: "",
    contactExtension: "",
    emailAddress: "",
    twitterHandle: "",
    githubPage: ""
};

const unloadedState: EmployeesState = {
    employees: [], isLoading: false, newEmployee: newEmployee};

export const reducer: Reducer<EmployeesState> = (state: EmployeesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
    case 'REQUEST_EMPLOYEES':
        return {
            pageIndex: action.pageIndex,
            employees: state.employees,
            isLoading: true,
            newEmployee: state.newEmployee
        };
    case 'RECEIVE_EMPLOYEES':
        if (action.pageIndex === state.pageIndex) {
            return {
                pageIndex: action.pageIndex,
                employees: action.employees,
                isLoading: false,
                newEmployee: state.newEmployee
            };
        }
        break;
    case 'REQUEST_EMPLOYEE':
        return {
            employees: state.employees,
            isLoading: true,
            newEmployee: state.newEmployee
        };
    case 'RECEIVE_EMPLOYEE':

        if (action.employee === state.employees[action.employee.id - 1]) {
            return {
                employees: state.employees,
                isLoading: false,
                newEmployee: state.newEmployee
            };
        }
        break;
    case 'UPDATE_EMPLOYEE':
        return {
            employees: state.employees,
            isLoading: false,
            newEmployee: state.newEmployee
        }
    case 'UPDATE_EMPLOYEE_STATE':
        let id = action.employee.id;
            if (id == 0) {
                return {
                    employees: state.employees,
                    isLoading: false,
                    newEmployee: action.newEmployee
                }
            } else {
                var employees = Object.assign({}, state.employees, { [id - 1]: action.employee });
                return {
                    employees: employees,
                    isLoading: false,
                    newEmployee: state.newEmployee
                }
            }

        case 'CANCEL_EMPLOYEE_CHANGES':
            return unloadedState;
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
