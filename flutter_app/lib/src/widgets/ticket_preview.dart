import 'package:flutter/material.dart';
import 'package:flutter_app/src/models/ticket.dart';
import 'package:flutter_app/src/pages/ticket/ticket_view_page.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

class TicketPreview extends StatelessWidget {
  final TicketHome ticket;

  TicketPreview({required this.ticket});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (_) => TicketViewPage(this.ticket),
        ));
      },
      child: Container(
        decoration: BoxDecoration(
          border: ThemeDataTirtec.defaultBorder,
        ),
        padding: EdgeInsets.all(12),
        margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              child: Text(
                '#${ticket.ticketId}',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
                textAlign: TextAlign.right,
              ),
            ),
            Text('${ticket.titulo}'),
            Container(
              margin: EdgeInsets.symmetric(vertical: 5),
              child: Text(
                '${ticket.estado}',
                textAlign: TextAlign.right,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
              width: double.infinity,
            ),
            Text(
              '${ticket.createdAt}',
              textAlign: TextAlign.left,
              style: TextStyle(
                color: Colors.black87,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
