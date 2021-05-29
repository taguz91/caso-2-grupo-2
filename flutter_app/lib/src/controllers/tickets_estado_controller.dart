import 'package:get/get.dart';

import 'package:flutter_app/src/providers/ticket_provider.dart';

class TicketEstadoController extends GetxController {
  final TicketProvider _ticketProvider = TicketProvider();

  var isLoading = true.obs;
  var isLast = false.obs;
  var total = 0.obs;
  var tickets = <TicketHome>[].obs;
  int _page = 0;

  void reset(int estado) {
    total(0);
    tickets.clear();
    _page = 0;
    isLast(false);
    loadTickets(estado);
  }

  void loadTickets(int estado, {int page = 0}) async {
    // Si no hay mas datos ya no cargamos
    if (isLast.value) return;

    isLoading(true);
    try {
      final pageResponse = await _ticketProvider.listByEstado(
        page: page,
        estado: estado,
      );
      isLast(pageResponse.meta.pages == page + 1);
      tickets.addAll(pageResponse.data);
      total(pageResponse.meta.items);
    } finally {
      isLoading(false);
    }
  }

  void loadMore(int estado) {
    if (!isLoading.value && !isLast.value) {
      _page += 1;
      loadTickets(estado, page: _page);
    }
  }
}
