import 'package:flutter/material.dart';
import 'package:flutter_app/src/utils/theme_data.dart';

class CardInfo extends StatelessWidget {
  final String title;
  final String description;
  late final Color? borderColor;

  CardInfo({
    required this.title,
    required this.description,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(15),
      width: double.infinity,
      decoration: BoxDecoration(
        color: GREY_COLOR,
        border: Border(
          left: BorderSide(
            width: 5,
            color: borderColor ?? Theme.of(context).primaryColor,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 15),
          Text(description),
        ],
      ),
    );
  }
}
