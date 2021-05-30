import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:get/get.dart';

class ParametroProviderController extends GetxController {
  final _parametroProvider = ParametroProvider();

  var impactos = <Parametro>[].obs;
  var loadingImpactos = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadImpactos();
  }

  void loadImpactos() async {
    loadingImpactos(true);
    final list = await _parametroProvider.listImpactos();
    impactos.addAll(list);
    loadingImpactos(false);
  }
}
