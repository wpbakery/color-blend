/* eslint-env mocha */

var blender = require('../src/blend')

var assert = require('assert')

var convert = function (color) {
  return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
}
/**
 * Basics
 */
describe('Basics: blend { r: 250, g: 200, b: 0, a: 0.6 } with { r: 50, g: 150, b: 75, a: 0.4 }', function () {
  describe('normal', function () {
    it('should return { r: 145, g: 174, b: 39, a: 0.76 }', function () {
      assert.equal(
        blender.normal({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 145, g: 174, b: 39, a: 0.76 })
      )
    })
  })

  describe('multiply', function () {
    it('should return { r: 144, g: 164, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.multiply({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 144, g: 164, b: 16, a: 0.76 })
      )
    })
  })

  describe('screen', function () {
    it('should return { r: 208, g: 199, b: 39, a: 0.76 }', function () {
      assert.deepEqual(
        blender.screen({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 208, g: 199, b: 39, a: 0.76 })
      )
    })
  })

  describe('overlay', function () {
    it('should return { r: 207, g: 193, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.overlay({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 207, g: 193, b: 16, a: 0.76 })
      )
    })
  })

  describe('colorDodge', function () {
    it('should return { r: 209, g: 207, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.colorDodge({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 209, g: 207, b: 16, a: 0.76 })
      )
    })
  })

  describe('colorBurn', function () {
    it('should return { r: 202, g: 177, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.colorBurn({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 202, g: 177, b: 16, a: 0.76 })
      )
    })
  })

  describe('hardLight', function () {
    it('should return { r: 160, g: 193, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.hardLight({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 160, g: 193, b: 16, a: 0.76 })
      )
    })
  })

  describe('softLight', function () {
    it('should return { r: 207, g: 191, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.softLight({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 207, g: 191, b: 16, a: 0.76 })
      )
    })
  })

  describe('difference', function () {
    it('should return { r: 192, g: 142, b: 39, a: 0.76 }', function () {
      assert.deepEqual(
        blender.difference({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 192, g: 142, b: 39, a: 0.76 })
      )
    })
  })

  describe('exclusion', function () {
    it('should return { r: 193, g: 163, b: 39, a: 0.76 }', function () {
      assert.deepEqual(
        blender.exclusion({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 193, g: 163, b: 39, a: 0.76 })
      )
    })
  })

  describe('hue', function () {
    it('should return { r: 162, g: 207, b: 49, a: 0.76 }', function () {
      assert.deepEqual(
        blender.hue({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 162, g: 207, b: 49, a: 0.76 })
      )
    })
  })

  describe('saturation', function () {
    it('should return { r: 209, g: 182, b: 54, a: 0.76 }', function () {
      assert.deepEqual(
        blender.saturation({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 209, g: 182, b: 54, a: 0.76 })
      )
    })
  })

  describe('luminosity', function () {
    it('should return { r: 175, g: 163, b: 16, a: 0.76 }', function () {
      assert.deepEqual(
        blender.luminosity({ r: 250, g: 200, b: 0, a: 0.6 }, { r: 50, g: 150, b: 75, a: 0.4 }),
        convert({ r: 175, g: 163, b: 16, a: 0.76 })
      )
    })
  })
})

/**
 * Options
 */
// function approxChannels (color) {
//   return {
//     r: Math.round(color.r * 1000) / 1000,
//     g: Math.round(color.g * 1000) / 1000,
//     b: Math.round(color.b * 1000) / 1000,
//     a: color.a
//   }
// }

// describe('Options: use blend mode `normal` and different options', function () {
//   describe('disable `roundOutput`', function () {
//     it('blend { r: 150, g: 0, b: 0, a: 0.5 } and { r: 0, g: 250, b: 0, a: 0.5 } should (approximately) return { r: 50, g: 166.667, b: 0, a: 0.75 }', function () {
//       blender.options.roundOutput = false
//       assert.deepEqual(
//         approxChannels(blender.normal({ r: 150, g: 0, b: 0, a: 0.5 }, { r: 0, g: 250, b: 0, a: 0.5 })),
//         approxChannels({ r: 50, g: 166.667, b: 0, a: 0.75 })
//         )
//     })
//   })

//   describe('enable `unitInput`', function () {
//     it('blend { r: 1, g: 0, b: 0, a: 0.5 } and { r: 0, g: 1, b: 0, a: 0.5 } should return { r: 85, g: 170, b: 0, a: 0.75 }', function () {
//       blender.options.unitInput = true
//       assert.deepEqual(
//         blender.normal({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 1, b: 0, a: 0.5 }),
//         { r: 85, g: 170, b: 0, a: 0.75 }
//         )
//     })
//   })

//   describe('enable `unitOutput` (leave `unitInput` enabled)', function () {
//     it('blend { r: 1, g: 0, b: 0, a: 0.5 } and { r: 0, g: 1, b: 0, a: 0.5 } should (approximately) return { r: 0.333, g: 0.667, b: 0, a: 0.75 }', function () {
//       blender.options.unitOutput = true
//       assert.deepEqual(
//         approxChannels(blender.normal({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 1, b: 0, a: 0.5 })),
//         approxChannels({ r: 1 / 3, g: 2 / 3, b: 0, a: 0.75 })
//         )
//     })
//   })
// })
