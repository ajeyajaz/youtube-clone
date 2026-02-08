import useAuth from "./useAuth"

function AuthInitializer({children}) {
        useAuth();
  return children
}

export default AuthInitializer