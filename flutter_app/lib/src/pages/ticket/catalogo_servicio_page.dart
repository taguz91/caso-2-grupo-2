import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import 'package:get/get.dart';

import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/controllers/catalogo_servicio_controller.dart';
import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/widgets/tap_option.dart';

class CatalogoServicioPage extends StatefulWidget {
  final Parametro tipoServicio;

  final Function(CatalogoServicio catalogo) onSelectCatalogo;

  CatalogoServicioPage({
    required this.onSelectCatalogo,
    required this.tipoServicio,
  });

  @override
  _CatalogoServicioPageState createState() => _CatalogoServicioPageState();
}

class _CatalogoServicioPageState extends State<CatalogoServicioPage> {
  final _catalogoServicioController = Get.put(CatalogoServicioController());

  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();

    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      _catalogoServicioController.reset(widget.tipoServicio.parametrosId);

      _scrollController.addListener(() {
        final triggerMore = _scrollController.position.maxScrollExtent * 0.9;
        if (_scrollController.position.pixels > triggerMore) {
          _catalogoServicioController
              .loadMore(widget.tipoServicio.parametrosId);
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
        _catalogoServicioController.reset(widget.tipoServicio.parametrosId);
      },
      child: Obx(() {
        if (_catalogoServicioController.servicios.length == 0) {
          return LoadingText(
            text: 'Cargando catalogo de ${widget.tipoServicio.nombre}...',
          );
        }

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
            controller: _scrollController,
            shrinkWrap: true,
            primary: false,
            itemCount: _catalogoServicioController.servicios.length + 1,
            separatorBuilder: (context, index) {
              return SizedBox(height: 10);
            },
            itemBuilder: (BuildContext context, int index) {
              if (_catalogoServicioController.servicios.length == index) {
                return Obx(() {
                  if (_catalogoServicioController.isLast.value) {
                    return InfoText(
                      'Terminamos de cargar el catalogo de ${widget.tipoServicio.nombre}.',
                    );
                  }
                  return InfoText('Cargando...');
                });
              }

              return TapOption(
                label: _catalogoServicioController.servicios[index].descripcion,
                onTap: () {
                  widget.onSelectCatalogo(
                    _catalogoServicioController.servicios[index],
                  );
                },
              );
            },
          ),
        );
      }),
    );
  }
}
