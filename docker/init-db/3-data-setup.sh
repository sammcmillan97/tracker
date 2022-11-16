#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "tracker" <<-EOSQL
INSERT INTO public."users" ("email", "firstName", "lastName", "password") 
    VALUES ('test@test.com', 'First', 'Last', 'hashValue');
EOSQL