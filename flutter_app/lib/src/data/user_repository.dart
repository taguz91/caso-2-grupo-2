import 'package:flutter_app/src/data/tirtec_contract.dart';
import 'package:flutter_app/src/data/tirtec_db_helper.dart';
import 'package:flutter_app/src/models/usuario.dart';

class UserRepository {
  final _tirtecDBHelper = TirtecDBHelper();

  static final UserRepository _instance = UserRepository._();

  factory UserRepository() {
    return _instance;
  }

  UserRepository._();

  Future<int> saveOrUpdate(UserLogin user) async {
    final db = await _tirtecDBHelper.database;
    final existResponse = await db.query(
      FeedUser.TABLE_NAME,
      columns: [FeedUser.COLUMN_PERSONA_ID],
      where: FeedUser.SQL_WHERE_BY_PERSONA_ID,
      whereArgs: [user.personaId],
    );
    if (existResponse.isNotEmpty) {
      return db.update(
        FeedUser.TABLE_NAME,
        user.toJson(),
        where: FeedUser.SQL_WHERE_BY_PERSONA_ID,
        whereArgs: [user.personaId],
      );
    }

    return db.insert(FeedUser.TABLE_NAME, user.toJson());
  }

  Future<UserLogin?> oneByPersonaId(int personaId) async {
    final db = await _tirtecDBHelper.database;
    final res = await db.query(
      FeedUser.TABLE_NAME,
      where: FeedUser.SQL_WHERE_BY_PERSONA_ID,
      whereArgs: [personaId],
    );
    return _mapResponse(res);
  }

  UserLogin? _mapResponse(List<Map<String, Object?>> res) {
    if (res.isNotEmpty) {
      return UserLogin.fromJson(res.first);
    }
  }

  Future<List<UserLogin>> all() async {
    final db = await _tirtecDBHelper.database;
    final res = await db.query(FeedUser.TABLE_NAME);
    return res.map((e) => UserLogin.fromJson(e)).toList();
  }

  Future<int> deleteById(int personaId) async {
    final db = await _tirtecDBHelper.database;
    return db.delete(
      FeedUser.TABLE_NAME,
      where: FeedUser.SQL_WHERE_BY_PERSONA_ID,
      whereArgs: [personaId],
    );
  }
}
