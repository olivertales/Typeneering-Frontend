import { RGBA } from "ngx-color";
export class ColorUtils {
  static rgbToString(rgb: RGBA) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
  }
}
