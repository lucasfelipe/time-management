
export const TOGGLE_SIDE_BAR = "TOGGLE_SIDE_BAR";
export function toggleSideBar(opened) {
  console.log("opened", opened);
  return {
    type: TOGGLE_SIDE_BAR,
    payload: opened
  };
}
