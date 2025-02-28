
-- Create the stripe_connect_accounts table
CREATE TABLE IF NOT EXISTS stripe_connect_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_account_id TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  onboarded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_stripe_connect_accounts_user_id ON stripe_connect_accounts(user_id);

-- Create index on stripe_account_id
CREATE INDEX IF NOT EXISTS idx_stripe_connect_accounts_account_id ON stripe_connect_accounts(stripe_account_id);

-- Create the connect_payments table
CREATE TABLE IF NOT EXISTS connect_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  photographer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT NOT NULL,
  stripe_connect_account_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL,
  description TEXT,
  service_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_connect_payments_user_id ON connect_payments(user_id);

-- Create index on photographer_id
CREATE INDEX IF NOT EXISTS idx_connect_payments_photographer_id ON connect_payments(photographer_id);

-- Create index on payment intent ID
CREATE INDEX IF NOT EXISTS idx_connect_payments_intent_id ON connect_payments(stripe_payment_intent_id);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stripe_connect_accounts_timestamp
BEFORE UPDATE ON stripe_connect_accounts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_connect_payments_timestamp
BEFORE UPDATE ON connect_payments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create Row Level Security (RLS) policies
ALTER TABLE stripe_connect_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect_payments ENABLE ROW LEVEL SECURITY;

-- Create policy for stripe_connect_accounts
CREATE POLICY "Users can view their own connect accounts"
  ON stripe_connect_accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for connect_payments (for buyers)
CREATE POLICY "Users can view their own payments"
  ON connect_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for connect_payments (for photographers)
CREATE POLICY "Photographers can view payments made to them"
  ON connect_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = photographer_id);

-- Add service role access for both tables
CREATE POLICY "Service role has full access to stripe_connect_accounts"
  ON stripe_connect_accounts FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role has full access to connect_payments"
  ON connect_payments FOR ALL
  TO service_role
  USING (true);
