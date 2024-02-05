
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txevelvccfmuvmzjzppa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZXZlbHZjY2ZtdXZtemp6cHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMDk0MDMsImV4cCI6MjAyMjY4NTQwM30.UNh9UCqYL9ifKkBF6RC8mkApHyNpOlnqTKACN0NbaD8'
export const supabase = createClient(supabaseUrl, supabaseKey)