/*
  # Create Content Management Tables

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `name` (text, game name)
      - `game_id` (text, Roblox game ID)
      - `thumbnail` (text, thumbnail URL)
      - `description` (text, game description)
      - `status` (text, working/updating/patched)
      - `features` (text[], array of features)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `showcases`
      - `id` (uuid, primary key)
      - `title` (text, video title)
      - `url` (text, YouTube URL)
      - `video_id` (text, YouTube video ID)
      - `thumbnail` (text, thumbnail URL)
      - `description` (text, video description)
      - `duration` (text, video duration)
      - `views` (integer, view count)
      - `channel` (text, channel name)
      - `date` (date, publish date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  game_id text NOT NULL,
  thumbnail text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'working',
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create showcases table
CREATE TABLE IF NOT EXISTS showcases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  video_id text NOT NULL,
  thumbnail text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  views integer DEFAULT 0,
  channel text DEFAULT 'YokaiScripts',
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcases ENABLE ROW LEVEL SECURITY;

-- Games Policies
CREATE POLICY "Anyone can view games"
  ON games
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert games"
  ON games
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update games"
  ON games
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete games"
  ON games
  FOR DELETE
  TO authenticated
  USING (true);

-- Showcases Policies
CREATE POLICY "Anyone can view showcases"
  ON showcases
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert showcases"
  ON showcases
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update showcases"
  ON showcases
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete showcases"
  ON showcases
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_showcases_updated_at
  BEFORE UPDATE ON showcases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_showcases_date ON showcases(date DESC);
CREATE INDEX IF NOT EXISTS idx_showcases_created_at ON showcases(created_at DESC);
