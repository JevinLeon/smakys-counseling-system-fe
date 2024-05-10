import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ClassesPage,
  CounselingsPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  StudentsPage,
  UsersPage,
} from "./pages";
import { ThemeProvider } from "@/utils/ThemeProvider";
import Layout from "@/components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <UsersPage />
      </Layout>
    ),
  },
  {
    path: "/students",
    element: (
      <Layout>
        <StudentsPage />
      </Layout>
    ),
  },
  {
    path: "/classes",
    element: (
      <Layout>
        <ClassesPage />
      </Layout>
    ),
  },
  {
    path: "/counselings",
    element: (
      <Layout>
        <CounselingsPage />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
