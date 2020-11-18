const sassVars = require('sass-extract-loader!../../zen-styles/variables.scss');

export function scssArrayVar(varName) {
  return Object.entries(sassVars.global[varName].value).map(([key, value]) => ({
    name: key, ...value
  }))
}

export function scssNonNullBreakpoints() {
  return scssArrayVar('$grid-breakpoints').filter(n => !!n.value);
}

export function scssBreakpoint(breakpoint) {
  return scssArrayVar('$grid-breakpoints').find(n => n.name === breakpoint);
}
