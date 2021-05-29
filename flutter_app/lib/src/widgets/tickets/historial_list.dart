import 'package:flutter/material.dart';

import 'package:flutter_app/src/models/historial.dart';
import 'package:flutter_app/src/models/ticket.dart';
import 'package:flutter_app/src/utils/theme_data.dart';
import 'package:flutter_app/src/widgets/tickets/historial_item.dart';

class HistorialList extends StatelessWidget {
  const HistorialList({
    Key? key,
    required importantTextStyle,
    required this.ticket,
  })  : _importantTextStyle = importantTextStyle,
        super(key: key);

  final _importantTextStyle;
  final TicketView ticket;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Row(
            children: [
              Container(
                height: 40,
                width: 40,
                decoration: BoxDecoration(
                  color: PRIMARY_COLOR,
                  borderRadius: BorderRadius.all(Radius.circular(40)),
                ),
              ),
              Expanded(
                child: Container(
                  height: 5,
                  color: PRIMARY_COLOR,
                ),
              ),
              SizedBox(width: 10),
              Text('Historial', style: _importantTextStyle),
            ],
          ),
          for (Hisotorial historial in ticket.listaHistorial)
            HistorialItem(historial: historial),
        ],
      ),
    );
  }
}
