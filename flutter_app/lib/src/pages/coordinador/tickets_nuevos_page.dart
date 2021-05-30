import 'package:flutter/material.dart';

import 'package:flutter_app/src/pages/coordinador/tickets_estado_page.dart';
import 'package:flutter_app/src/utils/constantes.dart';

class TicketsNuevosPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TicketsEstadoPage(
      title: 'Nuevos',
      estado: TICKET_ESTADO_ABIERTO,
    );
  }
}
