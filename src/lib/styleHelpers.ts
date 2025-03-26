import type { ColorsTheme } from "../keystone/types"
import { bg_c_accent, bg_c_plain, bg_c_primary, bg_c_reverse_theme, bg_c_secondary, bg_c_tertiary, bg_c_transparent, outline_c_secondary, outline_c_tertiary } from "../styles/colorthemes.module.css"


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
    case "outline_c_secondary":
      return outline_c_secondary
    case "outline_c_tertiary":
      return outline_c_tertiary
    default:
      return bg_c_plain
  }
}

export const colorThemeOptions =  [
  {value: 'bg_c_plain', label: 'Plain'},
  {value: 'bg_c_primary', label: 'Primary'},
  {value: 'bg_c_secondary', label: 'Secondary'},
  {value: 'bg_c_tertiary', label: 'Tertiary'},
  {value: 'bg_c_accent', label: 'Accent'},
  {value: 'bg_c_transparent', label: 'transparent'},
  {value: 'bg_c_reverse_theme', label: 'Inverted'},
] as {value:ColorsTheme, label:string}[]