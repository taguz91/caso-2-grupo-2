import 'package:flutter/material.dart';
import 'package:flutter_app/src/models/ticket.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/theme_data.dart';
import 'package:flutter_app/src/widgets/card_info.dart';
import 'package:flutter_app/src/widgets/tickets/historial_list.dart';

class TicketInformation extends StatelessWidget {
  const TicketInformation({
    Key? key,
    required this.ticket,
    required this.user,
  }) : super(key: key);

  final TicketView ticket;
  final UserLogin user;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 20, horizontal: 25),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Ticket tipo: ${ticket.catalogo.tipoServicio.nombre}'),
            Container(
              margin: EdgeInsets.symmetric(vertical: 10),
              child: Text(
                ticket.catalogo.descripcion,
                style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            _estado(ticket),
            _baseInfo(ticket),
            // TODO: Agregar ver adjuntos
            if (user.type != ROL_USUARIO) _usuario(ticket),
            if (ticket.responsable != null)
              CardInfo(
                title: 'Asignado:',
                description: responsableDescription(ticket),
              ),

            _solucion(ticket),
            _timeInfo(ticket),
            HistorialList(
              importantTextStyle: _importantTextStyle,
              ticket: ticket,
            ),
            if (ticket.listaHistorial.isNotEmpty) SizedBox(height: 50),
          ],
        ),
      ),
    );
  }

  String responsableDescription(TicketView ticket) {
    return '${ticket.responsable!.nombreCompleto} el ${ticket.fechaAsignacion} con un tiempo de solución estimado de ${ticket.catalogo.sla.nivelPrioridad.descripcion}.';
  }

  Widget _timeInfo(TicketView ticket) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _timeText('Registrado el: ${ticket.createdAt}'),
          _timeText('Ultima actualiación: ${ticket.updatedAt}'),
          if (ticket.fechaSolucion != null)
            _timeText('Fecha solución: ${ticket.fechaSolucion}'),
        ],
      ),
    );
  }

  Text _timeText(String text) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 13,
        color: Colors.black54,
      ),
    );
  }

  Widget _usuario(TicketView ticket) {
    return CardInfo(
      title: 'Usuario:',
      description:
          '${ticket.usuario.nombreCompleto}\nCorreo: ${ticket.usuario.correo}\nCelular: ${ticket.usuario.telefono}',
    );
  }

  Widget _solucion(TicketView ticket) {
    if (ticket.responsableSolucion == null) {
      return Container();
    }

    final message =
        '${ticket.solucion} Por ${ticket.responsableSolucion!.nombreCompleto} el ${ticket.fechaSolucion}.';

    Color color = GREY_COLOR;
    String title = 'Información:';

    switch (ticket.estado.parametrosId) {
      case TICKET_ESTADO_CERRADO_CON_SOLUCION:
        color = SUCCESS_COLOR;
        title = 'Solución:';
        break;

      case TICKET_ESTADO_RECHAZADO:
        color = DANGER_COLOR;
        title = 'Motivo rechazo:';
        break;

      case TICKET_ESTADO_RECHAZADO:
        color = WARNING_COLOR;
        title = 'Solución:';
        break;
    }

    return CardInfo(
      title: title,
      description: message,
      borderColor: color,
    );
  }

  Container _baseInfo(TicketView ticket) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  ticket.titulo,
                  style: _importantTextStyle,
                ),
              ),
              Text(
                '#${ticket.ticketId}',
                style: _importantTextStyle,
              ),
            ],
          ),
          SizedBox(height: 5),
          Text(ticket.descripcion),
        ],
      ),
    );
  }

  Container _estado(TicketView ticket) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
        border: ThemeDataTirtec.defaultBorder,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            ticket.estado.nombre,
            style: _importantTextStyle,
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 10),
            child: Text(ticket.estado.descripcion),
          ),
          Container(
            width: double.infinity,
            child: Text(
              ticket.impacto.nombre,
              textAlign: TextAlign.end,
              style: _importantTextStyle,
            ),
          ),
        ],
      ),
    );
  }

  get _importantTextStyle => TextStyle(
        fontSize: 23,
        fontWeight: FontWeight.w500,
      );
}
