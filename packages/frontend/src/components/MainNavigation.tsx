import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import { FileNotFound } from "../views/FileNotFound";
import { RoutePaths } from "../util/enum";

// component lazy loading
const Products = lazy(() => import("../views/Products"));

export const MainNavigation: React.FC<{}> = () => {
  return (
    <Suspense fallback={<>Loading....</>}>
      <Routes>
        <Route path={RoutePaths.Products} element={<Products />} />
        <Route path="/" element={<Navigate to={RoutePaths.Products} />} />
        <Route path={RoutePaths.NotFound} element={<FileNotFound />} />
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    </Suspense>
  );
};
