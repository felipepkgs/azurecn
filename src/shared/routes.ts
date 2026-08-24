/** Azure Boards hub, Kanban board, Backlogs, and Sprints routes only. */
export function isSupportedBoardsRoute(pathname: string): boolean {
  const normalized = pathname.toLowerCase().replace(/\/+$/, "");
  return normalized === "_boards" || normalized.endsWith("/_boards") || normalized.includes("/_boards/");
}
