import 'package:flutter/material.dart';

class LabelForm extends StatelessWidget {
  final String label;

  LabelForm(this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.topLeft,
      padding: EdgeInsets.symmetric(vertical: 5),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 16,
        ),
      ),
    );
  }
}
