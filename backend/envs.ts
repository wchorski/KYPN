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
const SITE_TITLE = process.env.SITE_TITLE
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_CAL_ID = process.env.GOOGLE_CAL_ID

const NODE_ENV = process.env.NODE_ENV

export const envs = {
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
  SITE_TITLE,
  ADMIN_EMAIL_ADDRESS,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CAL_ID,
  NODE_ENV,
} 