import type { RouteObject } from "react-router";
import { BaseRouterBuilder } from "./base-router-builder";
import { LoginIndex } from "@/pages/login";

class LoginRouterBuilder extends BaseRouterBuilder {
  constructor(subPath: string) {
    super(subPath);
  }

  public getRoutes(): RouteObject[]{
    return [
      {
        path: this.getIndex(),
        element: <LoginIndex />
      }
    ];
  }

}

export const loginRouterBuilder = new LoginRouterBuilder("login");