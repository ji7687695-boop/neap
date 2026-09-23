import 'package:geolocator/geolocator.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class Backend {
 static SupabaseClient get db=>Supabase.instance.client;
 static User? get user=>db.auth.currentUser;
 static Future<void> ensureSignedIn() async { if(user==null) await db.auth.signInAnonymously(); }
 static Future<List<Map<String,dynamic>>> feed() async {
  await ensureSignedIn(); Position? pos; try{pos=await Geolocator.getCurrentPosition();}catch(_){}
  if(pos!=null){final data=await db.rpc('nearby_feed',params:{'lat':pos.latitude,'lng':pos.longitude,'radius_m':20000});return List<Map<String,dynamic>>.from(data);}
  final data=await db.from('posts').select('id,body,image_url,created_at,profiles(username,avatar_url,instagram_username),interests(name)').order('created_at',ascending:false).limit(50);return List<Map<String,dynamic>>.from(data);
 }
 static Future<void> createPost(String body) async {await ensureSignedIn();Position? pos;try{pos=await Geolocator.getCurrentPosition();}catch(_){} await db.from('posts').insert({'user_id':user!.id,'body':body.trim(),if(pos!=null)'latitude':pos.latitude,if(pos!=null)'longitude':pos.longitude});}
 static Future<void> toggleLike(int postId) async {await ensureSignedIn();final x=await db.from('likes').select('post_id').eq('post_id',postId).eq('user_id',user!.id).maybeSingle();if(x==null)await db.from('likes').insert({'post_id':postId,'user_id':user!.id});else await db.from('likes').delete().eq('post_id',postId).eq('user_id',user!.id);}
}
