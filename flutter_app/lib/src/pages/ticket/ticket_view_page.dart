import 'package:flutter/material.dart';

import 'package:flutter_app/src/models/usuario.dart';
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
        return _user();
      case ROL_SOPORTE_N1:
        return _soporteN1();
      case ROL_SOPORTE_N2:
        return _soporteN2();
      case ROL_COORDINADOR:
        return _coordinador(context);
    }
  }

  FloatingButtonList _soporteN1() {
    return FloatingButtonList(
      children: [
        FloatingActionButton(
          heroTag: null,
          onPressed: () {},
          child: Icon(
            Icons.task,
            color: Colors.white,
          ),
        ),
        SizedBox(width: 15),
        FloatingActionButton(
          heroTag: null,
          onPressed: () {},
          child: Icon(
            Icons.contacts,
            color: Colors.white,
          ),
        ),
      ],
    );
  }

  FloatingButtonList _soporteN2() {
    return FloatingButtonList(
      children: [
        FloatingActionButton(
          onPressed: () {},
          child: Icon(
            Icons.task,
            color: Colors.white,
          ),
        ),
      ],
    );
  }

  FloatingButtonList _user() {
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
            onPressed: () {},
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
        FloatingActionButton(
          heroTag: null,
          onPressed: () {},
          child: Icon(
            Icons.contacts,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
