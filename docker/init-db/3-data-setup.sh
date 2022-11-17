#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "tracker" <<-EOSQL
INSERT INTO public."users" (id, "email", "firstName", "lastName", "password") 
    VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'test@test.com', 'First', 'Last', 'hashValue');
EOSQL