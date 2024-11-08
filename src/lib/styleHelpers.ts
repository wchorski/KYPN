import { ColorsTheme } from "../keystone/types"
import { bg_c_accent, bg_c_plain, bg_c_primary, bg_c_reverse_theme, bg_c_secondary, bg_c_tertiary, bg_c_transparent } from "../styles/colors.module.css"

export function getColorTheme(colorTheme:ColorsTheme) {
  switch (colorTheme) {
    case "bg_c_transparent":
      return bg_c_transparent
    case "bg_c_reverse_theme":
      return bg_c_reverse_theme
    case "bg_c_primary":
      return bg_c_primary
    case "bg_c_secondary":
      return bg_c_secondary
    case "bg_c_tertiary":
      return bg_c_tertiary
    case "bg_c_accent":
      return bg_c_accent
    default:
      return bg_c_plain
  }
}