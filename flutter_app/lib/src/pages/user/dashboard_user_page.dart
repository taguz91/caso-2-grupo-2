import 'package:flutter/material.dart';
import 'package:flutter_app/src/pages/user/home_user.dart';
import 'package:flutter_app/src/pages/user/perfil_user.dart';
import 'package:flutter_app/src/pages/user/ticket_user.dart';
import 'package:flutter_app/src/widgets/user_app_bar.dart';

class DashboardUserPage extends StatefulWidget {
  @override
  _DashboardUserPageState createState() => _DashboardUserPageState();
}

class _DashboardUserPageState extends State<DashboardUserPage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: UserAppBar(),
      body: _page(),
      bottomNavigationBar: BottomNavigationBar(
        elevation: 3,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        iconSize: 30,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.receipt),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: '',
          ),
        ],
        currentIndex: _index,
        onTap: _onNav,
      ),
      floatingActionButton: _index == 0
          ? FloatingActionButton(
              onPressed: () {
                _onNav(1);
              },
              child: Icon(
                Icons.add,
                color: Colors.white,
              ),
            )
          : null,
    );
  }

  Widget _page() {
    switch (_index) {
      case 0:
        return HomeUser();
      case 1:
        return TicketUser();
      case 2:
        return PerfilUser();
      default:
        return Center(
          child: Text('No encontramos la page.'),
        );
    }
  }

  void _onNav(int index) {
    setState(() => _index = index);
  }
}
