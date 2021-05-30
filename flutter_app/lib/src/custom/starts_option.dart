import 'package:flutter/material.dart';

class StartsOption extends StatefulWidget {
  final int max;

  const StartsOption({
    Key? key,
    required this.max,
  }) : super(key: key);

  @override
  StartsOptionState createState() => StartsOptionState();
}

class StartsOptionState extends State<StartsOption> {
  int _selected = -1;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Wrap(
        spacing: 10,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: List.generate(
          widget.max,
          (index) => IconButton(
            onPressed: () {
              setState(() => _selected = index);
            },
            icon: Icon(
              Icons.star,
              color: index <= _selected ? Colors.yellow : Colors.black54,
              size: 50,
            ),
          ),
        ),
      ),
    );
  }

  get selected => _selected + 1;
}
