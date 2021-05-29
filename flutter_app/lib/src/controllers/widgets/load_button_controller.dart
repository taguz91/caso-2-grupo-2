import 'package:get/get.dart';

class LoadButtonController extends GetxController {
  var isLoading = false.obs;

  void reset() {
    isLoading(false);
  }

  void loading() {
    isLoading(true);
  }

  bool get isNotLoading => this.isLoading.value == false;
}
