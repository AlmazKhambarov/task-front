import { routes } from "@/constants/routes";
import { Auth, Documents, DocumentCreate, DocumentUpdate } from "@/pages";
export const publicRoutes = [
  {
    path: routes.AUTH,
    element: Auth,
  },
];

export const privateRoutes = [
  {
    path: routes.HOME,
    element: Documents,
  },
  {
    path: routes.CREATE_DOC,
    element: DocumentCreate,
  },
  {
    path: routes.UPDATE_DOC,
    element: DocumentUpdate,
  },
];
