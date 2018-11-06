import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.checkActive = this.checkActive.bind(this);
    }

    private checkActive = (match : any, location : any) => {
        //some additional logic to verify you are in the home URI
        if (!location) return false;
        var pathname = location.pathname.toString();
        var result = pathname.includes("employee");
        return result;
    }

    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>ReactMVC</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink exact to={ '/' } activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/employees/1'} isActive={this.checkActive} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Employees
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }


}
