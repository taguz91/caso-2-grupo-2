import 'package:flutter/material.dart';

import 'package:flutter_app/src/pages/coordinador/tickets_estado_page.dart';
import 'package:flutter_app/src/utils/constantes.dart';

class TicketsAsignadosPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TicketsEstadoPage(
      title: 'Asignados',
      estado: TICKET_ESTADO_ATENDIENDOSE,
    );
  }
}
