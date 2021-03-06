import { exprToSQL } from './expr'
import { hasVal } from './util'
import { overToSQL } from './over'

function castToSQL(expr) {
  const str = expr.target.length ? `(${expr.target.length})` : ''
  let prefix = exprToSQL(expr.expr)
  let symbol = '::'
  let suffix = ''
  if (expr.symbol === 'as') {
    prefix = `CAST(${prefix}`
    suffix = ')'
    symbol = ` ${expr.symbol.toUpperCase()} `
  }
  return `${prefix}${symbol}${expr.target.dataType}${str}${suffix}`
}

function funcToSQL(expr) {
  const { args, name } = expr
  if (!args) return name
  const { parentheses, over } = expr
  const str = `${name}(${exprToSQL(args).join(', ')})`
  const overStr = overToSQL(over)
  return [parentheses ? `(${str})` : str, overStr].filter(hasVal).join(' ')
}

export {
  castToSQL,
  funcToSQL,
}
