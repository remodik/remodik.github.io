import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'mood_entry.dart';

class MoodProvider with ChangeNotifier {
  final Box<MoodEntry> _box;

  MoodProvider(this._box);

  List<MoodEntry> get moods => _box.values.toList();

  void addMood(String mood) {
    final entry = MoodEntry(mood: mood, timestamp: DateTime.now());
    _box.add(entry);
    notifyListeners();
  }

  Map<String, int> get moodStats {
    final map = <String, int>{};
    for (var mood in moods) {
      map[mood.mood] = (map[mood.mood] ?? 0) + 1;
    }
    return map;
  }
}
