-- Add admin policies for booking management
-- This allows admins to view and manage all bookings

-- Add admin role check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  );
$$;

-- Admin policies for bookings table
CREATE POLICY "Admins can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update all bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can delete all bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Admin policies for users table
CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update all users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (is_admin());

-- Admin policies for rooms table
CREATE POLICY "Admins can manage all rooms"
  ON rooms
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Admin policies for payments table
CREATE POLICY "Admins can view all payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (is_admin());
