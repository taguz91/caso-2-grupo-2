import 'package:flutter/material.dart';
import 'package:flutter_app/src/pages/coordinador/dashboard_coordinador_page.dart';
import 'package:flutter_app/src/pages/load_page.dart';
import 'package:flutter_app/src/pages/login_page.dart';
import 'package:flutter_app/src/pages/offline/home_offline_page.dart';
import 'package:flutter_app/src/pages/soporte/dashboard_soporte_page.dart';
import 'package:flutter_app/src/pages/user/dashboard_user_page.dart';

const LOAD = '/';
const DEFAULT = '/login';
const USER_PAGE = '/user/';
const COORDINADOR_PAGE = '/coordinador/';
const SOPORTE_PAGE = '/soporte/';
const HOME_OFFLINE = '/offline';

class RouterGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // final args = settings.arguments;
    switch (settings.name) {
      case LOAD:
        return MaterialPageRoute(builder: (_) => LoadPage());
      case DEFAULT:
        return MaterialPageRoute(builder: (_) => LoginPage());
      case USER_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardUserPage());
      case COORDINADOR_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardCoordinadorPage());
      case SOPORTE_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardSoportePage());
      case HOME_OFFLINE:
        return MaterialPageRoute(builder: (_) => HomeOfflinePage());
      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(builder: (_) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Error'),
        ),
        body: Center(
          child: Text('ERROR'),
        ),
      );
    });
  }
}
