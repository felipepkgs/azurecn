import { describe, expect, it } from "vitest";
import { isSupportedBoardsRoute } from "../src/shared/routes";

describe("isSupportedBoardsRoute", () => {
  it.each([
    "/fabrikam/_boards",
    "/fabrikam/Widgets/_boards/board/t/Widgets%20Team/Stories",
    "/fabrikam/Widgets/_boards/backlogs/Stories",
    "/fabrikam/Widgets/_boards/sprints"
  ])("accepts supported Boards paths: %s", (path) => {
    expect(isSupportedBoardsRoute(path)).toBe(true);
  });

  it.each(["/fabrikam/Widgets/_git/repo", "/fabrikam/Widgets/_workitems/edit/42", "/"])(
    "leaves non-Boards paths untouched: %s",
    (path) => {
      expect(isSupportedBoardsRoute(path)).toBe(false);
    }
  );
});
