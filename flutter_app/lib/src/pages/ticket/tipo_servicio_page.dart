import 'package:flutter/material.dart';
import 'package:flutter_app/src/widgets/form/form_header_section.dart';

import 'package:get/get.dart';

import 'package:flutter_app/src/controllers/providers/parametro_provider_controller.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/tap_option.dart';

class TipoServicioPage extends StatelessWidget {
  final _parametroProviderController = Get.put(ParametroProviderController());

  final Function(Parametro tipoServicio) onSelectTipo;

  TipoServicioPage({required this.onSelectTipo});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (_parametroProviderController.loadingServicios.value) {
        return LoadingText(text: 'Cargando tipos de servicios...');
      }

      final tipoServicios = _parametroProviderController.tiposServicios;

      return Container(
        margin: EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 20,
        ),
        child: Column(
          children: [
            FormHeaderSection(1),
            SizedBox(height: 15),
            Expanded(
              child: ListView.separated(
                physics: BouncingScrollPhysics(),
                shrinkWrap: true,
                primary: false,
                itemCount: tipoServicios.length,
                separatorBuilder: (context, index) {
                  return SizedBox(height: 10);
                },
                itemBuilder: (BuildContext context, int index) {
                  return TapOption(
                    label: tipoServicios[index].nombre,
                    onTap: () {
                      onSelectTipo(tipoServicios[index]);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      );
    });
  }
}
