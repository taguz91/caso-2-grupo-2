import 'package:flutter/material.dart';
import 'package:flutter_app/src/controllers/widgets/load_button_controller.dart';
import 'package:get/get.dart';

class LoadButton extends StatelessWidget {
  final _loadButtonController = Get.put(LoadButtonController());
  final Function() onTap;
  final String label;
  final double width;

  LoadButton({
    required this.onTap,
    required this.label,
    this.width = double.infinity,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: width,
      margin: EdgeInsets.only(top: 15, bottom: 20, right: 12, left: 20),
      child: ElevatedButton(
        onPressed: () async {
          if (_loadButtonController.isNotLoading) {
            _loadButtonController.loading();
            await onTap();
            _loadButtonController.reset();
          }
        },
        child: Container(
          padding: EdgeInsets.all(10),
          child: Center(
            child: Obx(() {
              if (_loadButtonController.isLoading.value) {
                return SizedBox(
                  height: 25,
                  width: 25,
                  child: CircularProgressIndicator(
                    color: Colors.white,
                    strokeWidth: 2.5,
                  ),
                );
              }

              return Text(
                label,
                style: TextStyle(fontSize: 20),
              );
            }),
          ),
        ),
      ),
    );
  }
}
