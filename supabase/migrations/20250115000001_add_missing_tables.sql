-- Add missing tables for complete hotel management system
-- This migration adds essential tables for amenities, reviews, content, and more

-- 1. AMENITIES TABLE
CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  category text NOT NULL DEFAULT 'hotel', -- 'room', 'hotel', 'dining', 'recreation'
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. ROOM_AMENITIES (Many-to-many relationship)
CREATE TABLE IF NOT EXISTS room_amenities (
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (room_id, amenity_id)
);

-- 3. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_verified boolean DEFAULT false,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. PRICING TABLE (Dynamic pricing)
CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  date_from date NOT NULL,
  date_to date NOT NULL,
  base_price decimal NOT NULL,
  discount_percent decimal DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  code text UNIQUE,
  discount_type text NOT NULL DEFAULT 'percentage', -- 'percentage', 'fixed'
  discount_value decimal NOT NULL,
  min_booking_amount decimal DEFAULT 0,
  max_discount_amount decimal,
  valid_from date NOT NULL,
  valid_to date NOT NULL,
  usage_limit int,
  used_count int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. CONTENT TABLE (CMS)
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  type text NOT NULL DEFAULT 'page', -- 'page', 'blog', 'announcement', 'policy'
  status text NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  featured_image text,
  meta_title text,
  meta_description text,
  author_id uuid REFERENCES users(id),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. MEDIA TABLE
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text NOT NULL,
  alt_text text,
  caption text,
  category text DEFAULT 'general', -- 'room', 'amenity', 'content', 'general'
  is_public boolean DEFAULT true,
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- 8. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  description text,
  type text DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  category text DEFAULT 'general', -- 'general', 'booking', 'payment', 'email'
  is_public boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error', 'booking', 'payment'
  is_read boolean DEFAULT false,
  action_url text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- 10. CONTACT_INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new', -- 'new', 'read', 'replied', 'closed'
  priority text DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  assigned_to uuid REFERENCES users(id),
  response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 11. BOOKING_ADDONS TABLE (Optional services)
CREATE TABLE IF NOT EXISTS booking_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  quantity int DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- 12. STAFF TABLE (Hotel staff management)
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  employee_id text UNIQUE,
  position text NOT NULL,
  department text NOT NULL,
  hire_date date NOT NULL,
  salary decimal,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all new tables
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Basic policies for public access (amenities, content, media)
CREATE POLICY "Anyone can view amenities"
  ON amenities
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can view published content"
  ON content
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Anyone can view public media"
  ON media
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

CREATE POLICY "Anyone can view approved reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- Admin policies for all new tables
CREATE POLICY "Admins can manage amenities"
  ON amenities
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage room_amenities"
  ON room_amenities
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage pricing"
  ON pricing
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage promotions"
  ON promotions
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage content"
  ON content
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage media"
  ON media
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage settings"
  ON settings
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage contact_inquiries"
  ON contact_inquiries
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage booking_addons"
  ON booking_addons
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage staff"
  ON staff
  FOR ALL
  TO authenticated
  USING (is_admin());

-- User policies for personal data
CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert comprehensive sample data for all tables

-- 1. AMENITIES SAMPLE DATA
INSERT INTO amenities (name, description, icon, category) VALUES
('Free WiFi', 'High-speed internet access throughout the property', 'wifi', 'room'),
('Air Conditioning', 'Climate control in all rooms', 'snowflake', 'room'),
('TV', 'Flat-screen television with satellite channels', 'tv', 'room'),
('Mini Bar', 'Refrigerator with drinks and snacks', 'coffee', 'room'),
('Room Service', '24/7 room service available', 'bell', 'hotel'),
('Swimming Pool', 'Outdoor swimming pool with sun deck', 'waves', 'recreation'),
('Spa', 'Full-service spa and wellness center', 'spa', 'recreation'),
('Restaurant', 'On-site restaurant with local and international cuisine', 'utensils', 'dining'),
('Parking', 'Free parking for guests', 'car', 'hotel'),
('Concierge', '24/7 concierge service', 'user-check', 'hotel'),
('Gym', 'Fitness center with modern equipment', 'dumbbell', 'recreation'),
('Business Center', 'Meeting rooms and business facilities', 'briefcase', 'hotel'),
('Laundry Service', 'Professional laundry and dry cleaning', 'shirt', 'hotel'),
('Airport Shuttle', 'Complimentary airport transfer service', 'plane', 'hotel'),
('Garden', 'Beautiful landscaped gardens', 'tree', 'recreation');

