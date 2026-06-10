export function ymGoal(goal: string) {
  if (typeof window !== 'undefined' && typeof (window as unknown as { ym?: unknown }).ym === 'function') {
    (window as unknown as { ym: (id: number, event: string, goal: string) => void }).ym(109747493, 'reachGoal', goal)
  }
}
