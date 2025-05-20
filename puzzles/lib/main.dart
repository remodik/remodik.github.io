import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'puzzle_provider.dart';
import 'puzzle_page.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => PuzzleProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Puzzle Game',
      theme: ThemeData(useMaterial3: true),
      home: const PuzzlePage(),
    );
  }
}
