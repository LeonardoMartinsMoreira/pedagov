/** String não vazia (ex.: JWT em `access_token` ou `session`). */
export function nonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim() !== ''
}

/** API mandou `session` (JWT string) → obrigar /change-password. */
export function mustChangePassword(sessionField: unknown): boolean {
  return nonEmptyString(sessionField)
}

/** `session` na raiz, em `result` ou `data` (valor é JWT string). */
export function pickSessionFromResponse(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined
  const root = data as Record<string, unknown>

  const read = (o: Record<string, unknown>) => {
    const s = o.session ?? o.Session
    return nonEmptyString(s) ? s : undefined
  }

  return (
    read(root) ??
    (root.result && typeof root.result === 'object'
      ? read(root.result as Record<string, unknown>)
      : undefined) ??
    (root.data && typeof root.data === 'object'
      ? read(root.data as Record<string, unknown>)
      : undefined)
  )
}
