import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'puzzle_provider.dart';

class PuzzlePage extends StatelessWidget {
  const PuzzlePage({super.key});

  Future<void> _pickImage(BuildContext ctx) async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.gallery);
    if (picked != null) {
      await Provider.of<PuzzleProvider>(ctx, listen: false)
          .setImage(File(picked.path));
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<PuzzleProvider>();
    final ui.Image? image = provider.image;

    const double puzzleSize = 320;
    final int rows = provider.rows, cols = provider.cols;
    final double tileSize = puzzleSize / cols;

    return Scaffold(
      appBar: AppBar(title: const Text('🧩 Puzzle Game')),
      body: Center(
        child: image == null
            ? ElevatedButton(
          onPressed: () => _pickImage(context),
          child: const Text('Выбрать изображение'),
        )
            : Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: puzzleSize,
              height: puzzleSize,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade700),
              ),
              child: Stack(
                children: [
                  for (int i = 0; i < provider.tiles.length; i++)
                    _buildTile(
                      provider.tiles[i],
                      index: i,
                      image: image,
                      cols: cols,
                      rows: rows,
                      tileSize: tileSize,
                      puzzleSize: puzzleSize,
                      onTap: () => provider.revealTile(i),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => _pickImage(context),
              child: const Text('Загрузить другое изображение'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTile(PuzzleTile tile,
      {required int index,
        required ui.Image? image,
        required int cols,
        required int rows,
        required double tileSize,
        required double puzzleSize,
        required VoidCallback onTap}) {
    return Positioned(
      left: tile.col * tileSize,
      top: tile.row * tileSize,
      width: tileSize,
      height: tileSize,
      child: GestureDetector(
        onTap: onTap,
        child: tile.isRevealed
            ? CustomPaint(
          size: Size(tileSize, tileSize),
          painter: _TilePainter(
            image: image!,
            row: tile.row,
            col: tile.col,
            rows: rows,
            cols: cols,
          ),
        )
            : Container(color: Colors.grey.shade400),
      ),
    );
  }
}

class _TilePainter extends CustomPainter {
  final ui.Image image;
  final int row, col, rows, cols;

  _TilePainter({
    required this.image,
    required this.row,
    required this.col,
    required this.rows,
    required this.cols,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final srcW = image.width / cols;
    final srcH = image.height / rows;
    final src = Rect.fromLTWH(
      col * srcW,
      row * srcH,
      srcW,
      srcH,
    );
    final dst = Rect.fromLTWH(0, 0, size.width, size.height);
    canvas.drawImageRect(image, src, dst, Paint());
  }

  @override
  bool shouldRepaint(covariant _TilePainter old) => false;
}
