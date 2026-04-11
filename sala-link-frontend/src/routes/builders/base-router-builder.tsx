import type { RouteObject } from "react-router";

export abstract class BaseRouterBuilder {
  // token parameter that reference the current coworking acessed by user, used in all routes
  public coworkingTokenParameter: string = ":coworkingToken";
  // path of the route, used to generate the full path of the route, for example, if the path is "login", the full path will be "/:coworkingToken/login"
  public path: string;
  
  constructor(path: string) {
    this.path = path;
  }

  // index is the most generic route that a screen can has, for example, if the path is "login", the index will be "/:coworkingToken/login"
  public getIndex(coworkingToken?: string) {
    return `${this.getBasePath(coworkingToken)}/${this.path}`;
  }

  public getBasePath(coworkingToken?: string) {
    return coworkingToken ? coworkingToken : this.coworkingTokenParameter;
  }

  abstract getRoutes(): RouteObject[];

  // utility method to get all routes from a list of builders, used in @src\routes\router.tsx
  static getRoutesFromBuilders(builders: BaseRouterBuilder[]): RouteObject[] {
    return builders.reduce((routes, builder) => {
      return [...routes, ...builder.getRoutes()];
    }, [] as RouteObject[]);
  }
}