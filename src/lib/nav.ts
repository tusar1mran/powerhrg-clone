// Route matching for navigation links, shared by the desktop menu and the mobile sheet.

/** True when `pathname` is `href` itself or a page below it. Hash and query parts of `href` are ignored. */
export function isActivePath(pathname: string, href: string): boolean {
  const [path] = href.split(/[?#]/);
  if (!path || path === "/") {
    return pathname === "/";
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}
