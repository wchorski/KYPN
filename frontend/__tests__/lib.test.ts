import moneyFormatter from '../lib/moneyFormatter'

describe('format money function', () => {

  it('moneyFormatter: fractional', () => {
    expect(moneyFormatter(1)).toEqual('$0.01')
    expect(moneyFormatter(40)).toEqual('$0.40')
    expect(moneyFormatter(501)).toEqual('$5.01')
    expect(moneyFormatter(999999)).toEqual('$9,999.99')
  })

  it('moneyFormatter: whole rounding', () => {
    expect(moneyFormatter(8000)).toEqual('$80')
    expect(moneyFormatter(5000)).toEqual('$50')
    expect(moneyFormatter(100)).toEqual('$1')
  })

})