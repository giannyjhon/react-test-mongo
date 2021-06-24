import { lazy } from "react";

const Oder = lazy(() => import("./oder"));
const Product = lazy(() => import("./product"));
// const ViewThree = lazy(() => import("./ViewThree"));
 const PrivateView = lazy(() => import("./PrivateView"));

export default {
  Oder,
  Product,
  // ,
  // ViewThree,
   PrivateView
};
