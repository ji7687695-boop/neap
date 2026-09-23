import 'package:flutter/material.dart';
import 'feed.dart';
class NeapApp extends StatelessWidget { const NeapApp({super.key}); @override Widget build(BuildContext context) => MaterialApp(debugShowCheckedModeBanner:false,title:'neap',theme:ThemeData(colorScheme:ColorScheme.fromSeed(seedColor:Colors.black),scaffoldBackgroundColor:Colors.white,useMaterial3:true),home:const FeedScreen()); }
