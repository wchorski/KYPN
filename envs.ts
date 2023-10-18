const STRIPE_SECRET = process.env.STRIPE_SECRET || "sk_test_****"

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET

const DATABASE_URL = process.env.DATABASE_URL
const DB_PROTOCOL = process.env.DB_PROTOCOL || 'no_db_protocol'
const DB_USER = process.env.DB_USER || 'no_db_user'
const DB_PASSWORD = process.env.DB_PASSWORD || 'no_db_password'
const DB_DOMAIN = process.env.DB_DOMAIN || 'no_db_domain'
const DB_PORT = process.env.DB_PORT || 'no_db_port'
const DB_COLLECTION = process.env.DB_COLLECTION || 'no_db_collection'
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = process.env.MAIL_PORT
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS
const FRONTEND_URL = process.env.FRONTEND_URL || 'no_frontend_url'
const SESSION_SECRET = process.env.SESSION_SECRET
const BACKEND_URL = process.env.BACKEND_URL
const BACKEND_PORT = process.env.BACKEND_PORT || 'no_backend_port'
const SEED_ME = process.env.SEED_ME

const WORK_FACTOR = Number(process.env.WORK_FACTOR) || 13

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_CAL_ID = process.env.GOOGLE_CAL_ID

const NODE_ENV = process.env.NODE_ENV

// FRONTEND
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
  WORK_FACTOR,
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
  STRIPE_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
  DATABASE_URL,
  DB_PROTOCOL,
  DB_USER,
  DB_PASSWORD,
  DB_DOMAIN,
  DB_PORT,
  DB_COLLECTION,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  FRONTEND_URL,
  SESSION_SECRET,
  BACKEND_URL,
  BACKEND_PORT,
  SEED_ME,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CAL_ID,
  NODE_ENV,
} 