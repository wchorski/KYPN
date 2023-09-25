const STRIPE_KEY          = process.env.NEXT_PUBLIC_STRIPE_KEY          || 'no_stripe_key'
const STRIPE_SECRET_KEY   = process.env.STRIPE_SECRET_KEY               || 'no_stripe_secret'
const API_URI             = process.env.NEXT_PUBLIC_API_URI             || 'no_api_uri'
const SITE_URI            = process.env.NEXT_PUBLIC_SITE_URI            || 'no_site_uri'
const SITE_TITLE          = process.env.NEXT_PUBLIC_SITE_TITLE          || 'no_site_title'
const SITE_DESC          = process.env.NEXT_PUBLIC_SITE_DESC          || 'no_site_desc'
const ADMIN_EMAIL_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || 'no_admin_email_address'
const UMAMI_ID            = process.env.NEXT_PUBLIC_UMAMI_ID            || 'no_analytics_id'
const UMAMI_URL           = process.env.NEXT_PUBLIC_UMAMI_URL           || 'no_analytics_url'
const UMAMI_SCRIPT        = process.env.NEXT_PUBLIC_UMAMI_SCRIPT        || 'no_analytics_script'

export const envs = {
  STRIPE_KEY,
  STRIPE_SECRET_KEY,
  API_URI,
  SITE_URI,
  SITE_TITLE,
  SITE_DESC,
  ADMIN_EMAIL_ADDRESS,
  UMAMI_ID,
  UMAMI_URL,
  UMAMI_SCRIPT,

}