-- 2. ROOM_AMENITIES SAMPLE DATA (assuming we have rooms with IDs)
-- Note: This will be populated after rooms are created
-- INSERT INTO room_amenities (room_id, amenity_id) VALUES
-- (room_id_1, amenity_id_1),
-- (room_id_1, amenity_id_2),
-- etc.

-- 3. REVIEWS SAMPLE DATA
INSERT INTO reviews (booking_id, user_id, room_id, rating, title, comment, is_verified, is_approved) VALUES
-- Note: These will be populated after bookings and users are created
-- (booking_id_1, user_id_1, room_id_1, 5, 'Excellent stay!', 'Beautiful room with amazing views', true, true),
-- (booking_id_2, user_id_2, room_id_2, 4, 'Great experience', 'Very comfortable and clean', true, true),
-- etc.

-- 4. PRICING SAMPLE DATA
INSERT INTO pricing (room_id, date_from, date_to, base_price, discount_percent, is_active) VALUES
-- Note: These will be populated after rooms are created
-- (room_id_1, '2024-01-01', '2024-03-31', 150.00, 0, true),
-- (room_id_1, '2024-04-01', '2024-06-30', 180.00, 10, true),
-- (room_id_1, '2024-07-01', '2024-09-30', 200.00, 0, true),
-- (room_id_1, '2024-10-01', '2024-12-31', 160.00, 15, true),
-- etc.

-- 5. PROMOTIONS SAMPLE DATA
INSERT INTO promotions (name, description, code, discount_type, discount_value, min_booking_amount, max_discount_amount, valid_from, valid_to, usage_limit, is_active) VALUES
('Early Bird Special', 'Book 30 days in advance and save 20%', 'EARLY20', 'percentage', 20.00, 100.00, 200.00, '2024-01-01', '2024-12-31', 100, true),
('Weekend Getaway', 'Weekend stays get 15% off', 'WEEKEND15', 'percentage', 15.00, 150.00, 150.00, '2024-01-01', '2024-12-31', 50, true),
('Long Stay Discount', 'Stay 7+ nights and save 25%', 'LONGSTAY25', 'percentage', 25.00, 500.00, 500.00, '2024-01-01', '2024-12-31', 25, true),
('New Year Special', 'New Year celebration package', 'NEWYEAR2024', 'fixed', 50.00, 200.00, 50.00, '2024-12-20', '2025-01-05', 30, true),
('Summer Escape', 'Summer vacation special offer', 'SUMMER2024', 'percentage', 30.00, 200.00, 300.00, '2024-06-01', '2024-08-31', 75, true);

