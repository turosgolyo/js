import 'package:flutter/material.dart';

void main() {
  runApp(const Dadaist());
}

class Dadaist extends StatelessWidget {
  const Dadaist({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dadaista versek',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.lightBlueAccent,
          title: Text("Dadaista versek"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(''),
              SizedBox(height: 50),
              Text(
                "Molnár Jolán\ndadaisten\n",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                "az isten globál golyóbist lóbál elhittem hogy él golyó és kötél mint sitten nézni hogyan tekézik\n a hideg rácson nincs átjárásom és minek hittem hogy lóbál isten bármit is ha már az ujja halál",
                style: TextStyle(fontSize: 14),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 100),
              Text(
                "Shantu Norbert Naréndra\n(a dadaizmus oltárára)\n",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                "amit tettem megtettem\nbölcsen sose cselekedtem\nmost megemelem kalapom\nez volt az utolsó szerep\n\na villanyt rám kapcsolják\n fehéren ég a piszoár\nvégleg falfirkává válok\nmert nem jöttek a Szarmaták!",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
