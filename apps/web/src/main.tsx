import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import Plots from "./routes/plots";
import PlotDetail from "./routes/plot.$id";
import BedDetail from "./routes/bed.$id";
import "./tailwind.css";
// import "./index.css";

const qc = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <App/>,
    children: [
      { index: true, element: <Dashboard/> },
      { path: "plots", element: <Plots/> },
      { path: "plots/:id", element: <PlotDetail/> },
      { path: "beds/:id", element: <BedDetail/> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </React.StrictMode>
);