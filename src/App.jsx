import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListingPage from "./routes/listingPage/listingPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import AddProperty from "./routes/admin/AddProperty/AddProperty";
import Dashboard from "./routes/admin/Dashboard/Dashboard";
import PropertiesPage from "./routes/PropertiesPage/PropertiesPage";
import WishlistPage from "./routes/WishlistPage/WishlistPage";
import AboutUsPage from "./routes/AboutUsPage/AboutUsPage";
import UpdateProperty from "./routes/admin/UpdateProperty/UpdateProperty";
import JoinMembershipPage from "./routes/JoinMembershipPage/JoinMembershipPage";
import PropertyDetailsPage from "./routes/PropertyDetailsPage/PropertyDetailsPage";
import ProfilePage from "./routes/profilePage/profilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListingPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/admin",
          element: <Dashboard/>,
        },
        {
          path: "/admin/add-property",
          element: <AddProperty />,
        },
        {
          path: "/admin/update-property/:id",
          element: <UpdateProperty />,
        },
        {
          path: "/profile/*",
          element:<ProtectedRoute ><ProfilePage /></ProtectedRoute>,
        },
        {
          path: "/properties",
          element: <PropertiesPage />,
        },
        {
          path: "/property/:id",
          element: <PropertyDetailsPage />,
        },
        {
          path: "/wishlist",
          element: <WishlistPage />,
        },
        {
          path: "/about",
          element: <AboutUsPage />,
        },
        {
          path: "/join",
          element: <JoinMembershipPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
