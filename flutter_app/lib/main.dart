import 'package:flutter/material.dart';
import 'package:flutter_app/src/utils/helpers.dart';

import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:flutter/services.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

void main() => runApp(Splash());

class Splash extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MediaQuery(
      data: MediaQueryData(),
      child: FutureBuilder(
        future: _futureGroup(),
        builder: (context, AsyncSnapshot snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return MaterialApp(
              title: 'Tirtec',
              debugShowCheckedModeBanner: false,
              home: Scaffold(
                body: Container(
                  color: PRIMARY_COLOR,
                ),
              ),
            );
          } else {
            // Loading is done, return the app:
            return MyApp();
          }
        },
      ),
    );
  }

  Future<bool> _futureGroup() async {
    final localSettings = new GlobalSettings();
    await localSettings.init();
    await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    return true;
  }
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tirtec',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: createMaterialColor(PRIMARY_COLOR),
        primaryColor: PRIMARY_COLOR,
        accentColor: Color(0xFFB6CCAF),

        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: PRIMARY_COLOR),
            borderRadius: BorderRadius.zero,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all<Color>(
              PRIMARY_COLOR,
            ),
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.zero,
              ),
            ),
          ),
        ),
        bottomNavigationBarTheme: BottomNavigationBarThemeData(
          backgroundColor: PRIMARY_COLOR,
          selectedItemColor: Colors.white,
          unselectedItemColor: Colors.grey,
        ),
        appBarTheme: AppBarTheme(
          actionsIconTheme: IconThemeData(
            color: Colors.black,
          ),
          iconTheme: IconThemeData(
            color: Colors.black,
          ),
          backgroundColor: Colors.transparent,
        ),
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      localizationsDelegates: [
        FormBuilderLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        Locale('es'),
      ],
      initialRoute: LOAD,
      onGenerateRoute: RouterGenerator.generateRoute,
    );
  }
}
