import 'package:flutter/material.dart';

import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/tickets/pie_chart_ticket.dart';

class PerfilUser extends StatelessWidget {
  final _ticketProvider = TicketProvider();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _ticketProvider.getTicketsCount(),
      builder: (
        BuildContext context,
        AsyncSnapshot<List<TicketCount>> snapshot,
      ) {
        if (snapshot.hasData) {
          if (snapshot.data!.isEmpty) {
            return InfoText('No encontramos tickets, vuelva a intentarlo.');
          }
          return PieChartTicket(tickets: snapshot.data!);
        }
        return LoadingText(
          text: 'Cargando grafica...',
        );
      },
    );
  }
}
