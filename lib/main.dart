import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'src/app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  const url = 'https://hxmqpvtkgtoxkrdfuotd.supabase.co';
  const publishableKey = String.fromEnvironment('SUPABASE_PUBLISHABLE_KEY');
  if (publishableKey.isEmpty) {
    runApp(const MaterialApp(home: Scaffold(body: Center(child: Padding(padding: EdgeInsets.all(24), child: Text('Supabase publishable key が未設定です。', textAlign: TextAlign.center))))));
    return;
  }
  await Supabase.initialize(url: url, anonKey: publishableKey);
  runApp(const NeapApp());
}
