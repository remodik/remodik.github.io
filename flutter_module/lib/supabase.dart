import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseCredentials {
  static const String url = 'https://uqejawqaypxggmbxscex.supabase.co';
  static const String anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZWphd3FheXB4Z2dtYnhzY2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTEwMjQsImV4cCI6MjA2MTQ4NzAyNH0.h22jBOSBdaVCuDoW7O1RXsWqwZgumaVENdS_V4GewlA';

  static Future<void> initialize() async {
    await Supabase.initialize(
      url: url,
      anonKey: anonKey,
    );
  }

  static SupabaseClient get client => Supabase.instance.client;
}