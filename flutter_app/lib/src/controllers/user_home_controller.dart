import 'package:get/get.dart';

import 'package:flutter_app/src/providers/ticket_provider.dart';

class UserHomeController extends GetxController {
  final TicketProvider _ticketProvider = TicketProvider();

  var isLoading = true.obs;
  var isLast = false.obs;
  var total = 0.obs;
  var tickets = <TicketHome>[].obs;
  int _page = 0;

  @override
  void onInit() {
    super.onInit();
    loadTickets();
  }

  void reset() {
    total(0);
    tickets.clear();
    _page = 0;
    isLast(false);
    loadTickets();
  }

  void loadTickets({int page = 0}) async {
    // Si no hay mas datos ya no cargamos
    if (isLast.value) return;

    isLoading(true);
    try {
      final pageResponse = await _ticketProvider.listUser(page);
      isLast(pageResponse.meta.isLastPage(page));
      tickets.addAll(pageResponse.data);
      total(pageResponse.meta.items);
    } finally {
      isLoading(false);
    }
  }

  void loadMore() {
    if (!isLoading.value && !isLast.value) {
      _page += 1;
      loadTickets(page: _page);
    }
  }
}
