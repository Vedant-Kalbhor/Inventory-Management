import { useSelector } from 'react-redux';

export default function useAuth() {
  const user = useSelector((s) => s.auth.user);
  const isAuthenticated = Boolean(user);
  return { user, isAuthenticated };
}
