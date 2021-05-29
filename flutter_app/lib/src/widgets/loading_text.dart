import 'package:flutter/material.dart';
import 'package:flutter_app/src/widgets/info_text.dart';

class LoadingText extends StatelessWidget {
  final String text;

  const LoadingText({
    Key? key,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(height: 20),
          InfoText(text),
        ],
      ),
    );
  }
}
