import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_app/src/widgets/header_ticket_list.dart';

import 'package:get/get.dart';

import 'package:flutter_app/src/controllers/tickets_estado_controller.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/ticket_preview.dart';

class TicketsEstadoPage extends StatefulWidget {
  final int estado;
  final String title;

  TicketsEstadoPage({
    required this.estado,
    required this.title,
  });

  @override
  _TicketsEstadoState createState() => _TicketsEstadoState();
}

class _TicketsEstadoState extends State<TicketsEstadoPage> {
  final _ticketEstadoController = Get.put(TicketEstadoController());
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      _ticketEstadoController.reset(widget.estado);

      _scrollController.addListener(() {
        final triggerMore = _scrollController.position.maxScrollExtent * 0.9;
        if (_scrollController.position.pixels > triggerMore) {
          _ticketEstadoController.loadMore(widget.estado);
        }
      });
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        _ticketEstadoController.reset(widget.estado);
      },
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _header(),
            Expanded(
              child: Obx(() {
                return ListView.separated(
                  controller: _scrollController,
                  physics: BouncingScrollPhysics(),
                  shrinkWrap: true,
                  primary: false,
                  itemCount: _ticketEstadoController.tickets.length + 1,
                  separatorBuilder: (context, index) {
                    return SizedBox(height: 4);
                  },
                  itemBuilder: (BuildContext context, int index) {
                    if (_ticketEstadoController.tickets.length == index) {
                      return Obx(() {
                        if (_ticketEstadoController.isLast.value) {
                          return InfoText('No encontramos más tickets.');
                        }
                        return InfoText('Cargando...');
                      });
                    }
                    return TicketPreview(
                      ticket: _ticketEstadoController.tickets[index],
                    );
                  },
                );
              }),
            ),
          ],
        ),
      ),
    );
  }

  Widget _header() {
    return Obx(() {
      return HeaderTicketList(
        title: widget.title,
        subtitle: 'Un total de: ${_ticketEstadoController.total.toString()}',
      );
    });
  }
}
