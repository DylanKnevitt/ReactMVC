import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Employees from './components/Employees';
import Employee from './components/Employee';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/employees/:pageIndex?' component={Employees} />
    <Route path='/employee/:id' component={Employee} />
</Layout>;
