const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || ''
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || ''
const ADMIN_EMAIL_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS
const ASSET_REPO = process.env.NEXT_PUBLIC_ASSET_REPO
const SITE_URI = process.env.NEXT_PUBLIC_SITE_URI
const API_URI = process.env.NEXT_PUBLIC_API_URI
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL
const UMAMI_SCRIPT = process.env.NEXT_PUBLIC_UMAMI_SCRIPT
const PERPAGE = Number(process.env.PERPAGE) || 10

export const envvars = {
  SITE_TITLE,
  SITE_DESCRIPTION,
  ADMIN_EMAIL_ADDRESS,
  ASSET_REPO,
  SITE_URI,
  API_URI,
  UMAMI_ID,
  UMAMI_URL,
  UMAMI_SCRIPT,
  PERPAGE
}