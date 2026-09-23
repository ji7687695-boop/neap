import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'src/app.dart';

Future<void> main() async {
 WidgetsFlutterBinding.ensureInitialized();
 const url='https://hxmqpvtkgtoxkrdfuotd.supabase.co';
 const key=String.fromEnvironment('SUPABASE_PUBLISHABLE_KEY');
 if(key.isNotEmpty) await Supabase.initialize(url:url,anonKey:key);
 runApp(const NeapApp());
}
