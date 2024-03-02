import Dashboard from "../views/pages/Dashboard";
import Login from "../views/pages/Login";
import Register from "../views/pages/Register";

const routes = [
  { path: "/", component: Dashboard, isPrivate: true },
  { path: "/login", component: Login, isPrivate: false },
  { path: "/register", component: Register, isPrivate: false },
];
export default routes;
