import express from "express";
import sql from "mssql";
import path from "path";
import { fileURLToPath } from "url";
 
 const app = express(); const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename); app.use(express.json());
   app.use(express.urlencoded({ extended: true })); 
   
   app.use(express.static(path.join(__dirname, "public"))); 

   const config = { 
    user: "//", 
    password: "//", database: "NODEJS", 
    server: "//", 
    options: { encrypt: true, trustServerCertificate: true, }
 };



    app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname, 'public', 'HTML.html'));        
    })

    app.get('/data',(req,res)=>{
 
 
 sql.connect(config).then(pool=>{
    return pool.request()

    .query('SELECT * FROM HomeWorK')
    

 .then(result=>{

    if (result.recordset.length>0) {
     
       
         res.json({data:result.recordset})
        
         return pool.request().query('UPDATE HomeWork SET Eliminar = \'N/A\' WHERE Eliminar IS NULL');

    }else{
        console.log('There was an error!');
        res.status(404).json({ message: 'No records found' });
    }
 })
    }) })

    app.post('/',(req,res)=>{

const {Valor,fullDate }=req.body
 
sql.connect(config).then(pool=>{

return pool.request()

.input('Valor',sql.NVarChar,Valor)
.input('fullDate',sql.NVarChar,fullDate )
.query('INSERT INTO HomeWork(Information,Entrada) values (@Valor,@fullDate)')
  


})
.then(result => {
   
   res.json({ message: 'Data inserted successfully' });
 })
 .catch(error => {
   console.error('Error:', error);
   res.status(500).json({ message: 'Failed to insert data' }); // Error handling
 });


    })
 
    app.delete('/DELETE/:id', (req, res) => {
      const { id } = req.params;
    
      sql.connect(config)
        .then(pool => {
          return pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM HomeWork WHERE ID = @id');
        })
        .then(result => {
          if (result.rowsAffected[0] > 0) {
            
            res.json({ success: true });
          } else {
            res.status(404).json({ success: false, message: 'Record not found or already deleted' });
          }
        })
        .catch(error => {
          console.error('Error executing query:', error);
          res.status(500).json({ success: false, message: 'Server error' });
        });
    });
    





    app.patch('/Update/:id',(req,res)=>{
      const { id } = req.params;
      const {Valor}=req.body;

      sql.connect(config).then(pool=>{
return pool.request()

.input('id',sql.Int,id)
.input('Valor',sql.NVarChar,Valor)
.query('UPDATE HomeWork SET Information= @valor where id = @id ')

       })
.then(result=>{

  if (result) {
    console.log('Value has been updated');
    
  } else {
    console.log('There was an error!');
    
  }
  
})
.catch(err=>{
  console.log(err);
  
})




    })


      

    app.listen(3000,()=>{
        console.log('Port 3000');
        
    })
    