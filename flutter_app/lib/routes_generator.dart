import 'package:flutter/material.dart';
import 'package:flutter_app/src/pages/coordinador/dashboard_coordinador_page.dart';
import 'package:flutter_app/src/pages/login_page.dart';
import 'package:flutter_app/src/pages/soporte/dashboard_soporte_page.dart';
import 'package:flutter_app/src/pages/user/dashboard_user_page.dart';

const DEFAULT = '/';
const USER_PAGE = '/user/';
const COORDINADOR_PAGE = '/coordinador/';
const SOPORTE_PAGE = '/soporte/';

class RouterGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // final args = settings.arguments;
    switch (settings.name) {
      case DEFAULT:
        return MaterialPageRoute(builder: (_) => LoginPage());
      case USER_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardUserPage());
      case COORDINADOR_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardCoordinadorPage());
      case SOPORTE_PAGE:
        return MaterialPageRoute(builder: (_) => DashboardSoportePage());
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
