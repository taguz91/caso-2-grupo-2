import 'package:flutter/material.dart';

import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/data/user_repository.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

class UserAccounts extends StatelessWidget {
  final _globalSettings = GlobalSettings();
  final _userRepository = UserRepository();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 15, horizontal: 35),
      padding: EdgeInsets.symmetric(vertical: 5),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.vertical(top: Radius.circular(25)),
      ),
      child: Column(
        children: [
          _add(context),
          Expanded(
            child: _load(context),
          ),
        ],
      ),
    );
  }

  Widget _load(BuildContext context) {
    return FutureBuilder(
      future: _userRepository.all(),
      builder: (BuildContext context, AsyncSnapshot<List<UserLogin>> snapshot) {
        if (snapshot.hasData) {
          final data = snapshot.data!;

          return ListView.builder(
            physics: BouncingScrollPhysics(),
            itemCount: data.length,
            itemBuilder: (BuildContext context, int index) {
              return _userCard(
                context: context,
                user: data[index],
              );
            },
          );
        }
        return Container();
      },
    );
  }

  InkWell _add(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).pushNamed(DEFAULT);
      },
      child: Container(
        padding: EdgeInsets.only(top: 10, bottom: 20),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: GREY_BORDER_COLOR,
            ),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(),
              ),
              child: Icon(
                Icons.add,
                size: 25,
                color: Theme.of(context).primaryColor,
              ),
            ),
            SizedBox(width: 15),
            Text(
              'Agregar cuenta',
              style: TextStyle(
                color: Colors.black,
                fontSize: 20,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _userCard({
    required BuildContext context,
    required UserLogin user,
  }) {
    return InkWell(
      onTap: () async {
        _globalSettings.setUser(user);
        Navigator.of(context).popUntil((route) => route.isFirst);
        Navigator.of(context).pushReplacementNamed(LOAD);
      },
      child: Container(
        padding: EdgeInsets.all(5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            RichText(
              text: TextSpan(
                children: <TextSpan>[
                  TextSpan(
                    text: '${user.nombreCompleto}\n',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                    ),
                  ),
                  TextSpan(
                    text: '${user.rol}',
                    style: TextStyle(
                      color: Colors.black54,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
            if (user.personaId == _globalSettings.user.personaId)
              Icon(
                Icons.check,
                size: 35,
                color: Theme.of(context).primaryColor,
              )
          ],
        ),
      ),
    );
  }
}
