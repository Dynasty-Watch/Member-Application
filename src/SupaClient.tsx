import { createClient } from "@supabase/supabase-js"

const supabaseURl = "https://jzfeudssjcxovwtauach.supabase.co"
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY as string

export const Supa = createClient(supabaseURl,supabaseAnonKey)