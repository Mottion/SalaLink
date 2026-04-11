import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom"
import { BaseRouterBuilder } from "./builders/base-router-builder";
import { loginRouterBuilder } from "./builders/login-router-builder";

const router = createBrowserRouter(BaseRouterBuilder.getRoutesFromBuilders([
  loginRouterBuilder
]));

export const Router: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}