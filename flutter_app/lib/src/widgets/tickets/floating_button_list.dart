import 'package:flutter/material.dart';

class FloatingButtonList extends StatelessWidget {
  final List<Widget> children;

  const FloatingButtonList({
    Key? key,
    required this.children,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: children,
      ),
    );
  }
}
