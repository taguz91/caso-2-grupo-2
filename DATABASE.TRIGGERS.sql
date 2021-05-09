-- 
-- Trigger for update the updated at 
-- 

GRANT ALL PRIVILEGES ON FUNCTION add_updated_at() TO caso2;

CREATE OR REPLACE FUNCTION add_updated_at()
RETURNS TRIGGER AS $add_updated_at$
  BEGIN 
    old.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
$add_updated_at$ LANGUAGE plpgsql;