-- 6. CONTENT SAMPLE DATA
INSERT INTO content (title, slug, content, excerpt, type, status, featured_image, meta_title, meta_description, published_at) VALUES
('Welcome to Chimpanzee Lodge', 'welcome', 'Experience the beauty of Rwanda at Chimpanzee Lodge, where luxury meets nature. Our lodge offers comfortable accommodations with stunning views of the surrounding landscape.', 'Discover luxury accommodation in the heart of Rwanda', 'page', 'published', '/images/hero/lodge-exterior.jpg', 'Welcome to Chimpanzee Lodge - Luxury Rwanda Accommodation', 'Experience luxury accommodation in Rwanda with stunning views and exceptional service at Chimpanzee Lodge.', '2024-01-01 00:00:00+00'),
('Our Rooms', 'rooms', 'Choose from our variety of comfortable rooms, each designed to provide the perfect blend of comfort and elegance. All rooms feature modern amenities and breathtaking views.', 'Comfortable and elegant rooms with modern amenities', 'page', 'published', '/images/rooms/room-overview.jpg', 'Our Rooms - Chimpanzee Lodge', 'Discover our comfortable and elegant rooms with modern amenities and breathtaking views at Chimpanzee Lodge.', '2024-01-01 00:00:00+00'),
('Dining Experience', 'dining', 'Indulge in our culinary delights featuring both local Rwandan cuisine and international dishes. Our restaurant offers a unique dining experience with fresh, locally sourced ingredients.', 'Culinary delights with local and international cuisine', 'page', 'published', '/images/restaurant/restaurant-interior.jpg', 'Dining Experience - Chimpanzee Lodge', 'Enjoy culinary delights with local and international cuisine at Chimpanzee Lodge restaurant.', '2024-01-01 00:00:00+00'),
('Amenities & Services', 'amenities', 'From our swimming pool to spa services, we offer a wide range of amenities to make your stay comfortable and memorable. Our 24/7 concierge service is always ready to assist you.', 'Comprehensive amenities and services for your comfort', 'page', 'published', '/images/amenities/pool-view.jpg', 'Amenities & Services - Chimpanzee Lodge', 'Discover our comprehensive amenities and services designed for your comfort and enjoyment at Chimpanzee Lodge.', '2024-01-01 00:00:00+00'),
('Booking Policies', 'booking-policies', 'Learn about our booking policies, cancellation terms, and important information for your stay. We strive to make your booking process as smooth as possible.', 'Important information about booking and stay policies', 'page', 'published', '/images/general/booking-info.jpg', 'Booking Policies - Chimpanzee Lodge', 'Learn about our booking policies and important information for your stay at Chimpanzee Lodge.', '2024-01-01 00:00:00+00'),
('Rwanda Travel Guide', 'rwanda-travel-guide', 'Discover the beauty of Rwanda with our comprehensive travel guide. From gorilla trekking to cultural experiences, Rwanda offers unforgettable adventures.', 'Complete guide to exploring Rwanda', 'blog', 'published', '/images/blog/rwanda-landscape.jpg', 'Rwanda Travel Guide - Chimpanzee Lodge', 'Discover the beauty of Rwanda with our comprehensive travel guide and adventure recommendations.', '2024-01-15 00:00:00+00'),
('Gorilla Trekking Tips', 'gorilla-trekking-tips', 'Everything you need to know about gorilla trekking in Rwanda. From what to pack to how to prepare, make the most of this once-in-a-lifetime experience.', 'Essential tips for gorilla trekking in Rwanda', 'blog', 'published', '/images/blog/gorilla-trekking.jpg', 'Gorilla Trekking Tips - Chimpanzee Lodge', 'Essential tips and advice for gorilla trekking in Rwanda from Chimpanzee Lodge.', '2024-01-20 00:00:00+00'),
('Local Culture & Traditions', 'local-culture-traditions', 'Immerse yourself in Rwandan culture and traditions. Learn about the local customs, festivals, and cultural experiences available during your stay.', 'Discover Rwandan culture and traditions', 'blog', 'published', '/images/blog/cultural-dance.jpg', 'Local Culture & Traditions - Chimpanzee Lodge', 'Immerse yourself in Rwandan culture and traditions during your stay at Chimpanzee Lodge.', '2024-01-25 00:00:00+00');

-- 7. MEDIA SAMPLE DATA
INSERT INTO media (filename, original_name, file_path, file_size, mime_type, alt_text, caption, category, is_public) VALUES
('lodge-exterior.jpg', 'Chimpanzee Lodge Exterior', '/images/hero/lodge-exterior.jpg', 2048576, 'image/jpeg', 'Chimpanzee Lodge exterior view', 'Beautiful exterior view of Chimpanzee Lodge', 'room', true),
('room-single.jpg', 'Single Room', '/images/rooms/single.jpg', 1536000, 'image/jpeg', 'Single room interior', 'Comfortable single room with modern amenities', 'room', true),
('room-double.jpg', 'Double Room', '/images/rooms/double.jpg', 1843200, 'image/jpeg', 'Double room interior', 'Spacious double room with stunning views', 'room', true),
('restaurant-interior.jpg', 'Restaurant Interior', '/images/restaurant/restaurant-interior.jpg', 2560000, 'image/jpeg', 'Restaurant dining area', 'Elegant restaurant with local and international cuisine', 'dining', true),
('pool-view.jpg', 'Swimming Pool', '/images/amenities/pool-view.jpg', 1920000, 'image/jpeg', 'Swimming pool area', 'Relaxing swimming pool with sun deck', 'recreation', true),
('spa-treatment.jpg', 'Spa Treatment', '/images/amenities/spa-treatment.jpg', 1280000, 'image/jpeg', 'Spa treatment room', 'Luxurious spa and wellness center', 'recreation', true),
('gorilla-trekking.jpg', 'Gorilla Trekking', '/images/blog/gorilla-trekking.jpg', 3072000, 'image/jpeg', 'Gorilla trekking experience', 'Once-in-a-lifetime gorilla trekking adventure', 'content', true),
('cultural-dance.jpg', 'Cultural Dance', '/images/blog/cultural-dance.jpg', 1792000, 'image/jpeg', 'Traditional Rwandan dance', 'Traditional cultural dance performance', 'content', true),
('rwanda-landscape.jpg', 'Rwanda Landscape', '/images/blog/rwanda-landscape.jpg', 4096000, 'image/jpeg', 'Beautiful Rwanda landscape', 'Stunning landscape views of Rwanda', 'content', true),
('booking-info.jpg', 'Booking Information', '/images/general/booking-info.jpg', 1024000, 'image/jpeg', 'Booking information', 'Important booking and stay information', 'general', true);

