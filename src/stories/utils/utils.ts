interface DenormalizedScssVar {
  type: string;
  value: number;
  unit: string;
}

interface ScssVar {
  name: string;
  type: string;
  value: number;
  unit: string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sassVars = require('sass-extract-loader!../../zen-styles/main.scss');

export function scssArrayVar(varName: string): ScssVar[] {
  return Object.entries(sassVars.global[varName].value).map(([key, value]) => ({
    name: key,
    ...(value as DenormalizedScssVar),
  }));
}

export function scssNonNullBreakpoints(): ScssVar[] {
  return scssArrayVar('$grid-breakpoints').filter(n => !!n.value);
}

export function scssBreakpoint(breakpoint: string): ScssVar {
  return scssArrayVar('$grid-breakpoints').find(n => n.name === breakpoint);
}
