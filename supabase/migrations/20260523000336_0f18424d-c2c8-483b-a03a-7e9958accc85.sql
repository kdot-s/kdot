
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Script',
  purchase_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admin can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'forkdot8@gmail.com');

CREATE POLICY "Admin can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'forkdot8@gmail.com');

CREATE POLICY "Admin can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'forkdot8@gmail.com');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
