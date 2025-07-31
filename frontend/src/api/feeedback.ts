import { createClient } from "@supabase/supabase-js";
// import dotenv from 'dotenv'
// dotenv.config()
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function (name: string | null, content: string) {
    const res = await supabase.from('feedback').insert({
        name: name,
        content: content
    }).select()
    return res.data ? true : false
}