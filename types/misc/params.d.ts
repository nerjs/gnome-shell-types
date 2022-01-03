declare namespace imports.misc.parse {
  function parse<P extends Record<string | symbol, any>, D extends Record<string | symbol, any>>(
    params: P,
    defaults: D,
    allowExtras?: boolean,
  ): D & P
}
