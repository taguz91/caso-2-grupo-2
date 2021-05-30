import 'package:flutter/material.dart';

import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/pages/form/form_asignar_page.dart';
import 'package:flutter_app/src/pages/form/form_cerrar_page.dart';
import 'package:flutter_app/src/pages/form/form_encuesta_page.dart';
import 'package:flutter_app/src/pages/form/form_rechazar_page.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/utils/theme_data.dart';
import 'package:flutter_app/src/widgets/tickets/floating_button_list.dart';
import 'package:flutter_app/src/widgets/tickets/ticket_information.dart';
import 'package:flutter_app/src/widgets/user_app_bar.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';

class TicketViewPage extends StatelessWidget {
  final TicketProvider _ticketProvider = TicketProvider();
  final GlobalSettings _globalSettings = GlobalSettings();
  final TicketHome ticket;

  TicketViewPage(this.ticket);

  @override
  Widget build(BuildContext context) {
    UserLogin user = _globalSettings.user;

    return Scaffold(
      appBar: UserAppBar(),
      body: FutureBuilder(
        future: _ticketProvider.one(ticket.ticketId),
        builder: (
          BuildContext context,
          AsyncSnapshot<DataOrMessage<TicketView>> snapshot,
        ) {
          if (snapshot.hasData) {
            DataOrMessage<TicketView> data = snapshot.data!;
            if (data.message != null) {
              return LoadingText(text: data.message!);
            }
            return TicketInformation(ticket: data.data!, user: user);
          }
          return LoadingText(text: 'Buscando ticket...');
        },
      ),
      floatingActionButton: getFloatingButtons(context, user),
    );
  }

  Widget? getFloatingButtons(BuildContext context, UserLogin user) {
    print("USER TYPE: ${user.type.toString()}");
    switch (user.type) {
      case ROL_USUARIO:
        return _user(context);
      case ROL_SOPORTE_N1:
        return _soporteN1(context);
      case ROL_SOPORTE_N2:
        return _soporteN2(context);
      case ROL_COORDINADOR:
        return _coordinador(context);
    }
  }

  FloatingButtonList _soporteN1(BuildContext context) {
    return FloatingButtonList(
      children: [
        _navToFormCerrar(context),
        SizedBox(width: 15),
        _navToFormAsignar(context),
      ],
    );
  }

  FloatingButtonList _soporteN2(BuildContext context) {
    return FloatingButtonList(
      children: [
        _navToFormCerrar(context),
      ],
    );
  }

  FloatingButtonList _user(BuildContext context) {
    return FloatingButtonList(
      children: [
        if (!ticket.isClosed)
          FloatingActionButton(
            onPressed: () {},
            child: Icon(
              Icons.edit,
              color: Colors.white,
            ),
          ),
        if (ticket.isSolucionado) SizedBox(width: 15),
        if (ticket.isSolucionado)
          FloatingActionButton(
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (_) => FormEncuestaPage(ticket),
              ));
            },
            child: Icon(
              Icons.text_snippet,
              color: Colors.white,
            ),
          ),
      ],
    );
  }

  FloatingButtonList _coordinador(BuildContext context) {
    return FloatingButtonList(
      children: [
        if (ticket.canReject)
          FloatingActionButton(
            heroTag: null,
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (_) => FormRechazarPage(ticket.ticketId),
              ));
            },
            backgroundColor: DANGER_COLOR,
            child: Icon(
              Icons.delete,
              color: Colors.white,
            ),
          ),
        if (ticket.canReject) SizedBox(width: 15),
        _navToFormAsignar(context),
      ],
    );
  }

  FloatingActionButton _navToFormAsignar(BuildContext context) {
    return FloatingActionButton(
      heroTag: null,
      onPressed: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (_) => FormAsignarPage(ticket),
        ));
      },
      child: Icon(
        Icons.contacts,
        color: Colors.white,
      ),
    );
  }

  FloatingActionButton _navToFormCerrar(BuildContext context) {
    return FloatingActionButton(
      heroTag: null,
      onPressed: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (_) => FormCerrarPage(ticket),
        ));
      },
      child: Icon(
        Icons.task,
        color: Colors.white,
      ),
    );
  }
}
