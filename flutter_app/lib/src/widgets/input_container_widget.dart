import 'package:flutter/material.dart';
import 'package:flutter_app/src/widgets/label_form.dart';

class InputContainerWidget extends StatelessWidget {
  final Widget child;
  final String? label;

  InputContainerWidget({required this.child, this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 20, left: 12, right: 12),
      padding: EdgeInsets.only(left: 10),
      child: Column(
        children: [
          if (label != null) LabelForm(label!),
          child,
        ],
      ),
    );
  }
}
