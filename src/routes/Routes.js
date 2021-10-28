import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "../components/Layout";
import Counter from "../components/Counter";
import Pessoas from "../components/Pessoas";
import RepositoriesList from "../components/RepositoriesList";
import UsersList from "../components/UsersList";
import Produtos from "../components/Produtos";

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/counter" component={Counter} />
          <Route path="/pessoas" component={Pessoas} />
          <Route path="/repositories" component={RepositoriesList} />
          <Route path="/users" component={UsersList} />
          <Route path="/produtos" component={Produtos} />
          <Route path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
