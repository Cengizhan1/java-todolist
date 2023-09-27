import React, { Component } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Footer from './component/Footer';
import Header from './component/Header';
import TaskList from './component/task/TaskList';
import TaskCreate from './component/task/TaskCreate';
import TaskView from './component/task/TaskView';
import TaskUpdate from './component/task/TaskUpdate';
import UserPage from './component/user/UserPage';
import ProjectList from './component/project/ProjectList';
import ProjectCreate from './component/project/ProjectCreate';

class BlogRouter extends Component {
    static displayName = "Blog_Router";
    constructor(props) {
        super(props);
        this.state = {}
    } //end constructor

    render() {
        return (
            <React.Fragment>
                <Header logo="fa-solid fa-warehouse" />

                <div className="container">
                    <Routes>
                        <Route path='/' element={<UserPage/>} />

                        // Task routes
                        <Route path='/task/list' element={<TaskList list="task"/>} />
                        <Route path='/task/list/:id' element={<TaskList/>} />

                        <Route path='/task/create' element={<TaskCreate/>} />
                        <Route path='/task/view/:id' element={<TaskView/>} />
                        <Route path='/task/update/:id' element={<TaskUpdate/>} />

                        // Project routes
                        <Route path='/project/list' element={<ProjectList list="project"/>} />
                        <Route path='/project/create' element={<ProjectCreate/>} />

    

                        {/* bad request */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>

                <Footer copy="&copy; 2021 - 2023" />
            </React.Fragment>
        ) //end return
    } //end render
} //end class

export default withTranslation()(BlogRouter);