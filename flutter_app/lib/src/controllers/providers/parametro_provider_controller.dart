import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:get/get.dart';

class ParametroProviderController extends GetxController {
  final _parametroProvider = ParametroProvider();

  var impactos = <Parametro>[].obs;
  var loadingImpactos = false.obs;

  var tiposServicios = <Parametro>[].obs;
  var loadingServicios = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadImpactos();
    loadTiposServicios();
  }

  void loadImpactos() async {
    loadingImpactos(true);
    final list = await _parametroProvider.listImpactos();
    impactos.addAll(list);
    loadingImpactos(false);
  }

  void loadTiposServicios() async {
    loadingServicios(true);
    final list = await _parametroProvider.listTipoServicios();
    tiposServicios.addAll(list);
    loadingServicios(false);
  }
}
