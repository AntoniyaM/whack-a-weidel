const breakpoints = {
  s: 421,
  m: 1001,
  xl: 1401,
}

export const isMobile = (width = window.innerWidth) => {
  return width < breakpoints.m;
}
