set PGPASSWORD=datsumpassword
"pg_dump.exe" --verbose --host localhost --port 5432 --username "postgres" --no-password  --format plain --schema-only --encoding UTF8 --file "skynda_new.sql" "skynda"

java -jar apgdiff-2.4.jar skynda.sql skynda_new.sql > skynda_diff.sql
@echo off

move skynda_new.sql skynda.sql
pause