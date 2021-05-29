import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import 'package:flutter_app/src/models/historial.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

class HistorialItem extends StatefulWidget {
  const HistorialItem({
    Key? key,
    required this.historial,
  }) : super(key: key);

  final Hisotorial historial;

  @override
  _HistorialItemState createState() => _HistorialItemState();
}

class _HistorialItemState extends State<HistorialItem> {
  final GlobalKey key = GlobalKey();
  double height = 40;

  @override
  void initState() {
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      setState(() => height = key.currentContext?.size?.height ?? height);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: [
          Container(
            margin: EdgeInsets.only(left: 17.5),
            width: 5,
            height: height,
            color: PRIMARY_COLOR,
          ),
          Container(
            width: 15,
            height: 5,
            color: PRIMARY_COLOR,
          ),
          Container(
            height: 22.5,
            width: 22.5,
            decoration: BoxDecoration(
              color: PRIMARY_COLOR,
              borderRadius: BorderRadius.all(Radius.circular(22.5)),
            ),
          ),
          Expanded(
            key: key,
            child: Container(
              margin: EdgeInsets.only(left: 10),
              padding: EdgeInsets.only(bottom: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _getText(widget.historial.accion),
                  _timeText(widget.historial.createdAt),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget _getText(String text) {
    if (text.contains('<span>')) {
      final splitText = text.split('<span>');
      final secondaryText = splitText[1].split('</span>');
      return RichText(
        text: TextSpan(
          children: <TextSpan>[
            TextSpan(
              text: splitText[0],
              style: TextStyle(
                color: Colors.black,
              ),
            ),
            TextSpan(
              text: secondaryText[0],
              style: TextStyle(
                color: Colors.black54,
                decoration: TextDecoration.lineThrough,
              ),
            ),
            TextSpan(
              text: secondaryText[1],
              style: TextStyle(
                color: Colors.black,
              ),
            ),
          ],
        ),
      );
    }
    return RichText(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: Colors.black,
        ),
      ),
    );
  }

  Text _timeText(String text) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 13,
        color: Colors.black54,
      ),
    );
  }
}
