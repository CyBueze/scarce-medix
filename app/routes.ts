import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  
  layout("./layouts/mainLayout.tsx", [
    index("routes/home.tsx"),
    route("sos/", "./pages/SOSPage.tsx"),
    ]),
  route("sqsos/", "./pages/sqsos.tsx"),
  route("sostyp/", "./pages/sostyp.tsx"),
  ] satisfies RouteConfig;
