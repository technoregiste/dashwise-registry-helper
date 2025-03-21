
-- Check if profiles table exists and create it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'profiles'
    ) THEN
        CREATE TABLE profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            founder_name TEXT,
            company_name TEXT,
            company_number TEXT,
            phone TEXT,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    ELSE
        -- Make sure all necessary columns exist
        BEGIN
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS founder_name TEXT;
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_number TEXT;
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
            ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error adding columns: %', SQLERRM;
        END;
    END IF;
END
$$;

-- Create or replace the trigger function for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, founder_name, company_name, company_number, phone, role, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'founder_name', 
    NEW.raw_user_meta_data->>'company_name', 
    NEW.raw_user_meta_data->>'company_number', 
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    NOW(), 
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
