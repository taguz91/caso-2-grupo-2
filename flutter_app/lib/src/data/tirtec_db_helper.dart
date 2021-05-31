import 'dart:io';
import 'package:path/path.dart';

import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';

import 'package:flutter_app/src/data/tirtec_contract.dart';

class TirtecDBHelper {
  static const String _DB_NAME = 'tirtec_local_data.db';
  static const int _DB_VERSION = 1;

  static Database? _database;

  static final TirtecDBHelper _instance = TirtecDBHelper._internal();

  factory TirtecDBHelper() {
    return _instance;
  }

  TirtecDBHelper._internal();

  Future<Database> get database async {
    if (_database != null) {
      return _database!;
    }
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    Directory documentsDir = await getApplicationDocumentsDirectory();
    final path = join(documentsDir.path, _DB_NAME);
    return await openDatabase(
      path,
      version: _DB_VERSION,
      onCreate: (Database db, int version) async {
        await db.execute(FeedUser.SQL_CREATE_TABLE);
      },
      onUpgrade: (
        Database db,
        int oldVersion,
        int newVersion,
      ) async {
        await db.execute(FeedUser.SQL_DELETE_TABLE);
      },
    );
  }
}
