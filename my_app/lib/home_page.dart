import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';

import 'mood_provider.dart';
import 'mood_entry.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<MoodProvider>(context);
    final moodOptions = ["😊", "😐", "😠"];

    return Scaffold(
      appBar: AppBar(title: const Text('Трекер настроения')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Text('Как ты себя чувствуешь?', style: TextStyle(fontSize: 20)),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: moodOptions.map((mood) {
                return IconButton(
                  icon: Text(mood, style: const TextStyle(fontSize: 32)),
                  onPressed: () => provider.addMood(mood),
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
            const Text('История:', style: TextStyle(fontWeight: FontWeight.bold)),
            Expanded(
              child: ListView.builder(
                itemCount: provider.moods.length,
                itemBuilder: (_, index) {
                  final mood = provider.moods[index];
                  return ListTile(
                    leading: Text(mood.mood, style: const TextStyle(fontSize: 24)),
                    title: Text('${mood.timestamp.toLocal()}'),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),
            const Text('Статистика:', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(
              height: 200,
              child: BarChart(
                BarChartData(
                  barGroups: provider.moodStats.entries.map((entry) {
                    return BarChartGroupData(
                      x: moodOptions.indexOf(entry.key),
                      barRods: [
                        BarChartRodData(toY: entry.value.toDouble(), color: Colors.blue),
                      ],
                      showingTooltipIndicators: [0],
                    );
                  }).toList(),
                  titlesData: FlTitlesData(
                    leftTitles: AxisTitles(),
                    topTitles: AxisTitles(),
                    rightTitles: AxisTitles(),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, _) {
                          final emojiIndex = value.toInt();
                          if (emojiIndex >= 0 && emojiIndex < moodOptions.length) {
                            return Text(moodOptions[emojiIndex]);
                          }
                          return const Text('');
                        },
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
