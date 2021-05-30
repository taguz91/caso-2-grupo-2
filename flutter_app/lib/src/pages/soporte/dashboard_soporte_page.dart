import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import 'package:get/get.dart';

import 'package:flutter_app/src/controllers/dasboard_soporte_controller.dart';
import 'package:flutter_app/src/widgets/header_ticket_list.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';
import 'package:flutter_app/src/widgets/ticket_preview.dart';

class DashboardSoportePage extends StatefulWidget {
  @override
  _DashboardSoportePageState createState() => _DashboardSoportePageState();
}

class _DashboardSoportePageState extends State<DashboardSoportePage> {
  final _dashBoardSoporteController = Get.put(DashboardSoporteController());
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      _dashBoardSoporteController.reset();
      _scrollController.addListener(() {
        final triggerMore = _scrollController.position.maxScrollExtent * 0.9;
        if (_scrollController.position.pixels > triggerMore) {
          _dashBoardSoporteController.loadMore();
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
    return Scaffold(
      appBar: PersonalAppBar(),
      body: RefreshIndicator(
        onRefresh: () async {
          _dashBoardSoporteController.reset();
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
                    itemCount: _dashBoardSoporteController.tickets.length + 1,
                    separatorBuilder: (context, index) {
                      return SizedBox(height: 4);
                    },
                    itemBuilder: (BuildContext context, int index) {
                      if (_dashBoardSoporteController.tickets.length == index) {
                        return Obx(() {
                          if (_dashBoardSoporteController.isLast.value) {
                            return InfoText('No encontramos más tickets.');
                          }
                          return InfoText('Cargando...');
                        });
                      }
                      return TicketPreview(
                        ticket: _dashBoardSoporteController.tickets[index],
                      );
                    },
                  );
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _header() {
    return Obx(() {
      return HeaderTicketList(
        title: 'Tickets Asignados',
        subtitle:
            'Un total de: ${_dashBoardSoporteController.total.toString()}',
      );
    });
  }
}
