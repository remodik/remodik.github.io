import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';

class PuzzleTile {
  final int row, col;
  bool isRevealed;
  PuzzleTile({required this.row, required this.col, this.isRevealed = false});
}

class PuzzleProvider extends ChangeNotifier {
  ui.Image? _image;
  ui.Image? get image => _image;

  final int rows = 4;
  final int cols = 4;
  late List<PuzzleTile> tiles;

  PuzzleProvider() {
    _resetTiles();
  }

  void _resetTiles() {
    tiles = List.generate(rows * cols,
            (i) => PuzzleTile(row: i ~/ cols, col: i % cols));
  }

  Future<void> setImage(File file) async {
    final data = await file.readAsBytes();
    final codec = await ui.instantiateImageCodec(data);
    final frame = await codec.getNextFrame();
    _image = frame.image;

    _resetTiles();
    notifyListeners();
  }

  void revealTile(int index) {
    tiles[index].isRevealed = true;
    notifyListeners();
  }
}
