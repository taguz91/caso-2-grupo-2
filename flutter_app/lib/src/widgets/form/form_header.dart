import 'package:flutter/material.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

class FormHeader extends StatelessWidget {
  final String title;

  FormHeader(this.title);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.only(bottom: 15),
      margin: EdgeInsets.symmetric(horizontal: 10),
      child: Text(
        this.title,
        style: TextStyle(
          fontSize: 22.5,
          fontWeight: FontWeight.w600,
        ),
      ),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: GREY_BORDER_COLOR),
        ),
      ),
    );
  }
}
