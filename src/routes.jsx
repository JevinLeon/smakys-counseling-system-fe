import {
  ClassDetail,
  ClassesPage,
  CounselingDetail,
  CounselingsPage,
  HomePage,
  LoginPage,
  NewCounseling,
  NewStudent,
  NewUser,
  NotFoundPage,
  ProfilePage,
  StudentDetail,
  StudentsPage,
  UserDetail,
  UsersPage,
} from "./pages";
import Layout from "@/components/Layout";
import ProtectedPage from "./components/Protected";
import NonProtectedPage from "./components/NonProtected";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedPage>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedPage>
        <Layout>
          <UsersPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/users/new",
    element: (
      <ProtectedPage>
        <Layout>
          <NewUser />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedPage>
        <Layout>
          <UserDetail />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedPage>
        <Layout>
          <StudentsPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/students/new",
    element: (
      <ProtectedPage>
        <Layout>
          <NewStudent />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/students/:id",
    element: (
      <ProtectedPage>
        <Layout>
          <StudentDetail />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/classes",
    element: (
      <ProtectedPage>
        <Layout>
          <ClassesPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/classes/:id",
    element: (
      <ProtectedPage>
        <Layout>
          <ClassDetail />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/counselings",
    element: (
      <ProtectedPage>
        <Layout>
          <CounselingsPage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/counselings/new",
    element: (
      <ProtectedPage>
        <Layout>
          <NewCounseling />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/counselings/:id",
    element: (
      <ProtectedPage>
        <Layout>
          <CounselingDetail />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedPage>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedPage>
    ),
  },
  {
    path: "/login",
    element: (
      <NonProtectedPage>
        <LoginPage />
      </NonProtectedPage>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
