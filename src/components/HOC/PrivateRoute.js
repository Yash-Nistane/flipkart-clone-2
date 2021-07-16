import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component,...rest}) => {
    // console.log(Component);
    return <Route {...rest} component = {(props) =>{
        
        const token = window.localStorage.getItem('token');
        // console.log("props");
        // console.log(props);
        if(token){ 
            return <Component {...props}/>
        }else{
            return <Redirect to = {'/'} />
        }
    }}/>
}

export default PrivateRoute;