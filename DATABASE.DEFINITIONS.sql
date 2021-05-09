CREATE ROLE caso2 WITH LOGIN NOSUPERUSER CREATEDB NOCREATEROLE INHERIT NOREPLICATION CONNECTION
LIMIT
	-1 PASSWORD '12345678';

CREATE DATABASE caso2 WITH OWNER = caso2 ENCODING = 'UTF8' CONNECTION
LIMIT
	= -1;

(
	SELECT
		'CREATE TRIGGER ' || tab_name || ' BEFORE UPDATE ON ' || tab_name || ' FOR EACH ROW EXECUTE PROCEDURE add_updated_at();' AS trigger_creation_query
	FROM
		(
			SELECT
				quote_ident(table_schema) || '.' || quote_ident(table_name) as tab_name
			FROM
				information_schema.tables
			WHERE
				table_schema NOT IN ('pg_catalog', 'information_schema')
				AND table_schema NOT LIKE 'pg_toast%'
		) tablist;

)