-- 8. SETTINGS SAMPLE DATA
INSERT INTO settings (key, value, description, type, category) VALUES
('hotel_name', 'Chimpanzee Lodge', 'Name of the hotel', 'string', 'general'),
('hotel_email', 'info@chimpanzeelodge.com', 'Main hotel email', 'string', 'general'),
('hotel_phone', '+250 788 467 700', 'Main hotel phone number', 'string', 'general'),
('hotel_address', 'Musanze, Northern Province, Rwanda', 'Hotel physical address', 'string', 'general'),
('check_in_time', '14:00', 'Standard check-in time', 'string', 'booking'),
('check_out_time', '11:00', 'Standard check-out time', 'string', 'booking'),
('cancellation_hours', '24', 'Hours before check-in for free cancellation', 'number', 'booking'),
('currency', 'USD', 'Default currency', 'string', 'payment'),
('tax_rate', '18', 'Tax rate percentage', 'number', 'payment'),
('max_guests_per_room', '4', 'Maximum guests allowed per room', 'number', 'booking'),
('booking_advance_days', '365', 'How many days in advance can bookings be made', 'number', 'booking'),
('min_booking_days', '1', 'Minimum number of days for booking', 'number', 'booking'),
('max_booking_days', '30', 'Maximum number of days for single booking', 'number', 'booking'),
('breakfast_included', 'true', 'Whether breakfast is included in room rate', 'boolean', 'booking'),
('wifi_password', 'chimpanzee2024', 'WiFi password for guests', 'string', 'general'),
('emergency_contact', '+250 788 467 700', 'Emergency contact number', 'string', 'general'),
('check_in_instructions', 'Please arrive at the main reception desk with valid ID', 'Instructions for check-in', 'string', 'booking'),
('pet_policy', 'Pets are not allowed on the property', 'Pet policy information', 'string', 'booking'),
('smoking_policy', 'No smoking in rooms or common areas', 'Smoking policy information', 'string', 'booking'),
('age_restriction', '18', 'Minimum age for booking', 'number', 'booking');

-- 9. NOTIFICATIONS SAMPLE DATA
INSERT INTO notifications (user_id, title, message, type, action_url, metadata) VALUES
-- Note: These will be populated after users are created
-- (user_id_1, 'Welcome to Chimpanzee Lodge!', 'Thank you for creating an account with us. We look forward to hosting you.', 'info', '/welcome', '{"welcome": true}'),
-- (user_id_2, 'Booking Confirmed', 'Your booking for Room 101 has been confirmed for March 15-17, 2024.', 'success', '/my-bookings', '{"booking_id": "booking_123"}'),
-- (user_id_3, 'Payment Received', 'Your payment of $300 has been successfully processed.', 'success', '/my-bookings', '{"amount": 300, "currency": "USD"}'),
-- (user_id_4, 'Check-in Reminder', 'Your check-in is tomorrow at 2:00 PM. We look forward to seeing you!', 'info', '/my-bookings', '{"check_in_date": "2024-03-15"}'),
-- (user_id_5, 'Special Offer', 'Book your next stay and save 20% with code EARLY20!', 'info', '/rooms', '{"promotion_code": "EARLY20"}');

