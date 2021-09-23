import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import signin from "./signin";
import SignIn from "./signin";
import Home from "./Components/Home";
import AdminRoute from "./Components/AdminRoute";
import Addstall from "./admin/addStall";
import Additems from "./admin/addItems";
import CheckInventory from "./admin/checkInventory";
import EnterReturns from "./admin/enterReturns";
import ChecktheLoss from "./admin/checkLoss";
import Requests from "./admin/requests";

const Routes=()=>{
    return (
        <BrowserRouter>
    <Switch>
    <AdminRoute path="/dashboard" exact component={Home} />
    <AdminRoute path="/" exact component={Home} />
    <AdminRoute path="/addstall" exact component={Addstall} />
    <AdminRoute path="/additems" exact component={Additems} />
    <AdminRoute path="/check" exact component={CheckInventory} />
    <AdminRoute path="/returns" exact component={EnterReturns} />
    <AdminRoute path="/loss" exact component={ChecktheLoss} />
    <AdminRoute path="/requests" exact component={Requests} />
        
        <Route path='/signin' exact component={SignIn} />
    </Switch>
    </BrowserRouter>
    )
}

export default Routes;