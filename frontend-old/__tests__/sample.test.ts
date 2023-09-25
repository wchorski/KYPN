
function calcSum(
  a: number | string,
  b: number | string
) {
  const aNum = Number(a)
  const bNum = Number(b)
  return aNum + bNum
}

describe('sample test 101', () => {

  it('sample success', () => {
    expect(1).toEqual(1)
    expect(calcSum('1', '2')).toEqual(3)
    expect(calcSum(1, 2)).toBeGreaterThanOrEqual(3)

  })

  // it('sample fail', () => {
  //   expect(2).toEqual('2')
  //   expect(1 + 2).toEqual(90)
  // })

})