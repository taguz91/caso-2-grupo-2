import 'package:flutter/material.dart';

import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/tickets/pie_chart_ticket.dart';
import 'package:flutter_app/src/widgets/user/user_accounts.dart';

class PerfilUser extends StatelessWidget {
  final _ticketProvider = TicketProvider();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _verCuentas(context),
        Expanded(
          child: SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: FutureBuilder(
              future: _ticketProvider.getTicketsCount(),
              builder: (
                BuildContext context,
                AsyncSnapshot<List<TicketCount>> snapshot,
              ) {
                if (snapshot.hasData) {
                  if (snapshot.data!.isEmpty) {
                    return InfoText(
                      'No encontramos tickets, vuelva a intentarlo.',
                    );
                  }
                  return PieChartTicket(tickets: snapshot.data!);
                }
                return LoadingText(
                  text: 'Cargando grafica...',
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  InkWell _verCuentas(BuildContext context) {
    return InkWell(
      onTap: () {
        showModalBottomSheet(
          context: context,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20)),
          ),
          builder: (BuildContext context) {
            return UserAccounts();
          },
        );
      },
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10),
        margin: EdgeInsets.symmetric(vertical: 5),
        width: double.infinity,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Ver cuentas',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
            Icon(Icons.expand_more, size: 30),
          ],
        ),
      ),
    );
  }
}