-- 10. CONTACT_INQUIRIES SAMPLE DATA
INSERT INTO contact_inquiries (name, email, phone, subject, message, status, priority, created_at) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0123', 'Room Availability', 'Hi, I would like to know about room availability for March 15-20, 2024. Do you have any double rooms available?', 'new', 'medium', '2024-01-10 10:30:00+00'),
('Sarah Johnson', 'sarah.j@email.com', '+1-555-0456', 'Group Booking', 'We are planning a group trip for 12 people in April. Could you please provide information about group rates and availability?', 'read', 'high', '2024-01-12 14:20:00+00'),
('Michael Brown', 'm.brown@email.com', '+1-555-0789', 'Special Requirements', 'I have dietary restrictions and need to know if your restaurant can accommodate gluten-free meals. Also, do you have wheelchair accessible rooms?', 'replied', 'medium', '2024-01-15 09:15:00+00'),
('Emily Davis', 'emily.davis@email.com', '+1-555-0321', 'Gorilla Trekking Package', 'I am interested in your gorilla trekking package. Could you provide details about the itinerary and pricing?', 'new', 'high', '2024-01-18 16:45:00+00'),
('David Wilson', 'd.wilson@email.com', '+1-555-0654', 'Wedding Venue', 'We are looking for a wedding venue for our destination wedding in Rwanda. Does your lodge offer wedding packages?', 'new', 'high', '2024-01-20 11:30:00+00'),
('Lisa Anderson', 'lisa.anderson@email.com', '+1-555-0987', 'Cancellation Policy', 'I need to cancel my booking for February 10-12. What is your cancellation policy and will I get a full refund?', 'closed', 'medium', '2024-01-22 13:20:00+00'),
('Robert Taylor', 'robert.t@email.com', '+1-555-0123', 'Transportation', 'Do you provide airport pickup service? What are the rates and how do I arrange it?', 'read', 'medium', '2024-01-25 08:45:00+00'),
('Jennifer White', 'j.white@email.com', '+1-555-0456', 'Spa Services', 'I am interested in your spa services. Could you send me the spa menu and pricing information?', 'new', 'low', '2024-01-28 15:10:00+00');

-- 11. BOOKING_ADDONS SAMPLE DATA
INSERT INTO booking_addons (booking_id, name, description, price, quantity) VALUES
-- Note: These will be populated after bookings are created
-- (booking_id_1, 'Airport Transfer', 'One-way airport transfer service', 50.00, 1),
-- (booking_id_1, 'Breakfast', 'Daily breakfast for 2 guests', 30.00, 3),
-- (booking_id_2, 'Gorilla Trekking Tour', 'Full-day gorilla trekking experience', 200.00, 2),
-- (booking_id_2, 'Spa Treatment', 'Relaxing massage and spa treatment', 80.00, 1),
-- (booking_id_3, 'Dinner Package', '3-course dinner for 2 guests', 60.00, 2),
-- (booking_id_3, 'Laundry Service', 'Professional laundry service', 25.00, 1),
-- (booking_id_4, 'City Tour', 'Half-day city tour with guide', 75.00, 2),
-- (booking_id_4, 'Photography Session', 'Professional photography session', 120.00, 1);

-- 12. STAFF SAMPLE DATA
INSERT INTO staff (user_id, employee_id, position, department, hire_date, salary, is_active) VALUES
-- Note: These will be populated after users are created
-- (user_id_admin, 'EMP001', 'General Manager', 'Management', '2023-01-15', 5000.00, true),
-- (user_id_2, 'EMP002', 'Front Desk Manager', 'Reception', '2023-02-01', 3500.00, true),
-- (user_id_3, 'EMP003', 'Head Chef', 'Kitchen', '2023-02-15', 4000.00, true),
-- (user_id_4, 'EMP004', 'Housekeeping Supervisor', 'Housekeeping', '2023-03-01', 2800.00, true),
-- (user_id_5, 'EMP005', 'Concierge', 'Guest Services', '2023-03-15', 2500.00, true),
-- (user_id_6, 'EMP006', 'Spa Therapist', 'Spa', '2023-04-01', 2200.00, true),
-- (user_id_7, 'EMP007', 'Maintenance Technician', 'Maintenance', '2023-04-15', 2000.00, true),
-- (user_id_8, 'EMP008', 'Security Guard', 'Security', '2023-05-01', 1800.00, true);
