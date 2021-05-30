import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

import 'package:fl_chart/fl_chart.dart';

import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/header_ticket_list.dart';
import 'package:flutter_app/src/widgets/indicator.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';

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

class PieChartTicket extends StatefulWidget {
  final List<TicketCount> tickets;

  const PieChartTicket({
    Key? key,
    required this.tickets,
  }) : super(key: key);

  @override
  _PieChartTicketState createState() => _PieChartTicketState();
}

class _PieChartTicketState extends State<PieChartTicket> {
  int touchedIndex = -1;

  int _totalCount = 0;

  final colors = [
    Color(0xFF7ED3F4),
    Color(0xFFFF7070),
    Color(0xFFFFDC60),
    Color(0xFF9FE080),
    Color(0xFF5C7BD9),
    Color(0xFF7ED3F4),
  ];

  @override
  void initState() {
    super.initState();
    _totalCount = widget.tickets
        .map((e) => e.total)
        .reduce((total, actual) => actual + total);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.symmetric(horizontal: 15),
            width: double.infinity,
            child: HeaderTicketList(
              title: 'Estado tickets',
              subtitle: 'Un total de $_totalCount',
            ),
          ),
          const SizedBox(
            height: 18,
          ),
          Container(
            height: 300,
            child: PieChart(
              PieChartData(
                pieTouchData: PieTouchData(
                  touchCallback: (pieTouchResponse) {
                    final desiredTouch =
                        pieTouchResponse.touchInput is! PointerExitEvent &&
                            pieTouchResponse.touchInput is! PointerUpEvent;
                    if (desiredTouch &&
                        pieTouchResponse.touchedSection != null) {
                      touchedIndex =
                          pieTouchResponse.touchedSection!.touchedSectionIndex;
                      setState(() {});
                    }
                  },
                ),
                borderData: FlBorderData(
                  show: false,
                ),
                sectionsSpace: 0,
                centerSpaceRadius: 40,
                sections: showingSections(),
              ),
            ),
          ),
          const SizedBox(
            height: 28,
          ),
          Container(
            margin: EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: _getLabels(),
            ),
          ),
          const SizedBox(
            height: 28,
          ),
        ],
      ),
    );
  }

  List<PieChartSectionData> showingSections() {
    return widget.tickets
        .asMap()
        .map((i, e) {
          final isTouched = i == touchedIndex;
          final percent = (e.total * 100) / _totalCount;
          final fontSize = isTouched ? 16.0 : 12.0;
          final radius = ((percent * 90) / 100) + (isTouched ? 65.0 : 60.0);

          return MapEntry(
            i,
            PieChartSectionData(
              color: colors[i],
              value: percent,
              title: '${percent.toStringAsFixed(2)}%',
              radius: radius,
              titleStyle: TextStyle(
                fontSize: fontSize,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          );
        })
        .values
        .toList();
  }

  List<Widget> _getLabels() {
    return widget.tickets
        .asMap()
        .map((i, e) {
          final isTouched = i == touchedIndex;
          return MapEntry(
            i,
            Indicator(
              color: colors[i],
              text: e.nombre,
              isSquare: !isTouched,
              size: 20.0,
            ),
          );
        })
        .values
        .toList();
  }
}
