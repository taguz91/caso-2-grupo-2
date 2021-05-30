import 'package:flutter/material.dart';

class FormErrorMessage extends StatelessWidget {
  final String? message;

  FormErrorMessage(this.message);

  @override
  Widget build(BuildContext context) {
    if (this.message == null) return Container();

    return Container(
      margin: EdgeInsets.only(top: 12, left: 20),
      child: Text(
        message!,
        textAlign: TextAlign.left,
        style: TextStyle(color: Colors.red),
      ),
    );
  }
}
