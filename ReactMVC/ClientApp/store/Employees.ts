import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface EmployeesState {
    isLoading: boolean;
    pageIndex?: number;
    employees: Employee[];
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

type KnownAction = RequestEmployeesAction | ReceiveEmployeesAction;


export const actionCreators = {
    requestEmployeesAction: (pageIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (pageIndex !== getState().employees.pageIndex) {
            let fetchTask = fetch(`api/v1/Employees?pageIndex=${pageIndex}`)
                .then(response => response.json() as Promise<Employee[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEES', pageIndex: pageIndex, employees: data });
                });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_EMPLOYEES', pageIndex: pageIndex});
        }
    }
};


const unloadedState: EmployeesState = { employees: [] ,isLoading: false };

export const reducer: Reducer<EmployeesState> = (state: EmployeesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEES':
            return {
                pageIndex: action.pageIndex,
                employees: state.employees,
                isLoading: true
            };
        case 'RECEIVE_EMPLOYEES':
            if (action.pageIndex === state.pageIndex) {
                return {
                    pageIndex: action.pageIndex,
                    employees: action.employees,
                    isLoading: false
                };
            }
            break;
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
