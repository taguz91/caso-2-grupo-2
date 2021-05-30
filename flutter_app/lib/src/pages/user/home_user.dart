import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_app/src/widgets/header_ticket_list.dart';

import 'package:get/get.dart';

import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/controllers/user_home_controller.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/ticket_preview.dart';

class HomeUser extends StatefulWidget {
  @override
  _HomeUserState createState() => _HomeUserState();
}

class _HomeUserState extends State<HomeUser> {
  final _homeUserController = Get.put(UserHomeController());
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      _scrollController.addListener(() {
        final triggerMore = _scrollController.position.maxScrollExtent * 0.9;
        if (_scrollController.position.pixels > triggerMore) {
          _homeUserController.loadMore();
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
        _homeUserController.reset();
      },
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _header(),
            Expanded(
              child: Obx(() {
                if (_homeUserController.tickets.length == 0) {
                  return LoadingText(text: 'Cargando tickets...');
                }
                return ListView.separated(
                  controller: _scrollController,
                  physics: BouncingScrollPhysics(),
                  shrinkWrap: true,
                  primary: false,
                  itemCount: _homeUserController.tickets.length + 1,
                  separatorBuilder: (context, index) {
                    return SizedBox(height: 4);
                  },
                  itemBuilder: (BuildContext context, int index) {
                    if (_homeUserController.tickets.length == index) {
                      return Obx(() {
                        if (_homeUserController.isLast.value) {
                          return InfoText('No encontramos más tickets.');
                        }
                        return InfoText('Cargando...');
                      });
                    }
                    return TicketPreview(
                      ticket: _homeUserController.tickets[index],
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
      final total = _homeUserController.total.value;
      final actual = _homeUserController.tickets.length;
      return HeaderTicketList(
        title: 'Tickets registrados',
        subtitle: 'Un total de: $actual/$total',
      );
    });
  }
}
