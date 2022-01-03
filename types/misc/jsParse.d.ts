declare namespace imports.misc.jsParse {
  function getCompletions(text: string, commandHeader: string, globalCompletionList?: []): [string[], string]
  function isStopChar(c: string): boolean
  function isValidPropertyName(c: string): boolean
  function findMatchingQuote(expr: string, offset: number): number
  function findMatchingSlash(expr: string, offset: number): number
  function findMatchingBrace(expr: string, offset: number): number
  function getExpressionOffset(expr: string, offset: number): number
  function findTheBrace(expr: string, offset: number, ...braces: number[]): number
  function getAllProps(obj: any): string
  function getPropertyNamesFromExpression(expr: string, commandHeader?: string): string[]
  function getCommonPrefix(words: string[]): string
  function removeLiterals(str: string): string
  function isUnsafeExpression(str: string): boolean
  function getDeclaredConstants(str: string): string[]
}
