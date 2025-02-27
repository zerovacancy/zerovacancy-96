
-- Create subscriptions table
CREATE TABLE IF NOT EXISTS customer_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_user_id ON customer_subscriptions(user_id);

-- Create index on stripe_subscription_id
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_subscription_id ON customer_subscriptions(stripe_subscription_id);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  subscription_id TEXT,
  subscription_status TEXT,
  subscription_period_start TIMESTAMP WITH TIME ZONE,
  subscription_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_subscriptions_timestamp
BEFORE UPDATE ON customer_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create Row Level Security (RLS) policies
ALTER TABLE customer_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policy for customer_subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON customer_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for payments
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add service role access for both tables
CREATE POLICY "Service role has full access to customer_subscriptions"
  ON customer_subscriptions FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role has full access to payments"
  ON payments FOR ALL
  TO service_role
  USING (true);
