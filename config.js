import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(url) {
  if (!url) return "";
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

/* =========================================
  OpenRouter Configuration
========================================= */

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

export const openai = OPENROUTER_API_KEY
  ? new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: OPENROUTER_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  : null;

/* =========================================
  Supabase Configuration
========================================= */

const supabaseUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL || "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
