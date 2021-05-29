import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_app/src/models/historial.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/theme_data.dart';
import 'package:flutter_app/src/widgets/card_info.dart';
import 'package:flutter_app/src/widgets/user_app_bar.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';

class TicketViewPage extends StatelessWidget {
  final TicketProvider _ticketProvider = new TicketProvider();
  final int ticketId;

  TicketViewPage(this.ticketId);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: UserAppBar(),
      body: FutureBuilder(
        future: _ticketProvider.one(ticketId),
        builder: (
          BuildContext context,
          AsyncSnapshot<DataOrMessage<TicketView>> snapshot,
        ) {
          if (snapshot.hasData) {
            DataOrMessage<TicketView> data = snapshot.data!;
            if (data.message != null) {
              return LoadingText(text: data.message!);
            }
            TicketView ticket = data.data!;

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
                    )
                  ],
                ),
              ),
            );
          }

          return LoadingText(text: 'Buscar ticket...');
        },
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

class HistorialItem extends StatefulWidget {
  const HistorialItem({
    Key? key,
    required this.historial,
  }) : super(key: key);

  final Hisotorial historial;

  @override
  _HistorialItemState createState() => _HistorialItemState();
}

class _HistorialItemState extends State<HistorialItem> {
  final GlobalKey key = GlobalKey();
  double height = 40;

  @override
  void initState() {
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      setState(() => height = key.currentContext?.size?.height ?? height);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: [
          Container(
            margin: EdgeInsets.only(left: 17.5),
            width: 5,
            height: height,
            color: PRIMARY_COLOR,
          ),
          Container(
            width: 15,
            height: 5,
            color: PRIMARY_COLOR,
          ),
          Container(
            height: 22.5,
            width: 22.5,
            decoration: BoxDecoration(
              color: PRIMARY_COLOR,
              borderRadius: BorderRadius.all(Radius.circular(22.5)),
            ),
          ),
          Expanded(
            key: key,
            child: Container(
              margin: EdgeInsets.only(left: 10),
              padding: EdgeInsets.only(bottom: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _getText(widget.historial.accion),
                  _timeText(widget.historial.createdAt),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget _getText(String text) {
    if (text.contains('<span>')) {
      final splitText = text.split('<span>');
      final secondaryText = splitText[1].split('</span>');
      return RichText(
        text: TextSpan(
          children: <TextSpan>[
            TextSpan(
              text: splitText[0],
              style: TextStyle(
                color: Colors.black,
              ),
            ),
            TextSpan(
              text: secondaryText[0],
              style: TextStyle(
                color: Colors.black54,
                decoration: TextDecoration.lineThrough,
              ),
            ),
            TextSpan(
              text: secondaryText[1],
              style: TextStyle(
                color: Colors.black,
              ),
            ),
          ],
        ),
      );
    }
    return RichText(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: Colors.black,
        ),
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
}
