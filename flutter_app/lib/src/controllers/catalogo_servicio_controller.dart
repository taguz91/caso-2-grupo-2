import 'package:flutter_app/src/providers/catalogo_provider.dart';
import 'package:get/get.dart';

class CatalogoServicioController extends GetxController {
  final CatalogoProvider _catalogoProvider = CatalogoProvider();

  var isLoading = true.obs;
  var isLast = false.obs;
  var total = 0.obs;
  var servicios = <CatalogoServicio>[].obs;
  int _page = 0;

  void reset(int tipoServicio) {
    total(0);
    servicios.clear();
    _page = 0;
    isLast(false);
    loadCatalogo(tipoServicio);
  }

  void loadCatalogo(int tipoServicio, {int page: 0}) async {
    // Si no hay mas datos ya no cargamos
    if (isLast.value) return;

    isLoading(true);
    try {
      final pageResponse = await _catalogoProvider.listCatalogoServicio(
        tipoServicio: tipoServicio,
        page: 0,
      );
      isLast(pageResponse.meta.isLastPage(page));
      servicios.addAll(pageResponse.data);
      total(pageResponse.meta.items);
    } finally {
      isLoading(false);
    }
  }

  void loadMore(int tipoServicio) {
    if (!isLoading.value && !isLast.value) {
      _page += 1;
      loadCatalogo(tipoServicio, page: _page);
    }
  }
}
