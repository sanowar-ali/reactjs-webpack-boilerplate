import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../page/dashboard/Dashboard";
import ShowCustomers from "../page/customer/ShowCustomers";
import ShowProducts from "../page/product/ShowProducts";
import CreateEvent from "../page/event/create";

const routes = [
  {
    path: "/",
    component: Dashboard,
    key: "/",
  },
  {
    path: "/customers",
    component: ShowCustomers,
    key: "/customers",
  },
  {
    path: "/products",
    component: ShowProducts,
    key: "/products",
  },
  {
    path: "/resetpassword",
    component: ShowProducts,
    key: "/resetpassword",
  },
  {
    path: "/host-event",
    component: CreateEvent,
    key: "/host-event",
  },
];

function RoutingList() {
  return routes.map((item) => {
    if (item.path.split("/").length === 2) {
      return (
        <Route
          exact
          path={item.path}
          component={item.component}
          key={item.key}
        />
      );
    }
    return <Route path={item.path} component={item.component} key={item.key} />;
  });
}

export default RoutingList;
