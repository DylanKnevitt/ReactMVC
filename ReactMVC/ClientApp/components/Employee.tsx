import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as EmployeeState from '../store/Employee';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeState.EmployeeState        // ... state we've requested from the Redux store
    & typeof EmployeeState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: number}>; // ... plus incoming routing parameters

class Employee extends React.Component<EmployeeProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        let pageIndex = this.props.match.params.id;
        this.props.requestEmployeeAction(pageIndex);
    }

    componentWillReceiveProps(nextProps: EmployeeProps) {

        
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(e: any) {
        var name = e.target.name;
        var value = e.target.value;
    this.props.updateEmployeeStateAction(name,value);

        e.preventDefault();
    }
    handleSubmit(event: any) {
        event.preventDefault();
        if (this.props.employee != undefined) {
            this.props.updateEmployeeAction(this.props.employee);   
        }
    }

    private getEmployeeForm(employee: any) {
        return <div className="form-group">
                   <label htmlFor="firstName">First Name </label>
            <input type="text" className=" form-control" id="firstName" onChange={this.handleChange} name="firstName" value={employee.firstName}/>
                   <label htmlFor="lastName">Last Name </label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="lastName"name="lastName" value={employee.lastName}/>
                   <label htmlFor="complexDetails">Complex Details</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="complexDetails"name="complexDetails" value={employee.complexDetails}/>
                   <label htmlFor="streetName">Street Name</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="streetName"name="streetName" value={employee.streetName}/>
                   <label htmlFor="suburb">Suburb</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="suburb"name="suburb" value={employee.suburb}/>
                   <label htmlFor="province">Province</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="province"name="province" value={employee.province}/>
                   <label htmlFor="country">Country</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="country"name="country" value={employee.country}/>
                   <label htmlFor="postalCode">Postal Code</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="postalCode"name="postalCode" value={employee.postalCode}/>
                   <label htmlFor="contactCountryCode">Contact Country Code</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="contactCountryCode"name="contactCountryCode" value={employee.contactCountryCode}/>
                   <label htmlFor="contactNumber">Contact Number</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="contactNumber"name="contactNumber" value={employee.contactNumber}/>
                   <label htmlFor="contactExtension">Contact Extension</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="contactExtension"name="contactExtension" value={employee.contactExtension}/>
                   <label htmlFor="emailAddress">Email address</label>
            <input type="email" className=" form-control" onChange={this.handleChange}  id="emailAddress"name="emailAddress" value={employee.emailAddress}/>
                   <label htmlFor="twitterHandle">Twitter</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="twitterHandle"name="twitterHandle" value={employee.twitterHandle}/>
                   <label htmlFor="githubPage">Github</label>
            <input type="" className=" form-control" onChange={this.handleChange}  id="githubPage"name="githubPage" value={employee.githubPage} />
            <button type="submit" className="form-control btn btn-primary">Save</button>
        </div>;
    }

    public render() {
        let form : any;
        if (this.props.employee != undefined && Object.keys(this.props.employee).length !== 0 && this.props.employee.constructor === Object) {
            form = this.getEmployeeForm(this.props.employee);
        } else {
            form = <div>Cannot find employee</div>;
        }

        return <div>
            <button onClick={this.props.history.goBack}>Back</button>
            <h1>Employee</h1>
            <form id="employeeForm" className="employeeForm" onSubmit={this.handleSubmit}>>
                {form}
            </form >
            

        </div>;
    }
}


export default connect(
    (state: ApplicationState) => state.employee, // Selects which state properties are merged into the component's props
    EmployeeState.actionCreators                 // Selects which action creators are merged into the component's props
)(Employee) as typeof Employee;
