import 'package:flutter/material.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/tap_option.dart';

class TipoServicioPage extends StatelessWidget {
  final ParametroProvider _parametroProvider = new ParametroProvider();

  final Function(Parametro tipoServicio) onSelectTipo;

  TipoServicioPage({required this.onSelectTipo});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _parametroProvider.listTipoServicios(),
      builder: (
        BuildContext context,
        AsyncSnapshot<List<Parametro>> snapshot,
      ) {
        if (snapshot.hasData) {
          List<Parametro> data = snapshot.data!;

          return Container(
            margin: EdgeInsets.symmetric(
              horizontal: 15,
              vertical: 20,
            ),
            decoration: BoxDecoration(
              color: Colors.transparent,
            ),
            child: ListView.separated(
              physics: BouncingScrollPhysics(),
              shrinkWrap: true,
              primary: false,
              itemCount: data.length,
              separatorBuilder: (context, index) {
                return SizedBox(height: 10);
              },
              itemBuilder: (BuildContext context, int index) {
                return TapOption(
                  label: data[index].nombre,
                  onTap: () {
                    onSelectTipo(data[index]);
                  },
                );
              },
            ),
          );
        }

        return LoadingText(text: 'Cargando tipos de servicios...');
      },
    );
  }
}
