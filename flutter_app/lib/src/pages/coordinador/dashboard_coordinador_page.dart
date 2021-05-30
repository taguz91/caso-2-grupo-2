import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import 'package:flutter_app/src/pages/coordinador/tickets_asignados_page.dart';
import 'package:flutter_app/src/pages/coordinador/tickets_nuevos_page.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';

class DashboardCoordinadorPage extends StatefulWidget {
  @override
  _DashboardCoordinadorPageState createState() =>
      _DashboardCoordinadorPageState();
}

class _DashboardCoordinadorPageState extends State<DashboardCoordinadorPage> {
  int _index = 0;

  @override
  void initState() { 
    super.initState();
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
    });
  }

  @override
  Widget build(BuildContext context) {
    final addNew = _index == 0 || _index == 1;

    return Scaffold(
      appBar: PersonalAppBar(),
      body: _page(),
      bottomNavigationBar: BottomNavigationBar(
        elevation: 3,
        iconSize: 30,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.receipt),
            label: 'Nuevos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.receipt),
            label: 'Asignados',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart),
            label: 'Reportes',
          ),
        ],
        currentIndex: _index,
        onTap: _onNav,
      ),
      floatingActionButton: addNew
          ? FloatingActionButton(
              onPressed: () {
                // _onNav(1);
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
        return TicketsNuevosPage();
      case 1:
        return TicketsAsignadosPage();
      // case 2:
      //   return PerfilUser();
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
