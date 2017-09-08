// Some utility (no actual blend-related algorithms) for color handling

/**
 * Restricts a number to given boundaries
 * @param {number} value  The number to restrict
 * @param {number} from   The lower boundary
 * @param {number} to     The upper boundary
 * @return {number}       The restricted value
 */
function restrictNumber (value, from, to) {
  return Math.min(Math.max(value, from), to)
}

module.exports = {
  /**
   * Restricts an { r,g,b,a } color to its boundaries (0..255 color channels, 0..1 alpha channel)
   * @param {object} color  The { r,g,b,a } color to restrict
   * @return {object}       The restricted color
   */
  restrictColor: function (color) {
    return {
      r: restrictNumber(color.r, 0, 255),
      g: restrictNumber(color.g, 0, 255),
      b: restrictNumber(color.b, 0, 255),
      a: restrictNumber(color.a, 0, 1)
    }
  },

  /**
   * Converts a color from unit color channels (0..1) to 8-bit color channels (0..255)
   * @param {object} color  The { r,g,b,a } color to convert
   * @return {object}       The { r,g,b,a } with 8-bit color channels
   */
  convertFromUnit: function (color) {
    return {
      r: color.r * 255,
      g: color.g * 255,
      b: color.b * 255,
      a: color.a
    }
  },

  /**
   * Converts a color from 8-bit color channels (0..255) to unit color channels (0..1)
   * @param {object} color  The { r,g,b,a } color to convert
   * @return {object}       The { r,g,b,a } with unit color channels
   */
  convertToUnit: function (color) {
    return {
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
      a: color.a
    }
  },

  /**
   * Rounds the color channels of an RGBA color
   * @param {object} color      The { r,g,b,a } color to handle
   * @param {number} precision  How many decimals? Defaults to 0
   * @return {object}           The { r,g,b,a } with rounded color channels
  */
  roundChannels: function (color, precision) {
    if (precision == null) precision = 0

    var multiplier = Math.pow(10, precision)

    return {
      r: Math.round(color.r * multiplier) / multiplier,
      g: Math.round(color.g * multiplier) / multiplier,
      b: Math.round(color.b * multiplier) / multiplier,
      a: color.a
    }
  },

  /**
   * Rounds the color channels of an RGBA color to many decimals to preserve precision but avoiding weird JavaScript floating point issues
   * @param {object} color  The { r,g,b,a } color to handle
   * @return {object}       The { r,g,b,a } with rounded color channels
  */
  roundChannelsForSanity: function (color) {
    return this.roundChannels(color, 9)
  },

  /**
   * Converts rgb/rgba/hex string to object
   * @param {string} col
   * @return {object} The { r,g,b,a }
   */
  convertFromString: function(col) {
    var _hex2dec = function(v) {
      return parseInt(v, 16)
    }

    var _splitHEX = function(hex) {
      var c
      if (hex.length === 4) {
        c = (hex.replace('#','')).split('')
        return {
          r: _hex2dec((c[0] + c[0])),
          g: _hex2dec((c[1] + c[1])),
          b: _hex2dec((c[2] + c[2])),
          a: 1
        }
      } else {
        return {
          r: _hex2dec(hex.slice(1,3)),
          g: _hex2dec(hex.slice(3,5)),
          b: _hex2dec(hex.slice(5)),
          a: 1
        }
      }
    }

    var _splitRGB = function(rgb) {
      var c = (rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'))).split(',')
      var flag = false, obj
      c = c.map(function(n,i) {
        return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n)
      })
      obj = {
        r: c[0],
        g: c[1],
        b: c[2]
      }
      obj.a = c[3] ? c[3] : 1
      return obj
    }

    var slc = col.slice(0,1)
    if (slc === '#') {
      return _splitHEX(col)
    } else if (slc.toLowerCase() === 'r') {
      return _splitRGB(col)
    } else {
      console.log('!Ooops! RGBvalues.color('+col+') : HEX, RGB, or RGBa strings only')
    }

    return {
      color: color
    }
  }
}
