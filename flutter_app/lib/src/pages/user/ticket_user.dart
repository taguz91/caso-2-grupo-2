import 'package:flutter/material.dart';
import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/pages/ticket/catalogo_servicio_page.dart';
import 'package:flutter_app/src/pages/ticket/form_ticket_page.dart';
import 'package:flutter_app/src/pages/ticket/tipo_servicio_page.dart';

class TicketUser extends StatefulWidget {
  @override
  _TicketUserState createState() => _TicketUserState();
}

class _TicketUserState extends State<TicketUser> {
  int _page = 0;
  Parametro? _tipoServicio;
  CatalogoServicio? _catalogoServicio;

  @override
  Widget build(BuildContext context) {
    return view();
  }

  onSelectTipo(Parametro tipoServicio) {
    setState(() {
      _page = 1;
      _tipoServicio = tipoServicio;
    });
  }

  onSelectCatalogo(CatalogoServicio catalogo) {
    setState(() {
      _page = 2;
      _catalogoServicio = catalogo;
    });
  }

  Widget view() {
    switch (_page) {
      case 0:
        return TipoServicioPage(onSelectTipo: onSelectTipo);
      case 1:
        return CatalogoServicioPage(
          tipoServicio: _tipoServicio!,
          onSelectCatalogo: onSelectCatalogo,
        );

      case 2:
        return FormTicketPage(_catalogoServicio!);
      default:
        return Center(
          child: Text('Error al ingresar el ticket.'),
        );
    }
  }
}
