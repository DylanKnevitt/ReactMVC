import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as EmployeesState from '../store/Employees';


// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeesState.EmployeesState        // ... state we've requested from the Redux store
    & typeof EmployeesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ pageIndex: number}>; // ... plus incoming routing parameters

class Employees extends React.Component<EmployeeProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        let pageIndex = this.props.match.params.pageIndex || 1;
        this.props.requestEmployeesAction(pageIndex);
    }

    componentWillReceiveProps(nextProps: EmployeeProps) {
        // This method runs when incoming props (e.g., route params) change
        let pageIndex = nextProps.match.params.pageIndex || 1;
        this.props.requestEmployeesAction(pageIndex);
    }

    constructor(props : any) {
        super(props);
        this.handleDoubleClickItem = this.handleDoubleClickItem.bind(this);
    }

    public handleDoubleClickItem(e: any): void {
        this.props.history.push('/employee/' + e.target.parentElement.id);
    }

    public render() {
        return <div>
            <h1>Employees</h1>
            { this.renderEmployeeTable() }
            { this.renderPagination() }
        </div>;
    }

    private renderEmployeeTable() {
        return <div className='table-responsive'>
        <table className='table table-hover'>
            <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Complex Details</th>
                    <th>Street Name</th>
                    <th>Suburb</th>
                    <th>Province</th>
                    <th>Country</th>
                    <th>Postal Code</th>
                    <th>Contact Country Code</th>
                    <th>Contact Number</th>
                    <th>Contact Extension</th>
                    <th>Email Address</th>
                    <th>Twitter Handle</th>
                    <th>Github Address</th>
                </tr>
            </thead>
            <tbody>
            {this.props.employees.map(employee =>
                    <tr id={String(employee.id)} onDoubleClick={this.handleDoubleClickItem} key={ employee.id }>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.complexDetails}</td>
                        <td>{employee.streetName}</td>
                        <td>{employee.suburb}</td>
                        <td>{employee.province}</td>
                        <td>{employee.country}</td>
                        <td>{employee.postalCode}</td>
                        <td>{employee.contactCountryCode}</td>
                        <td>{employee.contactNumber}</td>
                        <td>{employee.contactExtension}</td>
                        <td>{employee.emailAddress}</td>
                        <td>{employee.twitterHandle}</td>
                        <td>{employee.githubPage}</td>
                </tr>
            )}
            </tbody>
            </table>
            </div>;
    }

    private renderPagination() {
        let prevPageIndex = (this.props.pageIndex || 0);
        let nextPageIndex = (this.props.pageIndex || 0);
        let prevPageIndexNum = 0;
        let nextPageIndexNum = 0;

        if (typeof prevPageIndex === "string") {
            prevPageIndexNum = parseInt(String(prevPageIndex)) - 1;
        } else {
            prevPageIndexNum = prevPageIndex;
        }

        if (typeof nextPageIndex === "string") {
            nextPageIndexNum = parseInt(String(nextPageIndex)) + 1;
        } else {
            nextPageIndexNum = nextPageIndex;
        }

        if (prevPageIndexNum <=0) {
            prevPageIndexNum = 1;
        }

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={`/employees/${prevPageIndexNum}`}>Previous</Link>
            <Link className='btn btn-default pull-right' to={`/employees/${nextPageIndexNum}`}>Next</Link>
            { this.props.isLoading ? <span>Loading...</span> : [] }
        </p>;
    }
}

export default connect(
    (state: ApplicationState) => state.employees, // Selects which state properties are merged into the component's props
    EmployeesState.actionCreators                 // Selects which action creators are merged into the component's props
)(Employees) as typeof Employees;
