class FeedUser {
  static const String TABLE_NAME = 'user';

  static const String COLUMN_PERSONA_ID = 'personaId';
  static const String COLUMN_APELLIDOS = 'apellidos';
  static const String COLUMN_NOMBRES = 'nombres';
  static const String COLUMN_CORREO = 'correo';
  static const String COLUMN_ROL = 'rol';
  static const String COLUMN_TOKEN = 'token';
  static const String COLUMN_TYPE = 'type';

  static const String SQL_DELETE_TABLE = 'DROP TABLE IF EXISTS $TABLE_NAME';

  static const String SQL_CREATE_TABLE = '''
  CREATE TABLE $TABLE_NAME (
    $COLUMN_PERSONA_ID INTEGER NOT NULL,
    $COLUMN_APELLIDOS TEXT,
    $COLUMN_NOMBRES TEXT,
    $COLUMN_CORREO TEXT,
    $COLUMN_ROL TEXT,
    $COLUMN_TOKEN TEXT,
    $COLUMN_TYPE INTEGER
  )''';

  static const SQL_WHERE_BY_PERSONA_ID = '$COLUMN_PERSONA_ID = ?';

  // static const SQL_DELETE_WHERE = 'DELETE $COLUMN_PERSONA_ID = ?';
}
