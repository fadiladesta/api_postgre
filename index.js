



// ================== API POSTGRE DATABASE nodejs_postgre TABLE siswa =========================================


const path = require('path');
const bodyParser = require('body-parser');
const express = require ('express');
const hbs =  require('hbs');
const app = express();

//setting koneksi database
const {Client}= require ('pg'); // pemakaian modul postgre
const client = new Client({
	user :"postgres",
	password:"12345",
	host:"localhost",// bisa pakai local host / ip 127.0.0.1 
	port:5432,
	database:"nodejs_postgre"
});
client.connect((err)=>{
	if(err) throw err;
	console.log('Koneksi Sukses Berjalan')
});

app.set('views',path.join(__dirname,'views'));
//set view engine 
app.set('view engine','hbs');
//setting folder asset sebagai static folder untuk static file
app.use('/assets',express.static(__dirname +'/public'));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



// app.get('/',(req,res)=>{
// 	let sql = "SELECT id, nama_lengkap,TO_CHAR(tanggal_lahir,'yyyy/mm/dd') tanggal_lahir,alamat FROM Siswa"; //pakai kutip 2
// 	let query = client.query(sql,(err,results)=>{
// 		if (err)throw err;
// 	res.render('siswa_api',{
// 		/*results:results.rows	 // data yang dilempar */
// 		});

// 		//cek data
// 		/*res.status(200).send(results.rows);*/
// 	});
/*});*/

//menampilkan semua
app.get('/api/siswa',(req,res)=>{
	let sql="SELECT * FROM siswa";
	let query= client.query(sql, (err,results)=>{
		if (err) throw err;
		/*res.send(JSON.stringify({"status":200,"error":null,"response":results}));*/
		res.status(200).send(results);
		/*results:results.rows*/
	});
});

//tampilkan berdasarkan id
app.get('/api/siswa/:id',(req,res)=>{
	let sql="SELECT * FROM siswa WHERE id="+req.params.id;
	let query= client.query(sql, (err,results)=>{
		if (err) throw err;
		/*res.send(JSON.stringify({"status":200,"error":null,"response":results}));*/
		res.status(200).send(results.raws);
			/*results:results.rows*/
	});
});

//insert
app.post('/api/siswa',(req,res)=>{
	let sql = "insert into siswa (nama_lengkap,tanggal_lahir,alamat) values ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"')";
	let query =  client.query(sql,(err,results)=>{
		if (err) throw err;/*
		res.send(JSON.stringify({"status":200,"error":null,"response":results}));*/
		res.status(200).send("Data Berhasil ditambahkan");		
	});
});

//update
app.put('/api/siswa/:id',(req,res)=>{
	let sql = "UPDATE siswa SET nama_lengkap='"+req.body.nama_lengkap+"',tanggal_lahir='"+req.body.tanggal_lahir+"',alamat='"+req.body.alamat+"' WHERE id="+req.params.id;
	let query =  client.query(sql,(err,results)=>{
		if (err) throw err;
	res.status(200).send("Data Berhasil diupdate");	

	});
});

//delete
app.delete('/api/siswa/delete/:id',(req,res)=>{
	let sql = "DELETE FROM siswa WHERE id="+req.params.id;
	let query =  client.query(sql, (err,results)=>{
		if (err) throw err;
res.status(200).send("Data Berhasil didelete");	

	});
});

app.listen(8000,()=>{
console.log("Server berjalan di http://localhost:8000");
}); //8000 port
