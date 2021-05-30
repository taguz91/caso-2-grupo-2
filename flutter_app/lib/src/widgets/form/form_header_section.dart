import 'package:flutter/material.dart';

class FormHeaderSection extends StatelessWidget {
  final int active;
  final double marginHorizontal;
  FormHeaderSection(
    this.active, {
    this.marginHorizontal = 0,
  });

  @override
  Widget build(BuildContext context) {
    int _index = 0;
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 15),
      margin: EdgeInsets.symmetric(horizontal: marginHorizontal),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: List.generate(5, (i) {
          if (i % 2 == 0) {
            _index++;
            return _circle(
              context,
              color: _index == active
                  ? Theme.of(context).primaryColor
                  : Colors.transparent,
            );
          }
          return _line(context);
        }),
      ),
    );
  }

  Expanded _line(BuildContext context) {
    return Expanded(
      child: Container(
        height: 3,
        decoration: BoxDecoration(
          color: Theme.of(context).primaryColor,
        ),
      ),
    );
  }

  Container _circle(
    BuildContext context, {
    Color color = Colors.transparent,
  }) {
    return Container(
      height: 50,
      width: 50,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color,
        border: Border.all(
          color: Theme.of(context).primaryColor,
        ),
      ),
    );
  }
}
