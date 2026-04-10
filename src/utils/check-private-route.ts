/** Apenas `/login` é acessível sem sessão (alinhado ao middleware). */
export function checkPrivateRoute(pathname: string): boolean {
  if (pathname === '/login' || pathname.startsWith('/login/')) {
    return false
  }
  return true
}
