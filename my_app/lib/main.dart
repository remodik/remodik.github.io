import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:provider/provider.dart';

import 'mood_entry.dart';
import 'mood_provider.dart';
import 'home_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();
  Hive.registerAdapter(MoodEntryAdapter());
  final box = await Hive.openBox<MoodEntry>('moodBox');

  runApp(
    ChangeNotifierProvider(
      create: (_) => MoodProvider(box),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mood Tracker',
      theme: ThemeData(useMaterial3: true),
      home: const HomePage(),
    );
  }
}
