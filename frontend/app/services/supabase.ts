import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bdboktrtjzasbbxavmyt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYm9rdHJ0anphc2JieGF2bXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjM5MDYsImV4cCI6MjA4NDQzOTkwNn0.ni4YL3ZeyEaxIkjFB1sJ2uJDaij2_-4VRcZTGBSOFCs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);