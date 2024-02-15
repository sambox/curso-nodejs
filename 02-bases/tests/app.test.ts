
/*
AAA
1. Arrange
2. Act
3. Assert
*/


describe('App', () => {

  test('should be true', () => {
    // 1.
    const num1 = 10
    const num2 = 20
    const result = num1 + num2
    expect(result).toBe(30);
  })

})